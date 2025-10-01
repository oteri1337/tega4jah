<?php

require_once('./vendor/autoload.php');

use Predis\Client;

$client = new Client([
    'scheme' => 'tcp',
    'host'   => '127.0.0.1',
    'port'   => 6379,
]);

echo "afa";
