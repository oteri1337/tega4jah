<?php

namespace Server\Models;

use Server\Models\Base\ApiModel;

class Block extends ApiModel
{

    public $apiReadBy = 'ip_address';

    protected $hidden = [
        'created_at', 
        'updated_at',
    ];

    protected $fillable = [
        'ip_address',
    ];

    public function apiCreate($body)
    {

        if (!preg_match("/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/", $body['ip_address'])) {

            $this->modelResponse['errors'] = ['must be a valid ip address'];

            return $this->modelResponse;

        }

        $created = $this->create($body);

        $this->modelResponse['data'] = $created;

        return $this->modelResponse;
    }



}