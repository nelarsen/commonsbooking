<?php


namespace CommonsBooking\Repository;

use Exception;

class Restriction extends PostRepository {

	/**
	 * Table name for the restrictions index table (without prefix).
	 *
	 * @var string
	 */
	public static string $tablename = 'cb_restrictions';

	/**
	 * Cached flag for whether the index table exists.
	 * null = not checked yet, true/false = result of SHOW TABLES check.
	 */
	private static ?bool $tableExists = null;

	/**
	 * Checks whether the cb_restrictions index table exists.
	 * The result is cached for the lifetime of the request to avoid
	 * repeated SHOW TABLES queries during normal operation.
	 */
	private static function indexTableExists(): bool {
		if ( self::$tableExists === null ) {
			global $wpdb;
			$table_name       = $wpdb->prefix . self::$tablename;
			self::$tableExists = $wpdb->get_var(
				$wpdb->prepare( 'SHOW TABLES LIKE %s', $table_name )
			) === $table_name;
		}

		return self::$tableExists;
	}

	/**
	 * Resets the cached table-existence flag.
	 * Call after creating or dropping the table (primarily in tests).
	 */
	public static function resetTableExistsCache(): void {
		self::$tableExists = null;
	}

	/**
	 * Creates the cb_restrictions index table.
	 * This mirrors queryable meta fields into a single indexed table
	 * so that restriction lookups no longer need multiple postmeta JOINs.
	 *
	 * Follows the same pattern as {@see BookingCodes::initBookingCodesTable()}.
	 */
	public static function initRestrictionsTable(): void {
		global $wpdb;
		global $cb_db_version;

		$table_name      = $wpdb->prefix . self::$tablename;
		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE $table_name (
			id bigint(20) unsigned NOT NULL,
			location_id bigint(20) unsigned DEFAULT NULL,
			item_id bigint(20) unsigned DEFAULT NULL,
			start_date bigint(20) NOT NULL,
			end_date bigint(20) DEFAULT NULL,
			type varchar(20) NOT NULL,
			state varchar(20) NOT NULL,
			hint text DEFAULT NULL,
			PRIMARY KEY  (id),
			KEY idx_state_dates (state, start_date, end_date),
			KEY idx_location_item (location_id, item_id),
			KEY idx_item (item_id)
		) $charset_collate;";

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		dbDelta( $sql );

		self::$tableExists = true;

		add_option( COMMONSBOOKING_PLUGIN_SLUG . '_restrictions_db_version', $cb_db_version );
	}

	/**
	 * Meta keys stored in the index table.
	 * Used to detect relevant postmeta changes.
	 */
	private static array $indexedMetaKeys = [
		\CommonsBooking\Model\Restriction::META_LOCATION_ID,
		\CommonsBooking\Model\Restriction::META_ITEM_ID,
		\CommonsBooking\Model\Restriction::META_START,
		\CommonsBooking\Model\Restriction::META_END,
		\CommonsBooking\Model\Restriction::META_TYPE,
		\CommonsBooking\Model\Restriction::META_STATE,
		\CommonsBooking\Model\Restriction::META_HINT,
	];

	/**
	 * Hook callback for updated_post_meta / added_post_meta.
	 * Re-syncs the index table when a relevant restriction meta key changes,
	 * so that programmatic update_post_meta() calls stay in sync.
	 *
	 * @param int    $metaId
	 * @param int    $postId
	 * @param string $metaKey
	 * @param mixed  $metaValue
	 */
	public static function onMetaUpdate( $metaId, $postId, $metaKey, $metaValue ): void {
		if ( ! in_array( $metaKey, self::$indexedMetaKeys, true ) ) {
			return;
		}
		$post = get_post( $postId );
		if ( ! $post || $post->post_type !== \CommonsBooking\Wordpress\CustomPostType\Restriction::getPostType() ) {
			return;
		}
		self::syncToIndexTable( (int) $postId );
	}

	/**
	 * Syncs a restriction post's meta data to the cb_restrictions index table.
	 * Should be called on save_post_cb_restriction.
	 *
	 * @param int $postId The restriction post ID.
	 */
	public static function syncToIndexTable( int $postId ): void {
		if ( ! self::indexTableExists() ) {
			return;
		}

		global $wpdb;
		$table_name = $wpdb->prefix . self::$tablename;

		$post = get_post( $postId );
		if ( ! $post || $post->post_type !== \CommonsBooking\Wordpress\CustomPostType\Restriction::getPostType() ) {
			return;
		}

		$locationId = get_post_meta( $postId, \CommonsBooking\Model\Restriction::META_LOCATION_ID, true );
		$itemId     = get_post_meta( $postId, \CommonsBooking\Model\Restriction::META_ITEM_ID, true );
		$startDate  = get_post_meta( $postId, \CommonsBooking\Model\Restriction::META_START, true );
		$endDate    = get_post_meta( $postId, \CommonsBooking\Model\Restriction::META_END, true );
		$type       = get_post_meta( $postId, \CommonsBooking\Model\Restriction::META_TYPE, true );
		$state      = get_post_meta( $postId, \CommonsBooking\Model\Restriction::META_STATE, true );
		$hint       = get_post_meta( $postId, \CommonsBooking\Model\Restriction::META_HINT, true );

		if ( ! $startDate || ! $type || ! $state ) {
			return;
		}

		$wpdb->replace(
			$table_name,
			[
				'id'          => $postId,
				'location_id' => $locationId ?: null,
				'item_id'     => $itemId ?: null,
				'start_date'  => intval( $startDate ),
				'end_date'    => $endDate !== '' ? intval( $endDate ) : null,
				'type'        => $type,
				'state'       => $state,
				'hint'        => $hint ?: null,
			],
			[ '%d', '%d', '%d', '%d', '%d', '%s', '%s', '%s' ]
		);
	}

	/**
	 * Removes a restriction from the cb_restrictions index table.
	 * Should be called on delete_post / trashed_post for restriction posts.
	 *
	 * @param int $postId The restriction post ID.
	 */
	public static function deleteFromIndexTable( int $postId ): void {
		if ( ! self::indexTableExists() ) {
			return;
		}

		global $wpdb;
		$table_name = $wpdb->prefix . self::$tablename;

		$wpdb->delete( $table_name, [ 'id' => $postId ], [ '%d' ] );
	}

	/**
	 * Returns active restrictions, queried from the cb_restrictions index table.
	 *
	 * @param array       $locations one or more location ids to filter
	 * @param array       $items     one or more item ids to filter
	 * @param string|null $date if provided, filters restrictions to be valid on the given date
	 * @param bool        $returnAsModel returns array of models instead of WP_Post objects
	 * @param int         $minTimestamp if provided, returns restrictions where end_date > min-timestamp
	 * @param string[]    $postStatus filters for given list of status, defaults to all WordPress post status enums
	 *
	 * @return \CommonsBooking\Model\Restriction[]|\WP_Post[]
	 * @throws Exception
	 */
	public static function get(
		array $locations = [],
		array $items = [],
		?string $date = null,
		bool $returnAsModel = false,
		$minTimestamp = null,
		array $postStatus = [ 'confirmed', 'unconfirmed', 'publish', 'inherit' ]
	): array {
		$ids = self::queryFromIndexTable( $locations, $items, $date, $minTimestamp, $postStatus );

		if ( empty( $ids ) ) {
			return [];
		}

		$posts = array_filter( array_map( 'get_post', $ids ) );

		if ( $returnAsModel ) {
			$posts = array_map( function ( $post ) {
				return new \CommonsBooking\Model\Restriction( $post );
			}, $posts );
		}

		return array_values( $posts );
	}

	/**
	 * Queries restriction IDs from the cb_restrictions index table.
	 * Replaces the old queryPosts() + filterPosts() approach that used
	 * multiple postmeta JOINs and PHP-side filtering.
	 *
	 * @param array       $locations
	 * @param array       $items
	 * @param string|null $date
	 * @param int|null    $minTimestamp
	 * @param string[]    $postStatus
	 *
	 * @return int[]
	 */
	private static function queryFromIndexTable(
		array $locations,
		array $items,
		?string $date,
		$minTimestamp,
		array $postStatus
	): array {
		if ( ! self::indexTableExists() ) {
			return [];
		}

		global $wpdb;

		$table       = $wpdb->prefix . self::$tablename;
		$posts_table = $wpdb->prefix . 'posts';

		$where  = [];
		$values = [];

		$where[] = 'r.state = %s';
		$values[] = \CommonsBooking\Model\Restriction::STATE_ACTIVE;

		if ( $minTimestamp ) {
			$where[]  = '(r.end_date > %d OR r.end_date IS NULL)';
			$values[] = intval( $minTimestamp );
		} elseif ( $date ) {
			$dayStart = strtotime( $date );
			$dayEnd   = strtotime( $date . 'T23:59' );

			$where[]  = 'r.start_date <= %d';
			$values[] = $dayEnd;
			$where[]  = '(r.end_date >= %d OR r.end_date IS NULL)';
			$values[] = $dayStart;
		}

		if ( ! empty( $locations ) && ! empty( $items ) ) {
			$locPlaceholders  = implode( ',', array_fill( 0, count( $locations ), '%d' ) );
			$itemPlaceholders = implode( ',', array_fill( 0, count( $items ), '%d' ) );

			$where[] = '('
				. "(r.location_id IS NULL AND r.item_id IS NULL)"
				. " OR (r.location_id IS NULL AND r.item_id IN ($itemPlaceholders))"
				. " OR (r.item_id IS NULL AND r.location_id IN ($locPlaceholders))"
				. " OR (r.location_id IN ($locPlaceholders) AND r.item_id IN ($itemPlaceholders))"
				. ')';

			$values = array_merge( $values, array_map( 'intval', $items ) );
			$values = array_merge( $values, array_map( 'intval', $locations ) );
			$values = array_merge( $values, array_map( 'intval', $locations ) );
			$values = array_merge( $values, array_map( 'intval', $items ) );
		} elseif ( ! empty( $locations ) ) {
			// Match the old filterPosts() semantics: when only locations are
			// provided, restrictions that have BOTH a location and an item set
			// are excluded (they require both dimensions to match).
			$locPlaceholders = implode( ',', array_fill( 0, count( $locations ), '%d' ) );
			$where[]         = '('
				. '(r.location_id IS NULL AND r.item_id IS NULL)'
				. " OR (r.item_id IS NULL AND r.location_id IN ($locPlaceholders))"
				. ')';
			$values = array_merge( $values, array_map( 'intval', $locations ) );
		} elseif ( ! empty( $items ) ) {
			$itemPlaceholders = implode( ',', array_fill( 0, count( $items ), '%d' ) );
			$where[]          = '('
				. '(r.location_id IS NULL AND r.item_id IS NULL)'
				. " OR (r.location_id IS NULL AND r.item_id IN ($itemPlaceholders))"
				. ')';
			$values = array_merge( $values, array_map( 'intval', $items ) );
		}

		$statusPlaceholders = implode( ',', array_fill( 0, count( $postStatus ), '%s' ) );
		$where[]            = "p.post_status IN ($statusPlaceholders)";
		$values             = array_merge( $values, $postStatus );

		$whereClause = implode( ' AND ', $where );

		$sql = "SELECT r.id FROM $table r
			INNER JOIN $posts_table p ON p.ID = r.id
			WHERE $whereClause";

		$prepared = $wpdb->prepare( $sql, $values );
		$results  = $wpdb->get_col( $prepared );

		return array_map( 'intval', $results );
	}

	/**
	 * Casts all posts in the array to Restriction objects.
	 *
	 * @param $posts
	 *
	 * @return mixed
	 * @throws Exception
	 */
	private static function castPostsToRestrictions( $posts ) {
		foreach ( $posts as &$post ) {
			$post = new \CommonsBooking\Model\Restriction( $post );
		}

		return $posts;
	}
}
