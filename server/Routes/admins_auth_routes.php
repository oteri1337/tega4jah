<?php

use Server\Controllers\AdminsController;

$app->post('/api/admins', AdminsController::class . ':create');

$app->get('/api/admins/auth/status', AdminsController::class . ':status');

$app->post('/api/admins/auth/signin', AdminsController::class . ':signin');

$app->get('/api/admins/auth/signout', AdminsController::class . ':signout');

$app->patch('/api/admins/auth/update/password-user', AdminsController::class . ':userUpdatePassword')->add($admin_logged_in);