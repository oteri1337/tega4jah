<?php

use Server\Controllers\ProductsController;

$app->get('/api/products', ProductsController::class . ':list');

$app->get('/api/products/{attr}', ProductsController::class . ':read');

$app->post('/api/products', ProductsController::class . ':create')->add($admin_logged_in);

$app->patch('/api/products', ProductsController::class . ':update')->add($admin_logged_in);

$app->delete('/api/products', ProductsController::class . ':delete')->add($admin_logged_in); 