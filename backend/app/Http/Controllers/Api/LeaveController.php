<?php

namespace App\Http\Controllers\Api;

use App\Models\Leave;
use Illuminate\Http\Request;
use App\Services\LeaveService;
use App\Http\Controllers\Controller;

class LeaveController extends Controller
{
    public function __construct(
        protected LeaveService $service
    ) {}

    /*
    |--------------------------------------------------------------------------
    | MY LEAVES
    |--------------------------------------------------------------------------
    */

    public function myLeaves()
    {

        $leaves = Leave::with([
            'leaveType',
        ])
            ->where(
                'user_id',
                auth()->id()
            )
            ->latest()
            ->paginate(20);

        return response()->json([

            'success' => true,

            'data'
                => $leaves,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | COMPANY LEAVES
    |--------------------------------------------------------------------------
    */

    public function companyLeaves()
    {

        $leaves = Leave::with([
            'leaveType',
            'user',
        ])
            ->latest()
            ->paginate(20);

        return response()->json([

            'success' => true,

            'data'
                => $leaves,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | APPLY
    |--------------------------------------------------------------------------
    */

    public function apply(
        Request $request
    )
    {

        $leave = $this->service
            ->apply(
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Leave applied successfully',

            'data'
                => $leave,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show(
        Leave $leave
    )
    {

        return response()->json([

            'success' => true,

            'data'
                => $leave->load([
                    'leaveType',
                    'user',
                    'approver',
                ]),
        ]);
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
        $leave = $this->service
            ->approve($leave);

        return response()->json([

            'success' => true,

            'message'
                => 'Leave approved successfully',

            'data'
                => $leave,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | REJECT
    |--------------------------------------------------------------------------
    */

    public function reject(
        Request $request,
        Leave $leave
    )
    {

        $leave = $this->service
            ->reject(
                $leave,
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Leave rejected successfully',

            'data'
                => $leave,
        ]);
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

        $leave = $this->service
            ->cancel($leave);

        return response()->json([

            'success' => true,

            'message'
                => 'Leave cancelled successfully',

            'data'
                => $leave,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Leave $leave
    )
    {

        $this->service
            ->delete($leave);

        return response()->json([

            'success' => true,

            'message'
                => 'Leave deleted successfully',
        ]);
    }
}
