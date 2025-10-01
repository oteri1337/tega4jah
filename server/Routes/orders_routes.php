<?php

use Server\Controllers\OrdersController;

$app->get('/api/orders', OrdersController::class . ':list')->add($admin_logged_in);

$app->post('/api/orders', OrdersController::class . ':create');

$app->delete('/api/orders', OrdersController::class . ':delete')->add($admin_logged_in); 