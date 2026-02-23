<?php

namespace CommonsBooking\Tests\Repository;

use CommonsBooking\Repository\Restriction;
use CommonsBooking\Tests\Wordpress\CustomPostTypeTest;

/**
 * Tests for Repository\Restriction::get() behavior.
 *
 * These tests are written to validate the index-table migration.
 * When run against the OLD (postmeta) code, some tests will fail because the
 * old filterPosts() has different semantics for location-only / item-only queries
 * and because the old code uses cache that can mask stale data.
 */
class RestrictionTest extends CustomPostTypeTest {

	protected $timeframeId;
	protected $restrictionId;

	public function testGetByItemAndLocation() {
		$restrictions = Restriction::get( [ $this->locationId ], [ $this->itemId ] );
		$this->assertIsArray( $restrictions );
		$this->assertCount( 1, $restrictions );
		$this->assertEquals( $this->restrictionId, $restrictions[0]->ID );
	}

	/**
	 * When searching by location only, a restriction that has both location
	 * AND item set is excluded (both dimensions must be provided to match).
	 * A location-only restriction (no item) is included.
	 */
	public function testGetByLocationOnly() {
		// The fixture restriction has both location and item → excluded
		$restrictions = Restriction::get( [ $this->locationId ] );
		$this->assertIsArray( $restrictions );
		$this->assertCount( 0, $restrictions );

		// A restriction with location only (no item) → included
		$locationOnlyId = $this->createRestriction(
			'hint',
			$this->locationId,
			0,
			strtotime( self::CURRENT_DATE ),
			strtotime( '+1 day', strtotime( self::CURRENT_DATE ) )
		);
		$restrictions = Restriction::get( [ $this->locationId ] );
		$this->assertCount( 1, $restrictions );
		$this->assertEquals( $locationOnlyId, $restrictions[0]->ID );
	}

	/**
	 * When searching by item only, a restriction that has both location
	 * AND item set is excluded (both dimensions must be provided to match).
	 * An item-only restriction (no location) is included.
	 */
	public function testGetByItemOnly() {
		// The fixture restriction has both location and item → excluded
		$restrictions = Restriction::get( [], [ $this->itemId ] );
		$this->assertIsArray( $restrictions );
		$this->assertCount( 0, $restrictions );

		// A restriction with item only (no location) → included
		$itemOnlyId = $this->createRestriction(
			'hint',
			0,
			$this->itemId,
			strtotime( self::CURRENT_DATE ),
			strtotime( '+1 day', strtotime( self::CURRENT_DATE ) )
		);
		$restrictions = Restriction::get( [], [ $this->itemId ] );
		$this->assertCount( 1, $restrictions );
		$this->assertEquals( $itemOnlyId, $restrictions[0]->ID );
	}

	public function testGetWithNoFilters() {
		$restrictions = Restriction::get();
		$this->assertIsArray( $restrictions );
		$this->assertCount( 1, $restrictions );
	}

	public function testGetReturnAsModel() {
		$restrictions = Restriction::get( [ $this->locationId ], [ $this->itemId ], null, true );
		$this->assertIsArray( $restrictions );
		$this->assertCount( 1, $restrictions );
		$this->assertInstanceOf( \CommonsBooking\Model\Restriction::class, $restrictions[0] );
	}

	public function testGetByDate() {
		$restrictions = Restriction::get( [], [], self::CURRENT_DATE );
		$this->assertIsArray( $restrictions );
		$this->assertCount( 1, $restrictions );

		$farFuture = Restriction::get( [], [], '01.01.2099' );
		$this->assertEmpty( $farFuture );
	}

	public function testGetByMinTimestamp() {
		$start       = strtotime( self::CURRENT_DATE );
		$restrictions = Restriction::get( [], [], null, false, $start );
		$this->assertIsArray( $restrictions );
		$this->assertCount( 1, $restrictions );

		$beyondEnd = strtotime( '+10 days', $start );
		$empty     = Restriction::get( [], [], null, false, $beyondEnd );
		$this->assertEmpty( $empty );
	}

	public function testGetExcludesNonMatchingLocationItem() {
		$otherLocation = $this->createLocation( 'OtherLocation' );
		$otherItem     = $this->createItem( 'OtherItem' );

		$restrictions = Restriction::get( [ $otherLocation ], [ $otherItem ] );
		$this->assertEmpty( $restrictions );
	}

	public function testGetOpenEndedRestriction() {
		$openEndedId = $this->createRestriction(
			'repair',
			$this->locationId,
			$this->itemId,
			strtotime( self::CURRENT_DATE ),
			null,
			'active'
		);

		$restrictions = Restriction::get( [ $this->locationId ], [ $this->itemId ] );
		$this->assertCount( 2, $restrictions );

		$ids = array_map( function( $p ) { return $p->ID; }, $restrictions );
		$this->assertContains( $openEndedId, $ids );
	}

	public function testGetExcludesSolvedRestrictions() {
		$this->createRestriction(
			'hint',
			$this->locationId,
			$this->itemId,
			strtotime( self::CURRENT_DATE ),
			strtotime( '+1 day', strtotime( self::CURRENT_DATE ) ),
			'solved'
		);

		$restrictions = Restriction::get( [ $this->locationId ], [ $this->itemId ] );
		$this->assertCount( 1, $restrictions );
		$this->assertEquals( $this->restrictionId, $restrictions[0]->ID );
	}

	public function testGlobalRestrictionMatchesAnyLocationItem() {
		$globalId = $this->createRestriction(
			'hint',
			0,
			0,
			strtotime( self::CURRENT_DATE ),
			strtotime( '+1 day', strtotime( self::CURRENT_DATE ) ),
			'active'
		);

		$otherLocation = $this->createLocation( 'AnotherLoc' );
		$otherItem     = $this->createItem( 'AnotherItem' );

		$restrictions = Restriction::get( [ $otherLocation ], [ $otherItem ] );
		$ids          = array_map( function( $p ) { return $p->ID; }, $restrictions );
		$this->assertContains( $globalId, $ids );
	}

	protected function setUp(): void {
		parent::setUp();
		$this->timeframeId   = $this->createBookableTimeFrameIncludingCurrentDay();
		$this->restrictionId = $this->createRestriction(
			'hint',
			$this->locationId,
			$this->itemId,
			strtotime( self::CURRENT_DATE ),
			strtotime( '+1 day', strtotime( self::CURRENT_DATE ) )
		);
	}

	protected function tearDown(): void {
		parent::tearDown();
	}
}
