<?php

namespace Server\Routes\Middlewares;

use Server\Models\Admin;
use GuzzleHttp\Psr7\Response;

class AdminLoggedIn
{

    public function __invoke($request, $handler)
    {

        $admin = (new Admin)->getAuthState();

        if ($admin) {

            $request = $request->withAttribute('admin', $admin);

            $response = $handler->handle($request);

            return $response;
        }


        $headers = $request->getHeaders();
        
        $origin = $headers["Origin"][0] ?? $headers["origin"][0] ?? '';

        if ($origin == "microservice") {

            $response = $handler->handle($request);

            return $response;
        }


        $response = new Response;

        $response->getBody()->write(json_encode([
            'status' => "401",
            'admin' => false,
            'errors' => ["unathorized", $origin]
        ]));

        return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
    }
}