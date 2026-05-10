<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
        $middleware->alias([
            'auth' => \App\Http\Middleware\Authenticate::class,

            'company' => \App\Http\Middleware\SetCompanyScope::class,
        ]);
        $middleware->api(append: [
            //   \App\Http\Middleware\RestrictApiAccess::class,
        ]);
        $middleware->web(append: [
            //   VerifyCsrfToken::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
        $exceptions->render(function (AuthenticationException $e, $request) {
            Log::info($e->getMessage());
            return response()->json([
                // 'message' => 'Unauthenticated'
                'message' => $e->getMessage()
            ], 401);
        });
    })->create();
