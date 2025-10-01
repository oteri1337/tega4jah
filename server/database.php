<?php

use Server\Models\Base\Connection;
use Server\Models\Base\DevConnection;

if ($_ENV['NODE_ENV'] == 'production') {
    new Connection;
} else {
    new DevConnection;
}

