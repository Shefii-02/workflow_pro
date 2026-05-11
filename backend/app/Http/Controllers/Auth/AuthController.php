<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\RefreshToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $user = User::create([
            'id' => Str::uuid(),
            'name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Registered']);
    }

    public function login(Request $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = auth()->user();

        // Revoke existing refresh tokens for this user
        RefreshToken::where('user_id', $user->id)
            ->where('revoked', false)
            ->update(['revoked' => true]);

        $refreshToken = Str::random(64);
        $accessTokenExpiry = now()->addMinutes(config('jwt.ttl', 60)); // Default 60 minutes

        RefreshToken::create([
            'user_id' => $user->id,
            'token_hash' => Hash::make($refreshToken),
            'expires_at' => now()->addDays(7), // Refresh token expires in 7 days
            'access_token_expires_at' => $accessTokenExpiry,
        ]);

        return response()->json([
            'access_token' => $token,
            'refresh_token' => $refreshToken,
            'token_type' => 'Bearer',
            'expires_in' => config('jwt.ttl', 60) * 60, // Convert to seconds
            'refresh_expires_in' => 7 * 24 * 60 * 60, // 7 days in seconds
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'account_type' => $user->account_type ?? 'company', // Default account type
            ]
        ]);
    }

    public function refresh(Request $request)
    {
        $request->validate([
            'refresh_token' => 'required|string'
        ]);

        // Find the refresh token
        $refreshToken = RefreshToken::where('revoked', false)
            ->where('expires_at', '>', now())
            ->get()
            ->first(function ($token) use ($request) {
                return Hash::check($request->refresh_token, $token->token_hash);
            });

        if (!$refreshToken) {
            return response()->json(['error' => 'Invalid or expired refresh token'], 401);
        }

        $user = $refreshToken->user;

        // Generate new access token
        $newAccessToken = auth()->login($user);
        $accessTokenExpiry = now()->addMinutes(config('jwt.ttl', 60));

        // Revoke the used refresh token and create a new one (rotation)
        $refreshToken->update(['revoked' => true]);

        $newRefreshToken = Str::random(64);
        RefreshToken::create([
            'user_id' => $user->id,
            'token_hash' => Hash::make($newRefreshToken),
            'expires_at' => now()->addDays(7),
            'access_token_expires_at' => $accessTokenExpiry,
        ]);

        return response()->json([
            'access_token' => $newAccessToken,
            'refresh_token' => $newRefreshToken,
            'token_type' => 'Bearer',
            'expires_in' => config('jwt.ttl', 60) * 60,
            'refresh_expires_in' => 7 * 24 * 60 * 60,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'account_type' => $user->account_type ?? 'company',
            ]
        ]);
    }

    public function me(Request $request)
    {
        $user = auth()->user();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'account_type' => $user->account_type ?? 'company',
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]
        ]);
    }
}
