<?php

namespace Server\Models\Base;

class DevConnection
{
    public $capsule;

    public function __construct()
    {

        $warm_database = [
            'strict' => false,
            'port' => $_ENV["DB_PORT"],
            'host' => $_ENV["DB_HOST"],
            'driver' => $_ENV["DB_DRIVER"],
            'password' => $_ENV["DB_PASS"],
            'username' => $_ENV["DB_USER"],
            'database' => $_ENV["DB_NAME"],
        ];

        $admin_database = [
            'strict' => false,
            'port' => $_ENV["DB_PORT"],
            'host' => $_ENV["DB_HOST"],
            'driver' => $_ENV["DB_DRIVER"],
            'password' => $_ENV["DB_PASS"],
            'username' =>  $_ENV["DB_USER"],
            'database' =>  $_ENV["DB_NAME"]."_admin",
        ];

        $capsule = new \Illuminate\Database\Capsule\Manager;
        $capsule->addConnection($warm_database);
        $capsule->addConnection($admin_database, "admin_database");
        $capsule->setEventDispatcher(new \Illuminate\Events\Dispatcher);
        $capsule->setAsGlobal();
        $capsule->bootEloquent();

        \Illuminate\Pagination\Paginator::currentPathResolver(function () {
            // return $_SERVER['REQUEST_URI'];
            // return strtok($_SERVER['REQUEST_URI'], "?");
            return preg_replace('/([&?])page=[^&]+/', '', $_SERVER['REQUEST_URI']);
        });

        \Illuminate\Pagination\Paginator::currentPageResolver(function () {
            return $_GET['page'] ?? 1;
        });

        $this->capsule = $capsule;
    }
}