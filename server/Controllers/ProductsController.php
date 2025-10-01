<?php

namespace Server\Controllers;

use Server\Models\Product;
use Server\Controllers\Base\ApiController;

class ProductsController extends ApiController
{

    public function __construct()
    {
        $this->model = new Product;
    }
}