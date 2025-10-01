<?php

namespace Server\Controllers;

use Server\Models\User;
use Server\Models\Admin;
use Server\Models\Device;
use Server\Models\Setting;
use Server\Services\Mailer;
use Server\Services\Pusher;
use Server\Services\Uploader;
use Server\Controllers\AuthTrait;
use Server\Controllers\Base\ApiController;



class UsersController extends ApiController
{
    use AuthTrait;


    public function __construct()
    {
        $this->model = new User;

        $this->authKey = 'user';
    }





    public function transfer($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute("user");
        $user_id = $user->id;
        $user = User::where('id', $user->id)->first();

        $errors = [];

        if (!isset($body['to'])) {
            $errors[] = 'to is required';
        }

        if (!isset($body['from'])) {
            $errors[] = 'from is required';
        }

        if (!isset($body['amount'])) {
            $errors[] = 'amount is required';
        }

        if (count($errors)) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $to = $body['to'];

        $from = $body['from'];

        $from_balance = $user[$from] - $body['amount'];

        if ($from_balance < 0) {
            $this->data['errors'] = ['insufficient funds'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $to_balance = $user[$to] + $body['amount'];

        $user->update([$to => $to_balance, $from => $from_balance]);

        $user = User::where('id', $user_id)->first();
        $user = User::relationships($user);
        $this->data['data'] = $user;
        $this->data['message'] = 'transfer successful';

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

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $email = $body['email'] ?? '';
        
        $password = $body['password'] ?? '';

        $password = $this->encryptPassword($password);

        $user = $this->model->where('email', $email)->where('password', $password)->first();

        if (!$user) {
            $this->data['errors'] = ['invalid email or password'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $settings = Setting::where('id', 1)->first();

        if ($settings->login_verification == "enabled") {

            $twoFactorCode = rand(111111, 999999);

            $user_update['pin'] = $twoFactorCode;

            $user_update['login_verification'] = "Pending";


            $content = 'YOUR TWO FACTOR AUTH CODE IS ' . $twoFactorCode;

            $sent = Mailer::mail([$user->email], $content, "AUTH CODE");

            if (!$sent) {
                $this->data['errors'] = ["failed to send email"];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }
        }


        if ($settings->when_user_logs_in == "yes") {

            $title = "User Logged In - " . date('h:i A');

            $message = " 
            
            " . $user->first_name . " " . $user->last_name . " Just Logged In




            IP - " . $_SERVER['REMOTE_ADDR'] . "
            
            DATE - " . date('D M d h:i A');


            $admin = Admin::where('id', 1)->first();

            Mailer::mail([$admin->email], $message, $title);

        }


        // session stuff
        session_regenerate_id();

        $session_id = session_id();

        $data = [
            'user_id' => $user->id,
            'ip_address' => $_SERVER['REMOTE_ADDR'],
            'session_id' => $session_id,
            'date' => date("l jS \of F Y h:i:s A"),
            'user_agent' => $_SERVER['HTTP_USER_AGENT']
        ];

        $_SESSION['user'] = $data;




        $user_update['session_id'] = $session_id;
        $user_update['last_login_cookie'] = $_COOKIE['pro'];
        $user_update['last_login_ip'] = $_SERVER['REMOTE_ADDR'];
        $user_update['last_login_date'] = date("Y-m-d H:i:s");
        $user_update['last_login_user_agent'] = $_SERVER['HTTP_USER_AGENT'];

        $user->update($user_update);
        $user = $this->model->relationships($user);
        $this->data['data'] = $user;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function silentSignIn($request, $response)
    {

        $body = $request->getParsedBody();

        $errors = [];

        if (!isset($body['email'])) {
            $errors[] = 'email is required';
        }

        if (!isset($body['password'])) {
            $errors[] = 'password is required';
        }

        if ($errors) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $email = $body['email'] ?? '';
        $password = $body['password'] ?? '';

        $password = $this->encryptPassword($password);

        $user = $this->model->where('email', $email)->where('password', $password)->first();

        if (!$user) {
            $this->data['errors'] = ['invalid email or password'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        session_regenerate_id();

        $session_id = session_id();

        $data = [
            'user_id' => $user->id,
            'ip_address' => $_SERVER['REMOTE_ADDR'],
            'session_id' => $session_id,
            'date' => date("l jS \of F Y h:i:s A"),
            'user_agent' => $_SERVER['HTTP_USER_AGENT']
        ];

        $_SESSION['user'] = $data;

        $user = $this->model->relationships($user);

        $this->data['data'] = $user;

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }



    public function getListModel()
    {
        return $this->model->latest();
    }

    public function relationships($row)
    {
        return User::relationships($row);
    }



    public function status($request, $response)
    {

        $this->data['data'] = $this->model->getAuthState();

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    protected function filter($body, $safeArray)
    {
        $safeData = [];

        foreach ($safeArray as $key) {
            if (isset($body[$key])) {
                $safeData[$key] = $body[$key];
            }
        }

        return $safeData;
    }

    public function sendPin($request, $response)
    {
        $body = $request->getParsedBody();
        $email = $body['email'] ?? '';

        $errors = [];

        if (!isset($body['email'])) {
            $errors[] = 'email is required';
        }

        if (count($errors)) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $user = $this->model->where('email', $email)->first();

        if (!$user) {
            $this->data['errors'] = ['email not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $pin = rand(11111, 55555);
            
        $user->update(['pin' => $pin]);

        $settings = Setting::where('id', 1)->first();

        $mail_content = $settings->verification_mail_body;

        $mail_content = str_replace("[first]", $user->first_name, $mail_content);

        $mail_content = str_replace("[last]", $user->last_name, $mail_content);

        $mail_content = str_replace("[pin]", $user->pin, $mail_content);

        $sent = Mailer::mail([$user->email], $mail_content, $settings->verification_mail_subject);


        if (!$sent) {
            $this->data['errors'] = ['Failed to send PIN. contact ' . getenv("MAIL_USERNAME")];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->data['message'] = 'PIN sent.';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function sendPush($request, $response)
    {
        $body = $request->getParsedBody();

        $errors = [];

        if (!isset($body['subject'])) {
            $errors[] = 'subject is required';
        }

        if (!isset($body['body'])) {
            $errors[] = 'body is required';
        }

        if (!isset($body['push_subscription'])) {
            $errors[] = 'push subscription is required';
        }

        if (count($errors)) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $res = Pusher::push([$body['push_subscription']], $body['body'], $body['subject']);

        if (count($res['errors'])) {
            Device::where('push_subscription', $body['push_subscription'])->delete();
        }


        $this->data['errors'] = $res['errors'];

        $this->data['message'] = $res['message'];

        $response->getBody()->write(json_encode($this->data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function sendWithdrawalCode($request, $response)
    {

        $user = $request->getAttribute('user');

        $user = User::where('id', $user->id)->first();

        $withdrawal_code = rand(111111, 999999);

        $user->update(['withdrawal_code' => $withdrawal_code]);




        $settings = Setting::where('id', 1)->first();

        if ($settings->withdrawal_code == "email") {

            $message = "YOUR WITHDRAWAL OTP IS " . $withdrawal_code;

            $sent = Mailer::mail([$user->email], $message, "WITHDRAWAL OTP");

            if (!$sent) {
                $this->data['errors'] = ["failed to send email"];
                $response->getBody()->write(json_encode($this->data));
                return $response->withHeader('Content-Type', 'application/json');
            }
        }





        $user = User::where('id', $user->id)->first();

        $user = User::relationships($user);

        $this->data['data'] = $user;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateEmail($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute("user");
        $user = User::where('id', $user->id)->first();

        $errors = [];

        if (!isset($body['email'])) {
            $this->data['errors'] = ['email is required'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        // if same email and email is verified
        if ($body['email'] == $user->email && $user->email_verification == "Completed") {
            $this->data['errors'] = ['must be a different email'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        // if different email or not verified

        // update email
        $pin = rand(11111, 99999);

        $user->update(['email' => $body['email'], 'email_verification' => "Pending", 'pin' => $pin]);


        // send pin

        $settings = Setting::where('id', 1)->first();

        $mail_content = $settings->verification_mail_body;

        $mail_content = str_replace("[first]", $user->first_name, $mail_content);

        $mail_content = str_replace("[last]", $user->last_name, $mail_content);

        $mail_content = str_replace("[pin]", $user->pin, $mail_content);

        $sent = Mailer::mail([$body['email']], $mail_content, $settings->verification_mail_subject);

        if (!$sent) {
            $this->data['errors'] = ['Failed to send PIN. contact ' . getenv("MAIL_USERNAME")];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        // send response
        $user = User::where('id', $user->id)->first();
        $user = $this->relationships($user);
        $this->data['data'] = $user;
        $this->data['message'] = "sent to " . $body['email'];
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function verifyEmail($request, $response)
    {
        $body = $request->getParsedBody();
        $user = $request->getAttribute('user');
        $user_id = $user->id;

        if ($user->pin != $body['pin']) {
            $this->data['errors'] = ['Incorrect PIN'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        if ($user->pin == $body['pin']) {
            $user = User::where('id', $user_id)->first();
            $user->update(['email_verification' => "Completed", 'login_verification' => 'Completed', 'pin' => rand(11111, 99999)]);
        }

        $user = User::where('id', $user_id)->first();
        
        $user = User::relationships($user);

        $this->data['data'] = $user;
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }


    public function userUpdate($request, $response)
    {

        $user = $request->getAttribute('user');
        $user = User::where('id', $user->id)->first();

        $body = $request->getParsedBody();
        $user->update($body);

        $user = User::where('id', $user->id)->first();
        $user = User::relationships($user);

        $this->data['data'] = $user;
        $this->data['message'] = 'Updated';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function adminUpdate($request, $response)
    {

        $body = $request->getParsedBody();

        if (!isset($body['id'])) {
            $this->data['errors'] = ['user id is required'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = User::where('id', $body['id'])->first();

        if (!$row) {
            $this->data['errors'] = ['not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row->update($body);

        $user = $this->model->where('id', $body['id'])->first();
        $user = $this->relationships($user);


        $this->data['data'] = $user;
        $this->data['message'] = 'Updated';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updatePhoto($request, $response)
    {

        $user = $request->getAttribute('user');

        $user = $this->model->where('id', $user->id)->first();






        $imagename = "user-" . $user->id . "-photo-" . time() . ".png";

        $uploaderResponse = Uploader::upload('photo', $imagename);

        if (count($uploaderResponse['errors'])) {
            $this->data['errors'] = $uploaderResponse['errors'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $body['photo'] = $uploaderResponse['fullname'];


        $user->update(['photo_profile' => $body['photo']]);
        $user = $this->model->where('id', $user->id)->first();
        $user = $this->relationships($user);


        $this->data['data'] = $user;
        $this->data['message'] = "Photo Updated";
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function adminListUpdate($request, $response)
    {

        $body = $request->getParsedBody();

        if (!isset($body['id'])) {
            $this->data['errors'] = ['user id is required'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $user = User::where('id', $body['id'])->first();

        if (!$user) {
            $this->data['errors'] = ['not found'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $pinned = strval($body['pinned']);
        
        $user->update(['pinned' => $pinned]);

        $response->getBody()->write(json_encode($this->model->apiList()));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function uploadUtilityBill($request, $response)
    {

        $user = $request->getAttribute('user');

        $user = User::where('id', $user->id)->first();


        $imagename = "user-" . $user->id . "-bill-" . time() . ".png";

        $uploaderResponse = Uploader::upload('bill', $imagename);

        if (count($uploaderResponse['errors'])) {
            $this->data['errors'] = $uploaderResponse['errors'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $body['bill'] = $uploaderResponse['fullname'];



        $user->update([
            'photo_utility_bill' => $body['bill'],
            'address_verification' => 'In Progress'
        ]);

        $user = $this->model->where('id', $user->id)->first();
        $user = $this->relationships($user);

        $this->data['data'] = $user;
        $this->data['message'] = "Upload Successful";

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function uploadIdentityCard($request, $response)
    {

        $user = $request->getAttribute('user');

        $user = User::where('id', $user->id)->first();





        $imagename = "user-" . $user->id . "-id-front-" . time() . ".png";
        $uploaderResponse = Uploader::upload('front', $imagename);

        if (count($uploaderResponse['errors'])) {
            $this->data['errors'] = $uploaderResponse['errors'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $body['front'] = $uploaderResponse['fullname'];

        $imagename = "user-" . $user->id . "-id-back-" . time() . ".png";

        // sleep(100);

        $uploaderResponse = Uploader::upload('back', $imagename);

        if (count($uploaderResponse['errors'])) {
            $this->data['errors'] = $uploaderResponse['errors'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $body['back'] = $uploaderResponse['fullname'];


        $user->update([
            'photo_back_view' => $body['back'],
            'photo_front_view' => $body['front'],
            'id_verification' => 'In Progress'
        ]);

        $user = $this->model->where('id', $user->id)->first();
        $user = $this->relationships($user);

        $this->data['data'] = $user;
        $this->data['message'] = "Upload Successful. Your identification card is currently being reviewed, if successful your account will be approved within 24 hours.";

        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function guestUpdatePassword($request, $response)
    {
        $body = $request->getParsedBody();

        $errors = [];

        if (!isset($body['email'])) {
            $errors[] = 'email is required';
        }

        if (!isset($body['password_token'])) {
            $errors[] = 'token is required';
        }

        if (!isset($body['new_password'])) {
            $errors[] = 'password is required';
        }

        if (count($errors)) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        if ($body['new_password'] != $body['confirm_new_password']) {
            $errors[] = 'passwords do not match';
        }

        if (count($errors)) {
            $this->data['errors'] = $errors;
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $email = $body['email'] ?? '';
        $token = $body['password_token'] ?? '';
        $password = $body['new_password'] ?? '';

        $row = $this->model->where('email', $email)->where('pin', $token);

        if (!$row->exists()) {
            $this->data['errors'] = ['invalid/expired token'];
            $response->getBody()->write(json_encode($this->data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $row = $row->first();

        $row->update(['password' => $this->encryptPassword($password), 'pin' => NULL]);

        $row = $this->relationships($row);

        $this->data['data'] = $row;
        $this->data['message'] = "Password Updated Successfully";
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }



}