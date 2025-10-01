<?php

namespace Server\Controllers;

use Server\Models\Color;
use Server\Controllers\Base\ApiController;

class ColorsController extends ApiController
{

    public function __construct()
    {
        $this->model = new Color;
    }
}