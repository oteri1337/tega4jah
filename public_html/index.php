<?php
 
session_start();

define("HTML_DIR", __DIR__);

define("EMAIL_DIR", __DIR__ . DIRECTORY_SEPARATOR . "assets" . DIRECTORY_SEPARATOR . "email" . DIRECTORY_SEPARATOR);

define("IMAGE_DIR", __DIR__ . DIRECTORY_SEPARATOR . "uploads" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR);

define("PWA_DIR", __DIR__ . DIRECTORY_SEPARATOR . "assets" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . "pwa" . DIRECTORY_SEPARATOR);

require_once('../vendor/autoload.php');

$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . "/../");

$dotenv->load();

require_once('../server/database.php');

use Server\Models\Cookie;

if (!isset($_COOKIE["pro"])) {

    // Important Rules:
    // Set the Secure flag if you're using HTTPS.
    // Use HttpOnly to prevent JavaScript access (for security). 
    // Use SameSite=None; Secure if you want cross-site cookies (e.g., for third-party tracking).

    $prefix = str_replace("noreply@","",$_ENV['MAIL_USER']);

    $cookie = $prefix."-".Cookie::count()+1;

    setcookie("pro", $cookie, [
        'path' => '/',
        'secure' => true,
        'httponly' => true, 
        'samesite' => 'None'
    ]);
} else {
    
    $cookie = $_COOKIE["pro"];
    
    $isSaved = Cookie::where('cookie', $cookie)->exists();

    if (!$isSaved) {
        Cookie::create(['cookie' => $cookie, 'user_agent' => $_SERVER['HTTP_USER_AGENT'], 'created_ip' => $_SERVER['REMOTE_ADDR']]);
    }
}

require_once('../server/app.php');

$app->run();