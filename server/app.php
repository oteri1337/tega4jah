<?php

require_once("database.php");

use Slim\Factory\AppFactory;
use GuzzleHttp\Psr7\Response;

use Predis\Client;

// $client = new Client('redis://red-cvm3ubh5pdvs739ghnk0:6379');

$client = new Client();

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$customErrorHandler = function ($request, $exception, $displayErrorDetails, $logErrors, $logErrorDetails, $logger = null) use ($app) {

    $errorDetails = [
        $exception->getFile(),
        $exception->getLine(),
        $exception->getCode(),
        $exception->getMessage(),
        $exception->getTraceAsString(),
      ];

    $payload = ['errors' => $errorDetails, 'data' => [], 'message' => ''];

    $response = new Response;

    $response->getBody()->write(json_encode($payload));

    return $response->withHeader('Content-Type', 'application/json');

};

$app->addErrorMiddleware(true, true, true)->setDefaultErrorHandler($customErrorHandler);

$user_logged_in = new Server\Routes\Middlewares\UserLoggedIn;
$admin_logged_in = new Server\Routes\Middlewares\AdminLoggedIn;
$user_or_admin_logged_in = new Server\Routes\Middlewares\UserOrAdminLoggedIn;

require_once('Routes/admins_auth_routes.php');
require_once('Routes/users_auth_routes.php');
require_once('Routes/products_routes.php');
require_once('Routes/colors_routes.php');
require_once('Routes/orders_routes.php');
require_once('Routes/users_routes.php');
require_once('Routes/cms_routes.php');

// cors start //

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// cors end //