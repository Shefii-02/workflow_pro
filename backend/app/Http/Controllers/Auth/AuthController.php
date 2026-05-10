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


        $refreshToken = Str::random(64);

        RefreshToken::create([
            'user_id' => $user->id,
            'token_hash' => Hash::make($refreshToken),
            'expires_at' => now()->addDays(7),
        ]);

        return response()->json([
            'access_token' => $token,
            'refresh_token' => $refreshToken,
            'expires_in' => auth()->factory()->getTTL() * 3600
        ]);
    }

    public function refresh(Request $request)
    {
        $request->validate([
            'refresh_token' => 'required'
        ]);

        $tokens = RefreshToken::where('revoked', false)->get();

        foreach ($tokens as $token) {
            if (Hash::check($request->refresh_token, $token->token_hash)) {

                if ($token->expires_at->isPast()) {
                    return response()->json(['error' => 'Token expired'], 401);
                }

                $user = $token->user;

                $newAccessToken = auth()->login($user);

                return response()->json([
                    'access_token' => $newAccessToken,
                    'expires_in' => auth()->factory()->getTTL() * 60
                ]);
            }
        }

        return response()->json(['error' => 'Invalid token'], 401);
    }

    public function logout(Request $request)
    {
        auth()->logout();

        if ($request->refresh_token) {
            RefreshToken::where('revoked', false)->get()
                ->each(function ($token) use ($request) {
                    if (Hash::check($request->refresh_token, $token->token_hash)) {
                        $token->update(['revoked' => true]);
                    }
                });
        }

        return response()->json(['message' => 'Logged out']);
    }
}
