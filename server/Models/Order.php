<?php

namespace Server\Models;

use Server\Models\Base\ApiModel;

class Order extends ApiModel
{

    protected $guarded = [];

    protected $casts = [
        'current_latitude' => 'float',
        'current_longitude' => 'float',
    ];


    public function apiCreate($body)
    {


        if (!isset($body['total'])) {
            $this->modelResponse['errors'] = ['total is required'];
            return $this->modelResponse;
        }

        if (!isset($body['province'])) {
            $this->modelResponse['errors'] = ['province is required'];
            return $this->modelResponse;
        }

        if (!isset($body['street'])) {
            $this->modelResponse['errors'] = ['street is required'];
            return $this->modelResponse;
        }

        if (!isset($body['city'])) {
            $this->modelResponse['errors'] = ['city is required'];
            return $this->modelResponse;
        }

        if (!isset($body['province'])) {
            $this->modelResponse['errors'] = ['province is required'];
            return $this->modelResponse;
        }

        if (!isset($body['email'])) {
            $this->modelResponse['errors'] = ['email is required'];
            return $this->modelResponse;
        }

        if (!isset($body['phone_number'])) {
            $this->modelResponse['errors'] = ['phone_number is required'];
            return $this->modelResponse;
        }

        if (!isset($body['first_name'])) {
            $this->modelResponse['errors'] = ['first_name is required'];
            return $this->modelResponse;
        }

        if (!isset($body['last_name'])) {
            $this->modelResponse['errors'] = ['last_name is required'];
            return $this->modelResponse;
        }

        if (!isset($body['items'])) {
            $this->modelResponse['errors'] = ['items are required'];
            return $this->modelResponse;
        }



        $order = $this->create($body);

        $this->modelResponse['data'] = $order;

        return $this->modelResponse;
    }


}