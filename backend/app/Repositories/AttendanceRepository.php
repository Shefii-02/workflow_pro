<?php

namespace App\Repositories;

use App\Models\Attendance;
use App\Models\AttendanceBreak;

class AttendanceRepository
{
    /*
    |--------------------------------------------------------------------------
    | CREATE ATTENDANCE
    |--------------------------------------------------------------------------
    */

    public function createAttendance(
        array $data
    )
    {
        return Attendance::create(
            $data
        );
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE ATTENDANCE
    |--------------------------------------------------------------------------
    */

    public function updateAttendance(
        Attendance $attendance,
        array $data
    )
    {
        $attendance->update($data);

        return $attendance->fresh();
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE BREAK
    |--------------------------------------------------------------------------
    */

    public function createBreak(
        array $data
    )
    {
        return AttendanceBreak::create(
            $data
        );
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE BREAK
    |--------------------------------------------------------------------------
    */

    public function updateBreak(
        AttendanceBreak $break,
        array $data
    )
    {
        $break->update($data);

        return $break->fresh();
    }
}
