<?php

require_once("vendor/autoload.php"); 

$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

return [
    'paths' => [
        'migrations' => 'database/Migrations/Admin',
    ],
    'environments' => [
        'default' => [
            'name' => $_ENV["DB_NAME"]."_admin", 
            'user' => $_ENV["DB_USER"],
            'pass' => $_ENV["DB_PASS"],
            'host' => $_ENV["DB_HOST"],
            'port' => $_ENV["DB_PORT"],
            'adapter' => $_ENV["DB_DRIVER"],
            'unix_socket' => $_ENV["DB_SOCKET"]
        ]
    ],
    'templates' => ['file' => 'database/Migrations/template.txt'],
];