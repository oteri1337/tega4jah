<?php

namespace Server\Models;

use Server\Models\Base\ApiModel;

class Setting extends ApiModel
{

    protected $guarded = [];

    protected $hidden = [
        'created_at',
        'updated_at',
        'private_vapid_key'
    ];

    public function apiUpdate($body)
    {

        if (!isset($body['id'])) {
            $this->modelResponse['errors'] = ['id is required'];
            return $this->modelResponse;
        }

        $data = $this->where("id", $body['id'])->first();

        $data->update($body);

        return $this->apiList();
    }

}