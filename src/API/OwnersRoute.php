<?php


namespace CommonsBooking\API;


use CommonsBooking\Repository\UserRepository;

class OwnersRoute extends BaseRoute
{

    /**
     * The base of this controller's route.
     *
     * @var string
     */
    protected $rest_base = 'owners';

    /**
     * Commons-API schema definition.
     * @var string
     */
    protected $schemaUrl = COMMONSBOOKING_PLUGIN_DIR . "node_modules/commons-api/commons-api.owners.schema.json";

    /**
     * Returns raw data collection.
     * @param $request
     *
     * @return \stdClass
     */
    public function getItemData($request)
    {
        $data = [];

        foreach (UserRepository::getOwners() as $owner) {
            $data[] = $this->prepare_item_for_response($owner, $request);
        }

        return $data;
    }

    public function prepare_item_for_response($owner, $request)
    {
        $ownerObject = new \stdClass();
        $ownerObject->id = "" . $owner->ID;
        $ownerObject->name = get_user_meta($owner->ID, 'first_name', true) . ' ' . get_user_meta($owner->ID, 'last_name', true);
        $ownerObject->url = $owner->user_url;

//        if($items = \CommonsBooking\Repository\Item::getByUserId($owner->ID, true)) {
//            $ownerObject->items = [];
//            $itemsRoute = new ItemsRoute();
//            foreach($items as $item) {
//                $ownerObject->items[] = $itemsRoute->prepare_item_for_response($item, new \WP_REST_Request());
//            }
//        }
//
//        if($locations = \CommonsBooking\Repository\Location::getByUserId($owner->ID, true)) {
//            $ownerObject->locations = [];
//            $locationsRoute = new LocationsRoute();
//            foreach($locations as $location) {
//                $ownerObject->locations[] = $locationsRoute->prepare_item_for_response($location, new \WP_REST_Request());
//            }
//        }
        return $ownerObject;
    }


    /**
     * Get a single item
     */
    public function get_item($request)
    {
        //get parameters from request
        $params = $request->get_params();
        $owner = get_user_by('id', $params['id']);
        $data = new \stdClass();
        $data->owners[] = $this->prepare_item_for_response($owner, $request);

        return new \WP_REST_Response($data, 200);
    }

    /**
     * Get a collection of items
     *
     * @param \WP_REST_Request $request Full data about the request.
     *
     * @return \WP_Error|\WP_REST_Response
     */
    public function get_items($request)
    {
        $data = new \stdClass();
        $data->owners = $this->getItemData($request);
        return new \WP_REST_Response($data, 200);
    }

    public function prepare_response_for_collection($itemdata)
    {
        return $itemdata;
    }

}
