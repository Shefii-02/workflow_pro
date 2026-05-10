<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\AttendanceBreak;
use App\Services\AttendanceService;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function __construct(
        protected AttendanceService $service
    ) {}

    /*
    |--------------------------------------------------------------------------
    | CLOCK IN
    |--------------------------------------------------------------------------
    */

    public function clockIn(
        Request $request
    )
    {

        $attendance = $this->service
            ->clockIn(
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Clock in successful',

            'data'
                => $attendance,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | BREAK START
    |--------------------------------------------------------------------------
    */

    public function breakStart(
        Request $request
    )
    {

        $attendance = Attendance::findOrFail(
            $request->attendance_id
        );

        $break = $this->service
            ->breakStart(
                $attendance,
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Break started',

            'data'
                => $break,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | BREAK END
    |--------------------------------------------------------------------------
    */

    public function breakEnd(
        Request $request
    )
    {

        $break = AttendanceBreak::findOrFail(
            $request->break_id
        );

        $break = $this->service
            ->breakEnd(
                $break,
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Break ended',

            'data'
                => $break,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | CLOCK OUT
    |--------------------------------------------------------------------------
    */

    public function clockOut(
        Request $request
    )
    {

        $attendance = Attendance::findOrFail(
            $request->attendance_id
        );

        $attendance = $this->service
            ->clockOut(
                $attendance,
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Clock out successful',

            'data'
                => $attendance,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | TODAY
    |--------------------------------------------------------------------------
    */

    public function today()
    {

        $attendance = Attendance::with([
            'breaks',
        ])
        ->where(
            'user_id',
            auth()->id()
        )
        ->whereDate(
            'attendance_date',
            now()->toDateString()
        )
        ->first();

        return response()->json([

            'success' => true,

            'data'
                => $attendance,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | HISTORY
    |--------------------------------------------------------------------------
    */

    public function history()
    {

        return response()->json([

            'success' => true,

            'data'
                => Attendance::where(
                    'user_id',
                    auth()->id()
                )
                ->latest()
                ->paginate(30),
        ]);
    }
}
