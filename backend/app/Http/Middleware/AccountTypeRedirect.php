<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AccountTypeRedirect
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Authentication required',
                'code' => 'AUTH_REQUIRED'
            ], 401);
        }

        $accountType = $user->account_type ?? 'company';

        // Define allowed routes for each account type
        $allowedRoutes = [
            'super_platform' => [
                '/api/sp/*',
                '/api/admin/*',
                '/api/auth/*',
            ],
            'company' => [
                '/api/company/*',
                '/api/auth/*',
            ],
            'freelancer' => [
                '/api/freelancer/*',
                '/api/auth/*',
            ],
            'client' => [
                '/api/client/*',
                '/api/auth/*',
            ],
        ];

        $currentPath = $request->getPathInfo();
        $isAllowed = false;

        if (isset($allowedRoutes[$accountType])) {
            foreach ($allowedRoutes[$accountType] as $pattern) {
                if (fnmatch($pattern, $currentPath)) {
                    $isAllowed = true;
                    break;
                }
            }
        }

        if (!$isAllowed) {
            return response()->json([
                'error' => 'Access denied',
                'message' => "Account type '{$accountType}' does not have access to this resource",
                'code' => 'ACCESS_DENIED',
                'account_type' => $accountType
            ], 403);
        }

        return $next($request);
    }
}
