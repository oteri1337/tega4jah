<?php

use Server\Controllers\StaffsController;

$app->get('/api/staffs', StaffsController::class . ':list')->add($admin_logged_in);

$app->post('/api/staffs', StaffsController::class . ':create')->add($admin_logged_in);

$app->delete('/api/staffs', StaffsController::class . ':delete')->add($admin_logged_in); 