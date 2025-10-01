<?php

use Server\Controllers\BlocksController;

$app->get('/api/blocks', BlocksController::class . ':list')->add($valid_referrer);

$app->post('/api/blocks', BlocksController::class . ':create')->add($admin_logged_in);

$app->delete('/api/blocks', BlocksController::class . ':delete')->add($admin_logged_in);