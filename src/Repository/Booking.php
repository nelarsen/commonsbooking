<?php


namespace CommonsBooking\Repository;


use CommonsBooking\Plugin;
use CommonsBooking\Wordpress\CustomPostType\Timeframe;

class Booking extends PostRepository
{
    /**
     * @param $startDate
     * @param $endDate
     * @param $location
     * @param $item
     *
     * @return null|\CommonsBooking\Model\Booking
     * @throws \Exception
     */
    public static function getBookingByDate($startDate, $endDate, $location, $item)
    {
        if (Plugin::getCacheItem()) {
            return Plugin::getCacheItem();
        } else {
            // Default query
            $args = array(
                'post_type'   => Timeframe::getPostType(),
                'meta_query'  => array(
                    'relation' => "AND",
                    array(
                        'key'     => 'repetition-start',
                        'value'   => intval($startDate),
                        'compare' => '=',
                        'type'    => 'numeric'
                    ),
                    array(
                        'key'     => 'repetition-end',
                        'value'   => $endDate,
                        'compare' => '='
                    ),
                    array(
                        'key'     => 'type',
                        'value'   => Timeframe::BOOKING_ID,
                        'compare' => '='
                    ),
                    array(
                        'key'     => 'location-id',
                        'value'   => $location,
                        'compare' => '='
                    ),
                    array(
                        'key'     => 'item-id',
                        'value'   => $item,
                        'compare' => '='
                    )
                ),
                'post_status' => 'any',
                'nopaging' => true
            );

            $query = new \WP_Query($args);
            if ($query->have_posts()) {
                $posts = $query->get_posts();
                if (count($posts) == 1) {
                    $booking = new \CommonsBooking\Model\Booking($posts[0]);
                    Plugin::setCacheItem($booking);

                    return $booking;
                } else {
                    throw new \Exception(__CLASS__ . "::" . __LINE__ . ": Found more than one bookings");
                }
            }
        }
    }

}
