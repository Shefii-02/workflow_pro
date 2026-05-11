<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthenticateApi
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            // Check if user is authenticated
            if (!$user = auth()->user()) {
                return response()->json([
                    'error' => 'Unauthorized',
                    'message' => 'Authentication required',
                    'code' => 'AUTH_REQUIRED'
                ], 401);
            }

            // Add user to request for easy access
            $request->merge(['auth_user' => $user]);

        } catch (TokenExpiredException $e) {
            return response()->json([
                'error' => 'Token expired',
                'message' => 'Your session has expired. Please refresh your token.',
                'code' => 'TOKEN_EXPIRED'
            ], 401);
        } catch (TokenInvalidException $e) {
            return response()->json([
                'error' => 'Invalid token',
                'message' => 'The provided token is invalid.',
                'code' => 'TOKEN_INVALID'
            ], 401);
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Authentication error',
                'message' => 'Unable to authenticate request.',
                'code' => 'AUTH_ERROR'
            ], 401);
        }

        return $next($request);
    }
}
