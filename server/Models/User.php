<?php

namespace Server\Models;

use Server\Models\Base\ApiModel;
use Illuminate\Pagination\Paginator;

class User extends ApiModel
{

    public $apiPerPage = 100;

    public $authKey = "user";

    public $apiSearchBy = "first_name";

    public $apiSearchIcon = "photo_profile";

    protected $casts = [
        'pinned' => 'integer',
    ];
    
    protected $guarded = [];

    public function apiList()
    {

        $paginator = $this->orderBy('pinned', 'desc')->orderBy($this->apiOrderBy, $this->apiOrder)->paginate($this->apiPerPage);

        $data = $this->getListShape($paginator);

        $this->modelResponse['data'] = $data;

        return $this->modelResponse;
    }

    public function apiCreate($body)
    {

        $errors = [];

        if (!isset($body['email'])) {
            $errors[] = 'email is required';
        }

        if (!isset($body['password'])) {
            $errors[] = 'password is required';
        }

        if (!isset($body['confirm_password'])) {
            $errors[] = 'Password Confirmation is required';
        }

        if ($body['password'] != $body['confirm_password']) {
            $errors[] = 'Passwords Do Not Match';
        }

        $email_exists = $this->where("email", $body['email'])->first();
        if ($email_exists) {
            $errors[] = "Email Already In Use";
        }

        if (count($errors)) {
            $this->modelResponse['errors'] = $errors;
            return $this->modelResponse;
        }

        $body['pin'] = rand(11111, 99999);

        $body['email'] = strtolower($body['email']);

        $body['created_ip'] = $_SERVER['REMOTE_ADDR'];

        $body['created_user_agent'] = $_SERVER['HTTP_USER_AGENT'];



        if (isset($body['account_type'])) {
            if ($body['account_type'] == "Demo") {
                $body['trading_balance_total'] = 1000;
                $body['trading_balance_deposit'] = 1000;
            }
        }

        $row = $this->create($body);

        $row = $this->where('id', $row->id)->first();

        $row = $this->relationships($row);


        if (isset($body['push_subscription'])) {
            Device::create([
                'user_id' => $row->id,
                'user_agent' => $_SERVER['HTTP_USER_AGENT'],
                'push_subscription' => $body['push_subscription']
            ]);
        }

        $this->modelResponse['data'] = $row;

        return $this->modelResponse;
    }

    public function apiDelete($body)
    {

        if (!isset($body['id'])) {
            $this->modelResponse['errors'] = ['id is required'];
            return $this->modelResponse;
        }

        $this->where("id", $body["id"])->delete();

        $paginator = $this->orderBy($this->apiOrderBy, $this->apiOrder)->paginate($this->apiPerPage);

        $data = $this->getListShape($paginator);

        $this->modelResponse['data'] = $data;

        return $this->modelResponse;
    }

    public function apiUpdate($body)
    {
        $row = $this->where("id", $body['id'])->first();

        $row->update($body);

        $row = $this->where('id', $body['id'])->first();

        $row = $this->relationships($row);

        $this->modelResponse['data'] = $row;

        return $this->modelResponse;
    }




    // general relationships

    public function orders()
    {
        return $this->hasMany(Order::class)->orderBy('created_at', 'DESC');
    }



    public static function relationships($row)
    {


        Paginator::currentPathResolver(function () use ($row) {

            if (isset($_SESSION['admin']['user_id'])) {
                return "/api/users/" . $row->id;
            }

            return "/api/users/auth/status";
        });

        $row->orders = $row->orders()->paginate(50);

        return $row;
    }

    public function lazyLoadRelationships($row)
    {
        $this->$row;
    }






    // general attributes


    public function getAuthState()
    {
        $user = $this->allow_all_logged_users();
        return $user;
    }

    public function allow_all_logged_users()
    {

        if (!isset($_SESSION[$this->authKey]['user_id'])) {
            return false;
        }

        $user = $this->where('id', $_SESSION[$this->authKey]['user_id'])->first();

        if (!$user) {
            return false;
        }

        $user = User::relationships($user);

        return $user;
    }


    public function getReferralLinkAttribute()
    {
        return "signup?user_id=" . $this->id;
    }

    public function getAllRequiredVerificationsAttribute()
    {

        $v = "Completed";

        $settings = Setting::where('id', 1)->first();

        if ($settings->id_verification === "required" && $this->id_verification != "Completed") {
            $v = "Pending";
        }

        if ($settings->email_verification === "required" && $this->email_verification != "Completed") {
            $v = "Pending";
        }

        if ($settings->address_verification === "required" && $this->address_verification != "Completed") {
            $v = "Pending";
        }

        return $v;
    }


    // public function getUnreadNotificationsAttribute()
    // {
    //     return $this->notifications()->where('status', 'UnRead')->count();
    // }




}