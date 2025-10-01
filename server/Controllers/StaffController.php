<?php

namespace Server\Controllers;

use Server\Models\Staff;
use Server\Controllers\Base\ApiController;

class StaffsController extends ApiController
{

    public function __construct()
    {
        $this->model = new Staff;
    }
}