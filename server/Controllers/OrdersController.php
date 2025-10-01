<?php

namespace Server\Controllers;

use Server\Models\Order;
use Server\Controllers\Base\ApiController;

class OrdersController extends ApiController
{

    public function __construct()
    {
        $this->model = new Order;
    }
}