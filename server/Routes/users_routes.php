<?php

use Server\Controllers\UsersController;


// CRUD

$app->post('/api/users', UsersController::class . ':create');

$app->get('/api/users', UsersController::class . ':list')->add($admin_logged_in);

$app->patch('/api/users/transfer', UsersController::class . ':transfer')->add($user_logged_in);

$app->patch('/api/users/update/user', UsersController::class . ':userUpdate')->add($user_logged_in);

$app->patch('/api/users/update/admin', UsersController::class . ':adminUpdate')->add($admin_logged_in);

$app->patch('/api/users/list/update', UsersController::class . ':adminListUpdate')->add($admin_logged_in);

$app->delete('/api/users', UsersController::class . ':delete')->add($admin_logged_in);

$app->get('/api/users/{attr}', UsersController::class . ':read')->add($admin_logged_in);