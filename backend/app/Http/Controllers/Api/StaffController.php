<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\AssignRoleRequest;
use App\Http\Requests\Staff\ChangeStaffStatusRequest;
use App\Http\Requests\Staff\StoreStaffRequest;
use App\Http\Requests\Staff\UpdateStaffRequest;
use App\Models\CompanyUser;
use App\Services\StaffService;

class StaffController extends Controller
{
    public function __construct(
        protected StaffService $service
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
            => $this->service
                ->list(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STORE
    |--------------------------------------------------------------------------
    */

    public function store(
        StoreStaffRequest $request
    ) {

        $staff = $this->service
            ->create(
                $request->validated()
            );

        return response()->json([

            'success' => true,

            'message'
            => 'Staff created successfully',

            'data'
            => $staff,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show(
        CompanyUser $staff
    ) {

        return response()->json([

            'success' => true,

            'data'
            => $staff->load([
                'user',
            ]),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        UpdateStaffRequest $request,
        CompanyUser $staff
    ) {

        $staff = $this->service
            ->update(
                $staff,
                $request->validated()
            );

        return response()->json([

            'success' => true,

            'message'
            => 'Staff updated successfully',

            'data'
            => $staff,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        CompanyUser $staff
    ) {

        $this->service
            ->delete($staff);

        return response()->json([

            'success' => true,

            'message'
            => 'Staff deleted successfully',
        ]);
    }

    /*
|--------------------------------------------------------------------------
| ASSIGN ROLE
|--------------------------------------------------------------------------
*/

    public function assignRole(
        AssignRoleRequest $request,
        CompanyUser $staff
    ) {

        $staff->update([

            'role_id'
            => $request->role_id,
        ]);

        return response()->json([

            'success' => true,

            'message'
            => 'Role assigned successfully',

            'data'
            => $staff->fresh(),
        ]);
    }

    /*
|--------------------------------------------------------------------------
| CHANGE STATUS
|--------------------------------------------------------------------------
*/

    public function changeStatus(
        ChangeStaffStatusRequest $request,
        CompanyUser $staff
    ) {

        $staff->update([

            'status'
            => $request->status,
        ]);

        return response()->json([

            'success' => true,

            'message'
            => 'Staff status updated successfully',

            'data'
            => $staff->fresh(),
        ]);
    }

    /*
|--------------------------------------------------------------------------
| DEPARTMENT STAFF
|--------------------------------------------------------------------------
*/

    public function departmentStaff(
        string $departmentId
    ) {

        $staff = CompanyUser::with([
            'user',
        ])
            ->where(
                'department_id',
                $departmentId
            )
            ->paginate(20);

        return response()->json([

            'success' => true,

            'data'
            => $staff,
        ]);
    }

    /*
|--------------------------------------------------------------------------
| STAFF ATTENDANCE
|--------------------------------------------------------------------------
*/

    public function attendance(
        CompanyUser $staff
    ) {

        return response()->json([

            'success' => true,

            'data'
            => $staff
                ->user
                ->attendance()
                ->latest()
                ->paginate(30),
        ]);
    }

    /*
|--------------------------------------------------------------------------
| STAFF TASKS
|--------------------------------------------------------------------------
*/

    public function tasks(
        CompanyUser $staff
    ) {

        return response()->json([

            'success' => true,

            'data'
            => $staff
                ->user
                ->assignedTasks()
                ->latest()
                ->paginate(30),
        ]);
    }

    /*
|--------------------------------------------------------------------------
| STAFF PROJECTS
|--------------------------------------------------------------------------
*/

    public function projects(
        CompanyUser $staff
    ) {

        return response()->json([

            'success' => true,

            'data'
            => $staff
                ->user
                ->projects()
                ->latest()
                ->paginate(30),
        ]);
    }

    /*
|--------------------------------------------------------------------------
| PERFORMANCE
|--------------------------------------------------------------------------
*/

    public function performance(
        CompanyUser $staff
    ) {

        $completedTasks
            = $staff
            ->user
            ->assignedTasks()
            ->where(
                'status',
                'completed'
            )
            ->count();

        $pendingTasks
            = $staff
            ->user
            ->assignedTasks()
            ->where(
                'status',
                'pending'
            )
            ->count();

        $totalTasks
            = $staff
            ->user
            ->assignedTasks()
            ->count();

        return response()->json([

            'success' => true,

            'data' => [

                'total_tasks'
                => $totalTasks,

                'completed_tasks'
                => $completedTasks,

                'pending_tasks'
                => $pendingTasks,

                'completion_rate'
                => $totalTasks > 0
                    ? round(
                        (
                            $completedTasks
                            / $totalTasks
                        ) * 100,
                        2
                    )
                    : 0,
            ],
        ]);
    }
}
