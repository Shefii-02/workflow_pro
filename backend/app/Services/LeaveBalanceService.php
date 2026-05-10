<?php

namespace App\Services;

use App\Models\LeaveType;
use App\Models\LeaveBalance;
use App\Repositories\LeaveBalanceRepository;

class LeaveBalanceService
{
    public function __construct(
        protected LeaveBalanceRepository $repository
    ) {}

    /*
    |--------------------------------------------------------------------------
    | CREATE INITIAL BALANCE
    |--------------------------------------------------------------------------
    */

    public function createInitialBalance(
        string $companyId,
        string $userId,
        LeaveType $leaveType
    )
    {

        return $this->repository
            ->firstOrCreate(

                [

                    'company_id'
                        => $companyId,

                    'user_id'
                        => $userId,

                    'leave_type_id'
                        => $leaveType->id,

                    'year'
                        => now()->year,
                ],

                [

                    'allocated_days'
                        => $leaveType->days_per_year,

                    'remaining_days'
                        => $leaveType->days_per_year,
                ]
            );
    }

    /*
    |--------------------------------------------------------------------------
    | DEDUCT LEAVE
    |--------------------------------------------------------------------------
    */

    public function deductLeave(
        LeaveBalance $balance,
        float $days
    )
    {

        $used =
            $balance->used_days
            + $days;

        $remaining =
            $balance->remaining_days
            - $days;

        return $this->repository
            ->update(
                $balance,
                [

                    'used_days'
                        => $used,

                    'remaining_days'
                        => $remaining,
                ]
            );
    }

    /*
    |--------------------------------------------------------------------------
    | CREDIT LEAVE
    |--------------------------------------------------------------------------
    */

    public function creditLeave(
        LeaveBalance $balance,
        float $days
    )
    {

        return $this->repository
            ->update(
                $balance,
                [

                    'remaining_days'
                        => $balance->remaining_days
                        + $days,
                ]
            );
    }
}
