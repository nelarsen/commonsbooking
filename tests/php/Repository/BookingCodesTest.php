<?php

namespace CommonsBooking\Tests\Repository;

use CommonsBooking\Model\Timeframe;
use CommonsBooking\Repository\BookingCodes;
use CommonsBooking\Settings\Settings;
use CommonsBooking\Tests\Wordpress\CustomPostTypeTest;
use SlopeIt\ClockMock\ClockMock;

class BookingCodesTest extends CustomPostTypeTest
{
	private Timeframe $timeframeWithEndDate;
	private Timeframe $timeframeWithoutEndDate;
	private Timeframe $timeframeWithDisabledBookingCodesAndEndDate;
	private Timeframe $timeframeWithDisabledBookingCodesWithoutEndDate;
	//we set this value so low because else the unit tests would consume too much time
	const ADVANCE_GENERATION_DAYS = 30;

    public function testGenerate()
    {


		ClockMock::freeze(new \DateTime( self::CURRENT_DATE ) );
	    $todayDate = date('Y-m-d',strtotime(self::CURRENT_DATE));

	    //make sure, that booking codes are not generated for timeframes with disabled booking codes
	    BookingCodes::generate($this->timeframeWithDisabledBookingCodesAndEndDate,self::ADVANCE_GENERATION_DAYS);
		$code = BookingCodes::getCode($this->timeframeWithDisabledBookingCodesAndEndDate,$this->itemId,$this->locationId,$todayDate,self::ADVANCE_GENERATION_DAYS);
		$this->assertNull($code);

		BookingCodes::generate($this->timeframeWithDisabledBookingCodesWithoutEndDate,self::ADVANCE_GENERATION_DAYS);
		$code = BookingCodes::getCode($this->timeframeWithDisabledBookingCodesWithoutEndDate,$this->itemId,$this->locationId,$todayDate,self::ADVANCE_GENERATION_DAYS);
		$this->assertNull($code);

		//now make sure, that booking codes are generated for timeframes with enabled booking codes and valid end date
		BookingCodes::generate($this->timeframeWithEndDate,self::ADVANCE_GENERATION_DAYS);
		$code = BookingCodes::getCode($this->timeframeWithEndDate,$this->itemId,$this->locationId,$todayDate,self::ADVANCE_GENERATION_DAYS);
		$this->assertNotNull($code);
		$this->assertEquals($todayDate,$code->getDate());
		$this->assertEquals($this->itemId,$code->getItem());

		//and now without end date (the fabled "infinite" timeframe)
		BookingCodes::generate($this->timeframeWithoutEndDate,self::ADVANCE_GENERATION_DAYS);
		$code = BookingCodes::getCode($this->timeframeWithoutEndDate,$this->itemId,$this->locationId,$todayDate,self::ADVANCE_GENERATION_DAYS);
		$this->assertNotNull($code);
		$this->assertEquals($todayDate,$code->getDate());
		$this->assertEquals($this->itemId,$code->getItem());

		//make sure, that the last infinite code is also generated
	    $advanceDays = self::ADVANCE_GENERATION_DAYS - 1;
		$lastCodeDay = date('Y-m-d',strtotime(" + $advanceDays days",strtotime(self::CURRENT_DATE)));
		$code = BookingCodes::getCode($this->timeframeWithoutEndDate,$this->itemId,$this->locationId,$lastCodeDay,self::ADVANCE_GENERATION_DAYS);
		$this->assertNotNull($code);
		$this->assertEquals($lastCodeDay,$code->getDate());
		$this->assertEquals($this->itemId,$code->getItem());
    }

	public function testGetCode() {
		ClockMock::freeze( new \DateTime( self::CURRENT_DATE ) );
		//make sure, that non-existing codes are not returned
		$code = BookingCodes::getCode(
			$this->timeframeWithEndDate,
			$this->itemId,
			$this->locationId,
			date('Y-m-d',
				strtotime('+31 days', strtotime( self::CURRENT_DATE) )
			),
			self::ADVANCE_GENERATION_DAYS
		);
		$this->assertNull( $code );

		BookingCodes::generate( $this->timeframeWithoutEndDate, self::ADVANCE_GENERATION_DAYS );
		//test infinite booking days timeframes
		$advanceDays = self::ADVANCE_GENERATION_DAYS + 1; //advance one day beyond the max generation days
		$dayInFuture = date( 'Y-m-d',
			strtotime( " + $advanceDays days",
				strtotime( self::CURRENT_DATE ) ) );
		//this should trigger the generation of a new code past the max generation days
		$code = BookingCodes::getCode( $this->timeframeWithoutEndDate,
			$this->itemId,
			$this->locationId,
			$dayInFuture,
			self::ADVANCE_GENERATION_DAYS
		);
		$this->assertNotNull( $code );
		$this->assertEquals( $this->itemId, $code->getItem() );
		$this->assertEquals( $dayInFuture, $code->getDate() );

		//test that the code is persisted (i.e. it's not generated again)
		$otherCode = BookingCodes::getCode( $this->timeframeWithoutEndDate,
			$this->itemId,
			$this->locationId,
			$dayInFuture,
			self::ADVANCE_GENERATION_DAYS);
		$this->assertNotNull( $otherCode );
		$this->assertEquals( $code->getCode(), $otherCode->getCode() );

		//go even further in the future (* 2 max generation days)
		$advanceDays = self::ADVANCE_GENERATION_DAYS * 2;
		$dayInFutureTwo = date( 'Y-m-d',
			strtotime( " + $advanceDays days",
				strtotime( self::CURRENT_DATE ) ) );
		//this should trigger the generation of a new code past the max generation days
		$futureTwoCode = BookingCodes::getCode( $this->timeframeWithoutEndDate,
			$this->itemId,
			$this->locationId,
			$dayInFutureTwo,
			self::ADVANCE_GENERATION_DAYS);
		$this->assertNotNull( $futureTwoCode );
		$this->assertEquals( $this->itemId, $futureTwoCode->getItem() );
		$this->assertEquals( $dayInFutureTwo, $futureTwoCode->getDate() );
		//now check, that the old code is still persisted
		$stillSameCode = BookingCodes::getCode(
			$this->timeframeWithoutEndDate,
			$this->itemId,
			$this->locationId,
			$dayInFuture,
			self::ADVANCE_GENERATION_DAYS);
		$this->assertNotNull( $stillSameCode );
		$this->assertEquals( $code->getCode(), $stillSameCode->getCode() );
	}

	public function testIfCodesAreEternal() {
		ClockMock::freeze( new \DateTime( self::CURRENT_DATE ) );

		// create timeframe with parameters like $timeframeWithoutEndDate
		$timeframe_1 = new Timeframe($this->createTimeframe(
			$this->locationId,
			$this->itemId,
			strtotime( '-1 day', strtotime( self::CURRENT_DATE ) ),
			null,
		));

		// generate some codes
		BookingCodes::generate( $timeframe_1, self::ADVANCE_GENERATION_DAYS );

		// get code for $this->itemId today
		$todaysCode = BookingCodes::getCode( $timeframe_1,
			$this->itemId,
			$this->locationId,
			date('Y-m-d', strtotime( self::CURRENT_DATE )),
			self::ADVANCE_GENERATION_DAYS);

		$this->assertNotEmpty($todaysCode->getCode());

		// Check if codes are persistant/eternal:
		// check that codes are persistant, ie when a code is once generated for a certain item and date, it should never change again
		$countBefore = $this->countBookingCodes();
		$this->assertGreaterThan(0, $countBefore);

		// add some booking codes (like a WP Admin would do on Commonbookings admin pages)
		$oldBookingCodes = Settings::getOption( 'commonsbooking_options_bookingcodes', 'bookingcodes' );
		$updateSuccessful = Settings::updateOption('commonsbooking_options_bookingcodes','bookingcodes',"$oldBookingCodes,NewCode");
		$this->assertTrue($updateSuccessful);

		// repeat generate() with same parameters as above ...
		BookingCodes::generate( $timeframe_1, self::ADVANCE_GENERATION_DAYS );

		// ... it should NOT lead to any new codes, because they are already existing. Check by counting:
		$countAfter = $this->countBookingCodes();
		$this->assertEquals($countBefore, $countAfter);

		// ... and check by comparing today's code
		$todaysCodeAfter = BookingCodes::getCode( $timeframe_1,
			$this->itemId,
			$this->locationId,
			date('Y-m-d', strtotime( self::CURRENT_DATE )),
			self::ADVANCE_GENERATION_DAYS);

		$this->assertEquals($todaysCode->getCode(), $todaysCodeAfter->getCode());

		// now delete timeframe and create another timeframe with same parameters (especially same item and overlapping in time)
		wp_delete_post( $timeframe_1->ID, true );

		$timeframe_2 = new Timeframe($this->createTimeframe(
			$this->locationId,
			$this->itemId,
			strtotime( '-1 day', strtotime( self::CURRENT_DATE ) ),
			null,
		));

		// repeat generate() with same parameters as above ...
		BookingCodes::generate( $timeframe_2, self::ADVANCE_GENERATION_DAYS );

		// ... and check by comparing today's code
		$todaysCodeTimeframe2 = BookingCodes::getCode( $timeframe_2,
			$this->itemId,
			$this->locationId,
			date('Y-m-d', strtotime( self::CURRENT_DATE )),
			self::ADVANCE_GENERATION_DAYS);

		// even if it is another timeframe, the today's code for the same item must still be the same
		$this->assertEquals($todaysCode->getCode(), $todaysCodeTimeframe2->getCode());

	}

	private function countBookingCodes() {
		global $wpdb;
		$table_name = $wpdb->prefix . BookingCodes::$tablename;

		$sql = "SELECT COUNT(*) FROM $table_name";

		return $wpdb->get_var($sql);
	}

	public function testGetCodes() {
		ClockMock::freeze( new \DateTime( self::CURRENT_DATE ) );
		//make sure that we get no codes before generation
		$codes = BookingCodes::getCodes( $this->timeframeWithEndDate->ID,self::ADVANCE_GENERATION_DAYS);
		$this->assertEmpty( $codes );

		//and no codes for timeframes where it's not enabled
		$codes = BookingCodes::getCodes( $this->timeframeWithDisabledBookingCodesAndEndDate->ID,self::ADVANCE_GENERATION_DAYS);
		$this->assertEmpty( $codes );

		$codes = BookingCodes::getCodes( $this->timeframeWithDisabledBookingCodesWithoutEndDate->ID,self::ADVANCE_GENERATION_DAYS);
		$this->assertEmpty( $codes );

		BookingCodes::generate( $this->timeframeWithEndDate,self::ADVANCE_GENERATION_DAYS );
		//now we should get all codes
		$codes = BookingCodes::getCodes( $this->timeframeWithEndDate->ID,self::ADVANCE_GENERATION_DAYS);
		$this->assertNotEmpty( $codes );
		$this->assertCount( 31, $codes );
		//check that the codes are in the correct order
		$lastCode = null;
		foreach ( $codes as $code ) {
			if ( $lastCode ) {
				$this->assertGreaterThan( $lastCode->getDate(), $code->getDate() );
			}
			$lastCode = $code;
		}

		//test for timeframe with end date only getting a limited range of codes
		$amountOfCodes = 10;
		$startDate = new \DateTime( self::CURRENT_DATE );
		$endDate = new \DateTime( self::CURRENT_DATE );
		$endDate->modify( '+'. $amountOfCodes . 'days' );
		$codes = BookingCodes::getCodes( $this->timeframeWithEndDate->ID, $startDate->getTimestamp(), $endDate->getTimestamp() , self::ADVANCE_GENERATION_DAYS);
		$this->assertNotEmpty( $codes );
		//+1 because we also have to consider the current day
		$this->assertCount( $amountOfCodes + 1, $codes );

		//test infinite booking days timeframes
		BookingCodes::generate( $this->timeframeWithoutEndDate, self::ADVANCE_GENERATION_DAYS );

		// codes will be generated and returned
		// - for yesterday which is timeframe start date (1),
		// - for today (1) and
		// - for additional BookingCodes::ADVANCE_GENERATION_DAYS
		$codeAmount = BookingCodes::ADVANCE_GENERATION_DAYS + 2;
		$codes = BookingCodes::getCodes( $this->timeframeWithoutEndDate->ID );
		$this->assertNotEmpty( $codes );
		$this->assertCount( $codeAmount, $codes );
		//check that the codes are in the correct order
		$lastCode = null;
		foreach ( $codes as $code ) {
			if ( $lastCode ) {
				$this->assertGreaterThan( $lastCode->getDate(), $code->getDate() );
			}
			$lastCode = $code;
		}

		//now we try to get more codes than the max generation days
		$startDate = new \DateTime( self::CURRENT_DATE );
		$endDate = new \DateTime( self::CURRENT_DATE );
		$codeAmount         = BookingCodes::ADVANCE_GENERATION_DAYS * 2;
		$endDate->modify( '+' . $codeAmount . 'days' );
		$codes = BookingCodes::getCodes( $this->timeframeWithoutEndDate->ID, $startDate->getTimestamp(), $endDate->getTimestamp(), self::ADVANCE_GENERATION_DAYS );
		$this->assertNotEmpty( $codes );
		$this->assertCount( $codeAmount + 1, $codes );
		//check that the codes are in the correct order
		$lastCode = null;
		foreach ( $codes as $code ) {
			if ( $lastCode ) {
				$this->assertGreaterThan( $lastCode->getDate(), $code->getDate() );
			}
			$lastCode = $code;
		}

	}

	public function testGetCodesFuture() {
		// test of getCodes() when today is a date in future, in particular later than timeframe start + BookingCodes::ADVANCE_GENERATION_DAYS
		$daysInFuture = 400;
		$futureDate = new \DateTime( self::CURRENT_DATE );
		$futureDate->modify( "+$daysInFuture days" );
		ClockMock::freeze( $futureDate );

		//test infinite booking days timeframes: getCodes() currently only works if at least a few codes are available
		BookingCodes::generate( $this->timeframeWithoutEndDate, self::ADVANCE_GENERATION_DAYS );

		// test behavior of getCodes() without specified startDate and endDate:
		// codes will be generated and returned
		// - for day before self::CURRENT_DATE which is timeframe start date (1),
		// - for $daysInFuture,
		// - for today (1) and
		// - for additional BookingCodes::ADVANCE_GENERATION_DAYS
		$codeAmount = BookingCodes::ADVANCE_GENERATION_DAYS + $daysInFuture + 2;
		$codes = BookingCodes::getCodes( $this->timeframeWithoutEndDate->ID );
		$this->assertNotEmpty( $codes );
		$this->assertCount( $codeAmount, $codes );
		//check that the codes are in the correct order
		$lastCode = null;
		foreach ( $codes as $code ) {
			if ( $lastCode ) {
				$this->assertGreaterThan( $lastCode->getDate(), $code->getDate() );
			}
			$lastCode = $code;
		}
	}
    
    public function testBackwardCompatibility() {
		ClockMock::freeze( new \DateTime( self::CURRENT_DATE ) );
        $todayDate = date('Y-m-d',strtotime(self::CURRENT_DATE));
        
        // (at least) up to cb 2.9.3, booking codes were saved with timeframeId and locationId
        // and under some circumstances, there could be several booking codes for a certain (date, itemId) pair.
        // Now cb never generates new codes for a (data, itemId) pair if a code for that pair already exists.
        // But old codes generated by old cb could be left in the database and should still work as expected,
        // what is tested here
        
        self::logDatabaseEntries('Initial database state:', $this->itemId, $todayDate);
        
        // first insert codes as if generated by old cb version

        // the "right code"
        self::insertBookingCode($todayDate,             // always right date
                                $timeframe = $this->timeframeWithEndDate->ID,
                                $location = $this->locationId,
                                $item = $this->itemId,  // always right item
                                $code = 'right_code'); 

        // a code for another timeframe
        self::insertBookingCode($todayDate,             // always right date
                                $timeframe = $this->timeframeWithEndDate->ID - 1,  // fantasy timeframe
                                $location = $this->locationId,
                                $item = $this->itemId,  // always right item
                                $code = 'code_othertimeframe');        

        // a code for another location
        self::insertBookingCode($todayDate,             // always right date
                                $timeframe =  $this->timeframeWithEndDate->ID,
                                $location = $this->locationId - 1,  // fantasy location
                                $item = $this->itemId,  // always right item
                                $code = 'code_otherlocation'); 



        self::logDatabaseEntries('After inserting old codes:', $this->itemId, $todayDate);

        BookingCodes::generate( $this->timeframeWithEndDate,self::ADVANCE_GENERATION_DAYS );
        
        self::logDatabaseEntries('After generating new codes:', $this->itemId, $todayDate);

        
        $code = BookingCodes::getCode($this->timeframeWithEndDate,$this->itemId,$this->locationId,$todayDate,self::ADVANCE_GENERATION_DAYS);
        $this->assertEquals('right_code', $code->getCode());
        


    }
    
    static function insertBookingCode($date, $timeframe, $location, $item, $code) {
        global $wpdb;
		$table_name = $wpdb->prefix . BookingCodes::$tablename;
        
        $wpdb->insert($table_name, array(
                                    'date' => $date,
                                    'timeframe' => $timeframe,
                                    'location'  => $location,
                                    'item'      => $item,
                                    'code'      => $code
                                    ));
                                    

    }
    
    // Method to log database entries
    static function logDatabaseEntries($message, $itemId, $date) {
        global $wpdb;
        $table_name = $wpdb->prefix . BookingCodes::$tablename;
        
		$sql = $wpdb->prepare(
			"SELECT * FROM $table_name
			WHERE 
				item = %s AND 
				date = %s
			ORDER BY item ASC, date ASC",
			$itemId,
			$date
		);

		$results = $wpdb->get_results($sql);
       
        $entries = json_encode($results, JSON_PRETTY_PRINT);
        fwrite(STDERR, "$message\n$entries\n");
    }

	protected function setUp(): void {
		parent::setUp();
		$this->timeframeWithEndDate = new Timeframe($this->createTimeframe(
			$this->locationId,
			$this->itemId,
			strtotime( '-1 day', strtotime( self::CURRENT_DATE ) ),
			strtotime( '+29 day', strtotime( self::CURRENT_DATE ) )
		));
		$this->timeframeWithoutEndDate = new Timeframe($this->createTimeframe(
			$this->locationId,
			$this->itemId,
			strtotime( '-1 day', strtotime( self::CURRENT_DATE ) ),
			null,
		));

		$this->timeframeWithDisabledBookingCodesAndEndDate = new Timeframe($this->createTimeframe(
            $this->locationId,
            $this->itemId,
            strtotime('-1 day', strtotime(self::CURRENT_DATE)),
            strtotime('+30 day', strtotime(self::CURRENT_DATE)),
            \CommonsBooking\Wordpress\CustomPostType\Timeframe::BOOKABLE_ID,
            "on",
            "w",
            0,
            '8:00 AM',
            '12:00 PM',
            'publish',
            ["1", "2", "3", "4", "5", "6", "7"],
			'',
            self::USER_ID,
            3,
            30,
            0,
            "off",
            "off",
			"off",
			"Timeframe Disabled Booking Code"
		));

		$this->timeframeWithDisabledBookingCodesWithoutEndDate = new Timeframe($this->createTimeframe(
            $this->locationId,
            $this->itemId,
            strtotime('-1 day', strtotime(self::CURRENT_DATE)),
            null,
            \CommonsBooking\Wordpress\CustomPostType\Timeframe::BOOKABLE_ID,
            "on",
            "w",
            0,
            '8:00 AM',
            '12:00 PM',
            'publish',
            ["1", "2", "3", "4", "5", "6", "7"],
			'',
            self::USER_ID,
            3,
            30,
            0,
            "off",
            "off",
			"off",
			"Timeframe Disabled Booking Code"
		));

		Settings::updateOption('commonsbooking_options_bookingcodes','bookingcodes','Turn,and,face,the,strange,Ch-ch-changes');
	}

	protected function tearDown(): void {
		parent::tearDown();
	}
}
