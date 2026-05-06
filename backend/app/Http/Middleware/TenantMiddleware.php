<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


class TenantMiddleware
{
    public function handle($request, Closure $next)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Attach company_id globally
        app()->instance('company_id', $user->company_id);

        return $next($request);
    }
}
