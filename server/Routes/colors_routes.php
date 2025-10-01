<?php

use Server\Controllers\ColorsController;

$app->get('/api/colors', ColorsController::class . ':list')->add($admin_logged_in);

$app->post('/api/colors', ColorsController::class . ':create')->add($admin_logged_in);

$app->patch('/api/colors', ColorsController::class . ':update')->add($admin_logged_in);

$app->delete('/api/colors', ColorsController::class . ':delete')->add($admin_logged_in); 