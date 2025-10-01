<?php

// sender

namespace Server\Controllers;

use Server\Models\Admin;
use Server\Models\Adminlog;
use Server\Services\Mailer;
use Server\Controllers\AuthTrait; 



class AdminsController
{
    use AuthTrait;

    public $model;

    public $data = [
        'status' => "200",
        'message' => '',
        'errors' => [],
        'data' => [],
    ];

    public function __construct()
    {
        $this->model = new Admin;

        $this->authKey = 'admin';
    }

    public function relationships($row)
    {
        return $row;
    }

    public function status($request, $response)
    {

        $this->data['data'] = $this->model->getAuthState();

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function verifyPassword($user, $password)
    {
        return password_verify($password, $user->password);
    }

    public function encryptPassword($password)
    {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    public function create($request, $response)
    {
        $body = $request->getParsedBody();

        $errors = [];

        if (Admin::count()) {
            $errors[] = 'admin already exists';
        }

        if (count($errors)) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $body['password'] = $this->encryptPassword($body['password']);

        $created = Admin::create($body);

        $this->data['data'] = $created;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function signIn($request, $response)
    {

        $body = $request->getParsedBody();

        $errors = [];

        if (!isset($body['email'])) {
            $errors[] = 'email is required';
        }

        if (!isset($body['password'])) {
            $errors[] = 'password is required';
        }

        if (count($errors)) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $email = $body['email'];

        $email_is_found = $this->model->where('email', $email)->first();

        $admin = Admin::where('id', 1)->first();

        if (!$email_is_found) {

            $message = "Someone just tried to log in to your control panel with a <b>wrong email or password</b> from 
            
            IP - " . $_SERVER['REMOTE_ADDR'] . "
    
            DATE - " . date('D M d h:i A');

            Mailer::mail([$admin->email], $message, 'Failed Login Attempt - Control Panel');


            $this->data['errors'] = ['invalid email or password'];

            $response->getBody()->write(json_encode($this->data));

            return $response->withHeader('Content-Type', 'application/json');
        }





        $password_is_correct = password_verify($body['password'], $email_is_found->password);

        if (!$password_is_correct) {

            $message = "Someone just tried to log in to your control panel with a <b>wrong email or password</b> from 
            
            IP - " . $_SERVER['REMOTE_ADDR'] . "
    
            DATE - " . date('D M d h:i A');

            Mailer::mail([$admin->email], $message, 'Failed Login Attempt - Control Panel');


            $this->data['errors'] = ['invalid email or password'];

            $response->getBody()->write(json_encode($this->data));

            return $response->withHeader('Content-Type', 'application/json');
        }


        session_regenerate_id();

        $session_id = session_id();

        $data = [
            // 'user_id' => $row->id,
            'session_id' => $session_id,
            // 'date' => date("l jS \of F Y h:i:s A"),
            'ip_address' => $_SERVER['REMOTE_ADDR'],
            'user_agent' => $_SERVER['HTTP_USER_AGENT']
        ];

        $_SESSION['admin'] = [
            'user_id' => $email_is_found->id,
            'session_id' => $session_id
        ];

        Adminlog::create($data);

        $message = "
        
        Someone just logged in to your control panel from 
        
        IP - " . $_SERVER['REMOTE_ADDR'] . "
        
        DATE - " . date('D M d h:i A');

        Mailer::mail([$email_is_found->email], $message, 'Admin Logged In');

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }


    // public function encryptPassword($password)
    // {
    //     return sha1($password);
    // }

    // public function create($request, $response)
    // {
    //     $body = $request->getParsedBody();

    //     $errors = [];

    //     if (Admin::count()) {
    //         $errors[] = 'admin already exists';
    //     }

    //     // if (preg_match("/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/", $body['email'])) {
    //     //     $errors[] = 'must be a valid email';
    //     // }

    //     if (count($errors)) {
    //         $this->data['errors'] = $errors;
    //         $response->getBody()->write(json_encode($this->data));
    //         return $response->withHeader('Content-Type', 'application/json');
    //     }

    //     $body['password'] = sha1($body['password']);

    //     $created = Admin::create($body);

    //     $this->data['data'] = $created;

    //     $response->getBody()->write(json_encode($this->data));

    //     return $response->withHeader('Content-Type', 'application/json');
    // }

    // public function signIn($request, $response)
    // {

    //     $admin = Admin::where('id', 1)->first();


    //     $body = $request->getParsedBody();


    //     $errors = [];

    //     if (!isset($body['email'])) {
    //         $errors[] = 'email is required';
    //     }

    //     if (!isset($body['password'])) {
    //         $errors[] = 'password is required';
    //     }

    //     if (count($errors)) {
    //         $this->data['errors'] = $errors;
    //         $response->getBody()->write(json_encode($this->data));
    //         return $response->withHeader('Content-Type', 'application/json');
    //     }

    //     $email = $body['email'];

    //     $password = $this->encryptPassword($body['password']);

    //     $row = $this->model->where('email', $email)->where('password', $password)->first();


    //     // if admin password is wrong

    //     if (!$row) {

    //             $message = "Someone just tried to log in to your control panel with a <b>wrong email or password</b> from 
                
    //             IP - " . $_SERVER['REMOTE_ADDR'] . "
        
    //             DATE - " . date('D M d h:i A');

    //             Mailer::mail([$admin->email], $message, 'Failed Login Attempt - Control Panel');

    //         $this->data['errors'] = ['invalid email or password'];

    //         $response->getBody()->write(json_encode($this->data));

    //         return $response->withHeader('Content-Type', 'application/json');
    //     }

    //     session_regenerate_id();

    //     $session_id = session_id();

    //     $data = [
    //         'user_id' => $row->id,
    //         // 'ip_address' => $_SERVER['REMOTE_ADDR'],
    //         'session_id' => $session_id,
    //         'date' => date("l jS \of F Y h:i:s A"),
    //         'user_agent' => $_SERVER['HTTP_USER_AGENT']
    //     ];

    //     $_SESSION['admin'] = $data;

    //     Adminlog::create($data);


    //     $message = "DATE - ". date('D M d h:i A');

    //     if (isset($_SERVER['HTTP_TRUE_CLIENT_IP'])) {

    //         $message = "
    //             IP - " . $_SERVER['HTTP_TRUE_CLIENT_IP']. "
                
    //             DATE - " . date('D M d h:i A');

    //     }

    //     Mailer::mail([$row->email], $message, 'PBAPI3: LOGIN NOTIFICATION');

    //     $response->getBody()->write(json_encode($this->data));

    //     return $response->withHeader('Content-Type', 'application/json');
    // }

}