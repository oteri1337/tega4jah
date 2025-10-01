<?php

namespace Server\Models;

use Server\Models\Base\ApiModel;

class Product extends ApiModel
{

    protected $guarded = [];

    protected $casts = [
        'price' => 'float',
    ];

    protected $apiWith = ['colors'];




    
    public function colors()
    {
        return $this->hasMany(Color::class);
    }




    public static function relationships($row) {

        $row->colors = $row->colors()->paginate(10);
        
        return $row;
    }

}