<?php

namespace Server\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{

    public $authKey = "admin";

    protected $connection = 'admin_database';

    protected $fillable = [
        'email',
        'password',
    ];

    protected $hidden = [
        'id',
        'password',
        'created_at',
        'updated_at',
    ];



    public function allow_last_logged_user()
    {

        if (!isset($_SESSION[$this->authKey]['user_id'])) {
            return false;
        }

        $admin = $this->where('id', $_SESSION[$this->authKey]['user_id'])->first();

        if (!$admin) {
            return false;
        }

        $last_session_id = "";

        // if ($this->authKey === "user") {
        //     $last_session_id = $admin->session_id;
        // }

        $logs = Adminlog::latest()->first();

        if ($logs) {
            $last_session_id = $logs->session_id;
        }

        if ($last_session_id != $_SESSION[$this->authKey]['session_id']) {
            return false;
        }

        return $admin;
    }


    public function getAuthState()
    {
        $admin = $this->allow_last_logged_user();

        return $admin;
    }

}