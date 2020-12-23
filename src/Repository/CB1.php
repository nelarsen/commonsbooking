<?php


namespace CommonsBooking\Repository;


class CB1
{

    /**
     * @var string
     */
    public static $LOCATION_TYPE_ID = 'cb_locations';

    /**
     * @var string
     */
    public static $ITEM_TYPE_ID = 'cb_items';

    /**
     * @var string
     */
    public static $BOOKINGS_TABLE = 'cb_bookings';

    /**
     * @var string
     */
    public static $BOOKINGCODES_TABLE = 'cb_codes';

    /**
     * @var string
     */
    public static $TIMEFRAMES_TABLE = 'cb_timeframes';

    /**
     * @return bool
     */
    public static function isInstalled()
    {
        $option_set_by_cb1 = get_option(
            'commons-booking-settings-pages'
        ); // we check for pages, since they have to be set up for the plugin to function.

        if ($option_set_by_cb1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @return array
     */
    public static function getLocations()
    {
        return self::get(self::$LOCATION_TYPE_ID);
    }

    /**
     * @param $postType
     *
     * @return array
     */
    protected static function get($postType)
    {
        $posts = [];
        $args  = array(
            'post_type' => $postType,
            'post_status' => 'any',
            'nopaging' => true
        );
        /** @var WP_Query $query */
        $query = new \WP_Query($args);
        if ($query->have_posts()) {
            $posts = $query->get_posts();
        }

        return $posts;
    }

    /**
     * @return array
     */
    public static function getItems()
    {
        return self::get(self::$ITEM_TYPE_ID);
    }

    /**
     * @return mixed
     */
    public static function getBookings()
    {
        global $wpdb;
        $table_bookings = $wpdb->prefix.self::$BOOKINGS_TABLE;

        return $wpdb->get_results("SELECT * FROM $table_bookings", ARRAY_A);
    }

    /**
     * @return mixed
     */
    public static function getTimeframes()
    {
        global $wpdb;
        $table_timeframes = $wpdb->prefix.self::$TIMEFRAMES_TABLE;

        return $wpdb->get_results("SELECT * FROM $table_timeframes", ARRAY_A);
    }

    /**
     * @return mixed
     */
    public static function getBookingCodes()
    {
        global $wpdb;
        $table_bookingcodes = $wpdb->prefix.self::$BOOKINGCODES_TABLE;
        $table_timeframes = $wpdb->prefix.self::$TIMEFRAMES_TABLE;

        return $wpdb->get_results(
            "SELECT
                c.booking_date,
                c.item_id,
                t.id as timeframe_id,
                t.location_id,
                c.bookingcode
            FROM $table_bookingcodes c, $table_timeframes t
            WHERE
                c.item_id = t.item_id AND
                c.booking_date >= t.date_start AND
                c.booking_date <= t.date_end
            ",
            ARRAY_A
        );
    }

    /**
     * @param $id
     *
     * @return mixed
     */
    public static function getBookingCode($id)
    {
        global $wpdb;
        $table_bookingcodes = $wpdb->prefix.self::$BOOKINGCODES_TABLE;

        $result = $wpdb->get_results(
            "SELECT
                bookingcode
            FROM $table_bookingcodes
            WHERE
                id = $id
            ",
            ARRAY_A
        );

        if ($result && count($result) > 0) {
            return $result[0]['bookingcode'];
        }
    }

    /**
     * Returns CB2 Location-ID.
     *
     * @param $locationId CB1 Location-ID
     *
     * @return int|false
     */
    public static function getCB2LocationId($locationId)
    {
        return self::getCB2PostIdByType($locationId, \CommonsBooking\Wordpress\CustomPostType\Location::$postType);
    }

    protected static function getCB2PostIdByType($id, $type)
    {
        global $wpdb;
        $poststable = $wpdb->prefix . 'posts';
        $postmetatable = $wpdb->prefix . 'postmeta';
        $result = $wpdb->get_results(
            "
            SELECT post_id FROM $postmetatable
            WHERE
                meta_key = '_cb_cb1_post_post_ID' AND
                meta_value = $id AND
                post_id in (SELECT id from $poststable where post_type = '".$type."');
        "
        );

        if ($result && count($result) > 0) {
            return $result[0]->post_id;
        }

        return false;
    }

    /**
     * Returns CB2 Location-ID.
     *
     * @param $locationId CB1 Location-ID
     *
     * @return int|false
     */
    public static function getCB2ItemId($locationId)
    {
        return self::getCB2PostIdByType($locationId, \CommonsBooking\Wordpress\CustomPostType\Item::$postType);
    }

    public static function getCB2TimeframeId($locationId)
    {
        return self::getCB2PostIdByType($locationId, \CommonsBooking\Wordpress\CustomPostType\Timeframe::$postType);
    }

    /**
     * Returns CB2 post id for CB1 post id, if available.
     *
     * @param $id
     *
     * @return false
     */
    public static function getCB2PostIdByCB1Id($id)
    {
        global $wpdb;
        $postmetatable = $wpdb->prefix . 'postmeta';
        $result = $wpdb->get_results(
            "
            SELECT meta_value as cb1_id, post_id as cb2_id 
            FROM $postmetatable 
            WHERE
                meta_key = '_cb_cb1_post_post_ID' AND 
                meta_value = '$id';
        "
        );

        if ($result && count($result) > 0) {
            return $result[0]->cb2_id;
        }

        return false;
    }

    /**
     * Returns CB1 taxonomies.
     * @return mixed
     */
    public static function getCB1Taxonomies()
    {
        global $wpdb;
        $postmetatable = $wpdb->prefix . 'postmeta';
        $term_relationshipstable = $wpdb->prefix . 'term_relationships';
        $term_taxonomytable = $wpdb->prefix . 'term_taxonomy';
        $term_termstable = $wpdb->prefix . 'terms';
        return $wpdb->get_results(
            "
            SELECT
                tr.*, 
                tt.taxonomy,
                t.slug as term
            FROM $term_relationshipstable tr 
            LEFT JOIN $term_taxonomytable tt ON
                tr.term_taxonomy_id = tt.term_id
            LEFT JOIN $term_termstable t ON
                t.term_id = tt.term_id
            WHERE tr.object_id IN (
                SELECT meta_value
                FROM $postmetatable
                WHERE
                    meta_key = '_cb_cb1_post_post_ID'
            );
        "
        );
    }

}
