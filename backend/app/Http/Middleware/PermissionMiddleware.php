<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionMiddleware
{
    public function handle($request, Closure $next, $permission)
    {
        $user = auth()->user();

        if (!$user->roles()
            ->whereHas('permissions', fn($q) => $q->where('slug', $permission))
            ->exists()) {

            return response()->json(['error' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}
