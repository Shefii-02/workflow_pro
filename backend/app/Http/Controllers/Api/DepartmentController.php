<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Department\StoreDepartmentRequest;
use App\Http\Requests\Department\UpdateDepartmentRequest;
use App\Models\Department;
use App\Services\DepartmentService;

class DepartmentController extends Controller
{
    public function __construct(
        protected DepartmentService $service
    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST
    |--------------------------------------------------------------------------
    */

    public function index()
    {

        return response()->json([

            'success' => true,

            'data'
                => Department::with([
                    'head',
                ])
                ->latest()
                ->paginate(20),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STORE
    |--------------------------------------------------------------------------
    */

    public function store(
        StoreDepartmentRequest $request
    )
    {

        $department = $this->service
            ->create(
                $request->validated()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Department created successfully',

            'data'
                => $department,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show(
        Department $department
    )
    {

        return response()->json([

            'success' => true,

            'data'
                => $department->load([
                    'head',
                    'staff.user',
                ]),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        UpdateDepartmentRequest $request,
        Department $department
    )
    {

        $department = $this->service
            ->update(
                $department,
                $request->validated()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Department updated successfully',

            'data'
                => $department,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Department $department
    )
    {

        $this->service
            ->delete($department);

        return response()->json([

            'success' => true,

            'message'
                => 'Department deleted successfully',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STAFF
    |--------------------------------------------------------------------------
    */

    public function staff(
        Department $department
    )
    {

        return response()->json([

            'success' => true,

            'data'
                => $department
                    ->staff()
                    ->with([
                        'user',
                    ])
                    ->paginate(20),
        ]);
    }
}
