<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\AttendanceBreak;
use App\Repositories\AttendanceRepository;
use Illuminate\Support\Facades\DB;

class AttendanceService
{
    public function __construct(
        protected AttendanceRepository $repository
    ) {}

    /*
    |--------------------------------------------------------------------------
    | CLOCK IN
    |--------------------------------------------------------------------------
    */

    public function clockIn(
        array $data
    )
    {

        return DB::transaction(function () use (
            $data
        ) {

            /*
            |--------------------------------------------------------------------------
            | SELFIE
            |--------------------------------------------------------------------------
            */

            if (
                isset($data['selfie'])
            ) {

                $data['clock_in_selfie']
                    = $data['selfie']
                    ->store(
                        'attendance/selfies',
                        'public'
                    );
            }

            return $this->repository
                ->createAttendance([

                    'company_id'
                        => auth()->user()->company_id,

                    'user_id'
                        => auth()->id(),

                    'attendance_date'
                        => now()->toDateString(),

                    'clock_in_at'
                        => now(),

                    'clock_in_latitude'
                        => $data['latitude'],

                    'clock_in_longitude'
                        => $data['longitude'],

                    'clock_in_selfie'
                        => $data['clock_in_selfie']
                        ?? null,

                    'biometric_verified'
                        => $data['biometric_verified']
                        ?? false,

                    'device_id'
                        => $data['device_id']
                        ?? null,

                    'outside_reason'
                        => $data['outside_reason']
                        ?? null,

                    'ip_address'
                        => request()->ip(),
                ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | BREAK START
    |--------------------------------------------------------------------------
    */

    public function breakStart(
        Attendance $attendance,
        array $data
    )
    {

        return $this->repository
            ->createBreak([

                'attendance_id'
                    => $attendance->id,

                'break_start_at'
                    => now(),

                'break_type'
                    => $data['break_type']
                    ?? 'short',

                'break_label'
                    => $data['break_label']
                    ?? null,
            ]);
    }

    /*
    |--------------------------------------------------------------------------
    | BREAK END
    |--------------------------------------------------------------------------
    */

    public function breakEnd(
        AttendanceBreak $break,
        array $data
    )
    {

        return DB::transaction(function () use (
            $break,
            $data
        ) {

            /*
            |--------------------------------------------------------------------------
            | SELFIE
            |--------------------------------------------------------------------------
            */

            if (
                isset($data['selfie'])
            ) {

                $data['break_end_selfie']
                    = $data['selfie']
                    ->store(
                        'attendance/break-selfies',
                        'public'
                    );
            }

            $end = now();

            $minutes = $break
                ->break_start_at
                ->diffInMinutes($end);

            $break = $this->repository
                ->updateBreak($break, [

                    'break_end_at'
                        => $end,

                    'break_end_latitude'
                        => $data['latitude'],

                    'break_end_longitude'
                        => $data['longitude'],

                    'break_end_selfie'
                        => $data['break_end_selfie']
                        ?? null,

                    'break_end_biometric_verified'
                        => $data['biometric_verified']
                        ?? false,

                    'duration_minutes'
                        => $minutes,
                ]);

            /*
            |--------------------------------------------------------------------------
            | UPDATE ATTENDANCE BREAK TIME
            |--------------------------------------------------------------------------
            */

            $attendance = $break->attendance;

            $attendance->increment(
                'total_break_seconds',
                $minutes * 60
            );

            return $break;
        });
    }

    /*
    |--------------------------------------------------------------------------
    | CLOCK OUT
    |--------------------------------------------------------------------------
    */

    public function clockOut(
        Attendance $attendance,
        array $data
    )
    {

        return DB::transaction(function () use (
            $attendance,
            $data
        ) {

            /*
            |--------------------------------------------------------------------------
            | SELFIE
            |--------------------------------------------------------------------------
            */

            if (
                isset($data['selfie'])
            ) {

                $data['clock_out_selfie']
                    = $data['selfie']
                    ->store(
                        'attendance/selfies',
                        'public'
                    );
            }

            $clockOut = now();

            $workSeconds
                = $attendance
                    ->clock_in_at
                    ->diffInSeconds(
                        $clockOut
                    );

            $workSeconds -=
                $attendance
                    ->total_break_seconds;

            return $this->repository
                ->updateAttendance(
                    $attendance,
                    [

                        'clock_out_at'
                            => $clockOut,

                        'clock_out_latitude'
                            => $data['latitude'],

                        'clock_out_longitude'
                            => $data['longitude'],

                        'clock_out_selfie'
                            => $data['clock_out_selfie']
                            ?? null,

                        'total_work_seconds'
                            => $workSeconds,
                    ]
                );
        });
    }
}
