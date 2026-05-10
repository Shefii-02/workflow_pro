<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Leave;
use App\Repositories\LeaveRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class LeaveService
{
    public function __construct(
        protected LeaveRepository $repository
    ) {}

    /*
    |--------------------------------------------------------------------------
    | APPLY LEAVE
    |--------------------------------------------------------------------------
    */

    public function apply(
        array $data
    )
    {

        return DB::transaction(function () use (
            $data
        ) {

            /*
            |--------------------------------------------------------------------------
            | ATTACHMENT
            |--------------------------------------------------------------------------
            */

            if (
                isset($data['attachment'])
            ) {

                $data['attachment']
                    = $data['attachment']
                    ->store(
                        'leave/attachments',
                        'public'
                    );
            }

            /*
            |--------------------------------------------------------------------------
            | TOTAL DAYS
            |--------------------------------------------------------------------------
            */

            $days = Carbon::parse(
                $data['start_date']
            )->diffInDays(
                Carbon::parse(
                    $data['end_date']
                )
            ) + 1;

            if (
                $data['is_half_day']
                ?? false
            ) {

                $days = 0.5;
            }

            return $this->repository
                ->create([

                    'company_id'
                        => auth()->user()->company_id,

                    'user_id'
                        => auth()->id(),

                    'leave_type_id'
                        => $data['leave_type_id'],

                    'start_date'
                        => $data['start_date'],

                    'end_date'
                        => $data['end_date'],

                    'total_days'
                        => $days,

                    'is_half_day'
                        => $data['is_half_day']
                        ?? false,

                    'half_day_type'
                        => $data['half_day_type']
                        ?? null,

                    'reason'
                        => $data['reason']
                        ?? null,

                    'attachment'
                        => $data['attachment']
                        ?? null,

                    'status'
                        => 'pending',
                ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | APPROVE
    |--------------------------------------------------------------------------
    */

    public function approve(
        Leave $leave
    )
    {

        return $this->repository
            ->update(
                $leave,
                [

                    'status'
                        => 'approved',

                    'approved_by'
                        => auth()->id(),

                    'approved_at'
                        => now(),
                ]
            );
    }

    /*
    |--------------------------------------------------------------------------
    | REJECT
    |--------------------------------------------------------------------------
    */

    public function reject(
        Leave $leave,
        array $data
    )
    {

        return $this->repository
            ->update(
                $leave,
                [

                    'status'
                        => 'rejected',

                    'rejection_reason'
                        => $data['rejection_reason']
                        ?? null,
                ]
            );
    }

    /*
    |--------------------------------------------------------------------------
    | CANCEL
    |--------------------------------------------------------------------------
    */

    public function cancel(
        Leave $leave
    )
    {

        return $this->repository
            ->update(
                $leave,
                [

                    'status'
                        => 'cancelled',
                ]
            );
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function delete(
        Leave $leave
    )
    {

        if (
            $leave->attachment
        ) {

            Storage::disk('public')
                ->delete(
                    $leave->attachment
                );
        }

        return $this->repository
            ->delete($leave);
    }
}
