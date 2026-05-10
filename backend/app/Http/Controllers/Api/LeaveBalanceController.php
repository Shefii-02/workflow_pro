<?php

namespace App\Http\Controllers\Api;

use App\Models\LeaveBalance;
use App\Http\Controllers\Controller;

class LeaveBalanceController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | MY BALANCES
    |--------------------------------------------------------------------------
    */

    public function myBalances()
    {

        $balances = LeaveBalance::with([
            'leaveType',
        ])
            ->where(
                'user_id',
                auth()->id()
            )
            ->latest()
            ->get();

        return response()->json([

            'success' => true,

            'data'
                => $balances,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | USER BALANCES
    |--------------------------------------------------------------------------
    */

    public function userBalances(
        string $userId
    )
    {

        $balances = LeaveBalance::with([
            'leaveType',
        ])
            ->where(
                'user_id',
                $userId
            )
            ->latest()
            ->get();

        return response()->json([

            'success' => true,

            'data'
                => $balances,
        ]);
    }
}
