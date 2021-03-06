<?php

namespace CommonsBooking\Wordpress\Options;
use CommonsBooking\Settings\Settings;

/**
 * AdminOptions
 */
class AdminOptions
{
    private static $option_key = COMMONSBOOKING_PLUGIN_SLUG . '_options';

    /**
     * set default values to admin options fields as defined in includes/OptionsArray.php
     *
     * @return void
     */
    public static function setOptionsDefaultValues() {

        $options_array = include(COMMONSBOOKING_PLUGIN_DIR . '/includes/OptionsArray.php');
        foreach ($options_array as $tab_id => $tab) {
            $groups = $tab['field_groups'];

            foreach ($groups as $group_id => $group) {
                $fields = $group['fields'];
                $option_key = self::$option_key . '_' . $tab_id;
                $option = array();

                foreach ($fields as $field) {

                    $field_id = $field['id'];

                    // set to current value from wp_options
                    $option[$field_id] = Settings::getOption( $option_key, $field_id );
                    
                    if (array_key_exists( 'default', $field ) ) {
                        // if field-value is not set already we add the default value to the options array
                        if ( empty ( $option[$field_id] ) ) {
                            $option[$field_id] = $field['default'];
                        }
                    }
                }

                // update option     
                    update_option($option_key, $option);            
            }

        }
    }

}
