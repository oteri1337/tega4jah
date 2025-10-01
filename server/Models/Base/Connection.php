<?php

namespace Server\Models\Base;

use Illuminate\Events\Dispatcher;
use Illuminate\Pagination\Paginator;
use Illuminate\Database\Capsule\Manager;

class Connection
{
    public $capsule;

    public function __construct()
    {

        $warm_database = [
            'strict' => false,
            'host' => $_ENV["DB_HOST"],
            'port' => $_ENV["DB_PORT"],
            'driver' => $_ENV["DB_DRIVER"],
            'password' => $_ENV["DB_PASS"],
            'username' => $_ENV["DB_USER"],
            'database' => $_ENV["DB_NAME"],
        ];

        $admin_database = [
            'strict' => false,
            'host' => $_ENV["DB_HOST"],
            'port' => $_ENV["DB_PORT"],
            'driver' => $_ENV["DB_DRIVER"],
            'password' => $_ENV["DB_PASS"],
            'username' =>  $_ENV["DB_USER"],
            'database' =>  $_ENV["DB_NAME"],
        ];

        $capsule = new Manager;
        $capsule->addConnection($warm_database);
        $capsule->addConnection($admin_database, "admin_database");
        $capsule->setEventDispatcher(new Dispatcher);
        $capsule->setAsGlobal();
        $capsule->bootEloquent();

        Paginator::currentPathResolver(function () {
            return preg_replace('/([&?])page=[^&]+/', '', $_SERVER['REQUEST_URI']);
        });

        Paginator::currentPageResolver(function () {
            return $_GET['page'] ?? 1;
        });

        $this->capsule = $capsule;
    }
}