<?php

namespace Server\Controllers;

// use Server\Models\Page;
// use Server\Models\Plan;
// use Server\Models\News;
// use Server\Models\Image;
// use Server\Models\Staff;

use Server\Models\User;
use Server\Models\Admin;
use Server\Models\Review;
use Server\Models\Setting;
use Server\Services\Mailer;
use Server\Services\Renderer;
use Illuminate\Pagination\Paginator;

class CmsController
{
    public $data = [
        'status' => "200",
        'message' => '',
        'errors' => [],
        'data' => [],
    ];


    public function graph($request, $response)
    {
        $data = [];


        $data['admin'] = (new Admin)->getAuthState();



        Paginator::currentPathResolver(function () {
            return "/api/users/auth/status";
        });

        $data['user'] = (new User)->getAuthState();




        Paginator::currentPathResolver(function () { 
            return "/api/settings";
        });

        $data['settings'] = (new Setting)->apiList()['data'];



        $response->getBody()->write(json_encode($data));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function sendEmail($request, $response)
    {
        $body = $request->getParsedBody();

        $from = $body['from'] ?? NULL;

        $password = $body['password'] ?? NULL;

        $smtp_server = $body['smtp_server'] ?? NULL;

        $sent = Mailer::mail([$body['to']], $body['body'], $body['subject'], $from, $password, $smtp_server);


        if (!$sent) {
            $this->data['errors'] = ['failed to send'];

            $response->getBody()->write(json_encode($this->data));

            return $response->withHeader('Content-Type', 'application/json');
        }

        $this->data['message'] = 'Sent';
        $response->getBody()->write(json_encode($this->data));
        return $response->withHeader('Content-Type', 'application/json');
    }

        public function renderApp($request, $response)
    {

        $template = "index.twig";

        $settings = Setting::where('id', 1)->first();

        $data = Renderer::render($template, [
            'CHAT_CODE' => $settings->chat_code,
            'LINK_TITLE' => $settings->link_title,
            'LINK_DESCRIPTION' => $settings->link_description,
            'GOOGLE_MAPS_API_KEY' => $settings->google_maps_api_key
        ]);
        
        $response->getBody()->write($data);

        return $response;
    }

}