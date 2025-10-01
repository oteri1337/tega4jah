<?php

use Server\Controllers\CmsController;

$app->get('/api/graph', CmsController::class . ':graph'); 

$app->get('/[{path:.*}]', CmsController::class . ':renderApp');