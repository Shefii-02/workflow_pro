<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetCompanyScope
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth('api')->user();

        if ($user && $user->company_id) {
            app()->instance('company_id', $user->company_id); // ✅ bind here
        }

        return $next($request);
    }
}
