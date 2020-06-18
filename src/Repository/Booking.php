<?php


namespace CommonsBooking\Repository;


use CommonsBooking\Wordpress\CustomPostType\Timeframe;

class Booking
{
    /**
     * @param $startDate
     * @param $endDate
     * @param $location
     * @param $item
     * @return null|\WP_Post
     * @throws \Exception
     */
    public static function getBookingByDate($startDate, $endDate, $location, $item) {
        // Default query
        $args = array(
            'post_type' => Timeframe::getPostType(),
            'meta_query' => array(
                'relation' => "AND",
                array(
                    'key' => 'start-date',
                    'value' => intval($startDate),
                    'compare' => '=',
                    'type' => 'numeric'
                ),
                array(
                    'key' => 'end-date',
                    'value' => $endDate,
                    'compare' => '='
                ),
                array(
                    'key' => 'type',
                    'value' => Timeframe::BOOKING_ID,
                    'compare' => '='
                ),
                array(
                    'key' => 'location-id',
                    'value' => $location,
                    'compare' => '='
                ),
                array(
                    'key' => 'item-id',
                    'value' => $item,
                    'compare' => '='
                )
            ),
            'post_status' => 'any'
        );

        $query = new \WP_Query($args);
        if ($query->have_posts()) {
            $posts = $query->get_posts();
            if(count($posts) == 1) {
                return $posts[0];
            } else {
                throw new \Exception(__CLASS__ . "::" . __LINE__ . ": Found more then one bookings");
            }

        }
    }

}
