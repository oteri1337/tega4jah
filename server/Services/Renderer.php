<?php

namespace Server\Services;

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

class Renderer
{

    public static function render($view, $data = [])
    {

        $loader = new FilesystemLoader(__DIR__ . '/../Views');

        $lib = new Environment($loader, ['cache' => false]);

        $data['NODE_NAME'] = $_ENV["NODE_NAME"];

        return $lib->render($view, $data);

    }

}