<?php

namespace Server\Controllers;

use Server\Models\Block;
use Server\Controllers\Base\ApiController;

class BlocksController extends ApiController
{

    public function __construct()
    {
        $this->model = new Block;
    }
}