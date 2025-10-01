<?php

namespace Server\Models;

use Server\Models\Base\ApiModel;

class Color extends ApiModel
{

    protected $guarded = [];


    public function apiDelete($body)
    {
        $color = $this->where("id", $body["id"])->first();

        if (!$color) {
            $this->modelResponse['errors'] = ['color not found'];
            return $this->modelResponse;
        }

        $product_id = $color->product_id;

        $color->delete();

        $product = Product::where("id", $product_id)->first();

        $product = Product::relationships($product);

        $this->modelResponse['data'] = $product;
        
        return $this->modelResponse;
    }


}