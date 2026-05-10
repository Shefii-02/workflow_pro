<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LeaveType;
use App\Services\LeaveTypeService;
use Illuminate\Http\Request;

class LeaveTypeController extends Controller
{
    public function __construct(
        protected LeaveTypeService $service
    ) {}

    public function index()
    {

        return response()->json([

            'success' => true,

            'data'
                => LeaveType::latest()
                ->paginate(20),
        ]);
    }

    public function store(
        Request $request
    )
    {

        $leaveType = $this->service
            ->create(
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Leave type created successfully',

            'data'
                => $leaveType,
        ]);
    }

    public function show(
        LeaveType $leaveType
    )
    {

        return response()->json([

            'success' => true,

            'data'
                => $leaveType,
        ]);
    }

    public function update(
        Request $request,
        LeaveType $leaveType
    )
    {

        $leaveType = $this->service
            ->update(
                $leaveType,
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Leave type updated successfully',

            'data'
                => $leaveType,
        ]);
    }

    public function destroy(
        LeaveType $leaveType
    )
    {

        $this->service
            ->delete($leaveType);

        return response()->json([

            'success' => true,

            'message'
                => 'Leave type deleted successfully',
        ]);
    }
}
