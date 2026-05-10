<?php

use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\BreakTypeController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\HolidayController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\LeaveBalanceController;
use App\Http\Controllers\Api\LeaveController;
use App\Http\Controllers\Api\LeaveTypeController;
use App\Http\Controllers\Api\MeetingController;
use App\Http\Controllers\Api\PayrollController;
use App\Http\Controllers\Api\ProjectAttachmentController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ProjectEstimateController;
use App\Http\Controllers\Api\ProjectMemberController;
use App\Http\Controllers\Api\ProjectNoteController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\ShiftController;
use App\Http\Controllers\Api\StaffController;
use App\Http\Controllers\Api\StickyNoteController;
use App\Http\Controllers\Api\SupportTicketController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TaskCommentController;
use App\Http\Controllers\Api\TaskTimeLogController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\RefreshToken;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('auth')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});


Route::prefix('v1')->middleware(['auth:api', 'company'])->group(function () {

    Route::prefix('projects')->group(function () {
        Route::get('/', [ProjectController::class, 'index']);
        Route::post('/', [ProjectController::class, 'store']);
        Route::get('{id}', [ProjectController::class, 'show']);
        Route::put('{id}', [ProjectController::class, 'update']);
        Route::delete('{id}', [ProjectController::class, 'destroy']);
        Route::get(
            '/{project}/overview',
            [ProjectController::class, 'overview']
        );
    });

    Route::prefix('projects/{projectId}/members')->group(function () {

        Route::get('/', [ProjectMemberController::class, 'index']);
        Route::post('/', [ProjectMemberController::class, 'store']);
        Route::put('{userId}', [ProjectMemberController::class, 'update']);
        Route::delete('{userId}', [ProjectMemberController::class, 'destroy']);
    });

    Route::prefix('projects/{projectId}/tasks')->group(function () {

        Route::get('/', [TaskController::class, 'index']);
    });

    Route::prefix('tasks')->group(function () {

        Route::post('/', [TaskController::class, 'store']);
        Route::get('{id}', [TaskController::class, 'show']);
        Route::put('{id}', [TaskController::class, 'update']);
        Route::delete('{id}', [TaskController::class, 'destroy']);

        Route::patch('{id}/status', [TaskController::class, 'changeStatus']);
    });

    Route::prefix('project-attachments')->group(function () {

        Route::post('/upload', [
            ProjectAttachmentController::class,
            'upload'
        ]);

        Route::get('/project/{projectId}', [
            ProjectAttachmentController::class,
            'index'
        ]);

        Route::post('/attach-task', [
            ProjectAttachmentController::class,
            'attachToTask'
        ]);

        Route::post('/detach-task', [
            ProjectAttachmentController::class,
            'detachFromTask'
        ]);

        Route::delete('/{id}', [
            ProjectAttachmentController::class,
            'destroy'
        ]);
    });
    Route::prefix('project-attachments')->group(function () {

        Route::post('/upload', [
            ProjectAttachmentController::class,
            'upload'
        ]);

        Route::get('/project/{projectId}', [
            ProjectAttachmentController::class,
            'index'
        ]);

        Route::post('/attach-task', [
            ProjectAttachmentController::class,
            'attachToTask'
        ]);

        Route::post('/detach-task', [
            ProjectAttachmentController::class,
            'detachFromTask'
        ]);

        Route::delete('/{id}', [
            ProjectAttachmentController::class,
            'destroy'
        ]);
    });

    /*
        |--------------------------------------------------------------------------
        | TASK COMMENTS
        |--------------------------------------------------------------------------
        */

    Route::get(
        '/tasks/{taskId}/comments',
        [TaskCommentController::class, 'index']
    );

    Route::post(
        '/tasks/{taskId}/comments',
        [TaskCommentController::class, 'store']
    );

    Route::put(
        '/comments/{taskId}/{commentId}',
        [TaskCommentController::class, 'update']
    );

    Route::delete(
        '/comments/{taskId}/{commentId}',
        [TaskCommentController::class, 'destroy']
    );



    Route::prefix('tasks/{taskId}')
        ->group(function () {

            Route::post(
                '/start-timer',
                [TaskTimeLogController::class, 'start']
            );

            Route::post(
                '/pause-timer',
                [TaskTimeLogController::class, 'pause']
            );

            Route::post(
                '/resume-timer',
                [TaskTimeLogController::class, 'resume']
            );

            Route::post(
                '/stop-timer',
                [TaskTimeLogController::class, 'stop']
            );

            Route::get(
                '/time-logs',
                [TaskTimeLogController::class, 'index']
            );
        });

    /*
        |--------------------------------------------------------------------------
        | MEETINGS
        |--------------------------------------------------------------------------
        */

    Route::get(
        '/meetings',
        [MeetingController::class, 'index']
    );

    Route::post(
        '/meetings',
        [MeetingController::class, 'store']
    );

    Route::get(
        '/meetings/{id}',
        [MeetingController::class, 'show']
    );

    Route::put(
        '/meetings/{id}',
        [MeetingController::class, 'update']
    );

    Route::delete(
        '/meetings/{id}',
        [MeetingController::class, 'destroy']
    );

    /*
        |--------------------------------------------------------------------------
        | PARTICIPANTS
        |--------------------------------------------------------------------------
        */

    Route::get(
        '/meetings/{meetingId}/participants',
        [MeetingController::class, 'participants']
    );

    Route::post(
        '/meetings/{meetingId}/participants',
        [MeetingController::class, 'addParticipant']
    );

    Route::delete(
        '/meetings/{meetingId}/participants/{participantId}',
        [MeetingController::class, 'removeParticipant']
    );


    /*
        |--------------------------------------------------------------------------
        | PROJECT NOTES
        |--------------------------------------------------------------------------
        */

    Route::get(
        '/projects/{projectId}/notes',
        [ProjectNoteController::class, 'index']
    );

    Route::post(
        '/projects/{projectId}/notes',
        [ProjectNoteController::class, 'store']
    );

    Route::get(
        '/notes/{id}',
        [ProjectNoteController::class, 'show']
    );

    Route::put(
        '/notes/{id}',
        [ProjectNoteController::class, 'update']
    );

    Route::delete(
        '/notes/{id}',
        [ProjectNoteController::class, 'destroy']
    );

    Route::patch(
        '/notes/{id}/pin',
        [ProjectNoteController::class, 'togglePin']
    );


    /*
        |--------------------------------------------------------------------------
        | PROJECT ESTIMATES
        |--------------------------------------------------------------------------
        */




    Route::prefix('projects/{project}/estimates')
        ->group(function () {

            Route::get(
                '/',
                [ProjectEstimateController::class, 'index']
            );

            Route::post(
                '/',
                [ProjectEstimateController::class, 'store']
            );
        });

    /*
        |--------------------------------------------------------------------------
        | SINGLE ESTIMATE
        |--------------------------------------------------------------------------
        */

    Route::prefix('estimates')
        ->group(function () {

            Route::get(
                '{estimate}',
                [ProjectEstimateController::class, 'show']
            );

            Route::put(
                '{estimate}',
                [ProjectEstimateController::class, 'update']
            );

            Route::delete(
                '{estimate}',
                [ProjectEstimateController::class, 'destroy']
            );
        });

    /*
        |--------------------------------------------------------------------------
        | INVOICES
        |--------------------------------------------------------------------------
        */

    Route::apiResource(
        'invoices',
        InvoiceController::class
    );

    /*
        |--------------------------------------------------------------------------
        | CONVERT ESTIMATE
        |--------------------------------------------------------------------------
        */

    Route::post(
        'estimates/{estimate}/convert-to-invoice',
        [InvoiceController::class, 'convertEstimate']
    );


    Route::post(
        'invoices/{invoice}/send/email',
        [InvoiceController::class, 'sendEmail']
    );

    Route::post(
        'invoices/{invoice}/send/whatsapp',
        [InvoiceController::class, 'sendWhatsapp']
    );

    Route::post(
        'invoices/{invoice}/mark-paid',
        [InvoiceController::class, 'markPaid']
    );


    Route::prefix('projects/{project}')
        ->group(function () {

            Route::get(
                '/expenses',
                [ExpenseController::class, 'index']
            );

            Route::post(
                '/expenses',
                [ExpenseController::class, 'store']
            );

            Route::get(
                '/profitability',
                [ExpenseController::class, 'profitability']
            );
        });

    Route::prefix('expenses')
        ->group(function () {

            Route::get(
                '/{expense}',
                [ExpenseController::class, 'show']
            );

            Route::put(
                '/{expense}',
                [ExpenseController::class, 'update']
            );

            Route::delete(
                '/{expense}',
                [ExpenseController::class, 'destroy']
            );

            Route::post(
                '/{expense}/approve',
                [ExpenseController::class, 'approve']
            );

            Route::post(
                '/{expense}/reject',
                [ExpenseController::class, 'reject']
            );

            Route::post(
                '/{expense}/mark-reimbursed',
                [ExpenseController::class, 'reimburse']
            );
        });

    Route::get(
        '/activity-logs',
        [ActivityLogController::class, 'index']
    );
    Route::get(
        '/activity-logs/project/{project}',
        [ActivityLogController::class, 'projectLogs']
    );

    //Staff

    Route::prefix('staff')->group(function () {

        Route::get(
            '/',
            [StaffController::class, 'index']
        );

        Route::post(
            '/',
            [StaffController::class, 'store']
        );

        Route::get(
            '/{staff}',
            [StaffController::class, 'show']
        );

        Route::put(
            '/{staff}',
            [StaffController::class, 'update']
        );

        Route::delete(
            '/{staff}',
            [StaffController::class, 'destroy']
        );


        /*
    |--------------------------------------------------------------------------
    | ROLE
    |--------------------------------------------------------------------------
    */

        Route::post(
            '/{staff}/assign-role',
            [StaffController::class, 'assignRole']
        );

        /*
    |--------------------------------------------------------------------------
    | STATUS
    |--------------------------------------------------------------------------
    */

        Route::post(
            '/{staff}/change-status',
            [StaffController::class, 'changeStatus']
        );

        /*
    |--------------------------------------------------------------------------
    | DEPARTMENT
    |--------------------------------------------------------------------------
    */

        Route::get(
            '/department/{departmentId}',
            [StaffController::class, 'departmentStaff']
        );

        /*
    |--------------------------------------------------------------------------
    | ATTENDANCE
    |--------------------------------------------------------------------------
    */

        Route::get(
            '/{staff}/attendance',
            [
                StaffController::class,
                'attendance'
            ]
        );

        /*
    |--------------------------------------------------------------------------
    | TASKS
    |--------------------------------------------------------------------------
    */

        Route::get(
            '/{staff}/tasks',
            [
                StaffController::class,
                'tasks'
            ]
        );

        /*
    |--------------------------------------------------------------------------
    | PROJECTS
    |--------------------------------------------------------------------------
    */

        Route::get(
            '/{staff}/projects',
            [
                StaffController::class,
                'projects'
            ]
        );

        /*
    |--------------------------------------------------------------------------
    | PERFORMANCE
    |--------------------------------------------------------------------------
    */

        Route::get(
            '/{staff}/performance',
            [
                StaffController::class,
                'performance'
            ]
        );
    });


    Route::prefix('clients')->group(function () {

        /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */

        Route::get(
            '/',
            [ClientController::class, 'index']
        );

        Route::post(
            '/',
            [ClientController::class, 'store']
        );

        Route::get(
            '/{client}',
            [ClientController::class, 'show']
        );

        Route::put(
            '/{client}',
            [ClientController::class, 'update']
        );

        Route::delete(
            '/{client}',
            [ClientController::class, 'destroy']
        );

        /*
    |--------------------------------------------------------------------------
    | COMPANY CLIENTS
    |--------------------------------------------------------------------------
    */

        Route::get(
            '/company/list',
            [ClientController::class, 'companyClients']
        );
    });


    Route::prefix('roles')->group(function () {

        Route::get(
            '/',
            [RoleController::class, 'index']
        );

        Route::post(
            '/',
            [RoleController::class, 'store']
        );

        Route::get(
            '/{role}',
            [RoleController::class, 'show']
        );

        Route::put(
            '/{role}',
            [RoleController::class, 'update']
        );

        Route::delete(
            '/{role}',
            [RoleController::class, 'destroy']
        );
    });


    Route::prefix('departments')->group(function () {

        Route::get(
            '/',
            [DepartmentController::class, 'index']
        );

        Route::post(
            '/',
            [DepartmentController::class, 'store']
        );

        Route::get(
            '/{department}',
            [DepartmentController::class, 'show']
        );

        Route::put(
            '/{department}',
            [DepartmentController::class, 'update']
        );

        Route::delete(
            '/{department}',
            [DepartmentController::class, 'destroy']
        );

        /*
    |--------------------------------------------------------------------------
    | STAFF
    |--------------------------------------------------------------------------
    */

        Route::get(
            '/{department}/staff',
            [DepartmentController::class, 'staff']
        );
    });


    Route::prefix('attendance')->group(function () {

        /*
    |--------------------------------------------------------------------------
    | CLOCK IN
    |--------------------------------------------------------------------------
    */

        Route::post(
            '/clock-in',
            [AttendanceController::class, 'clockIn']
        );

        /*
    |--------------------------------------------------------------------------
    | BREAK START
    |--------------------------------------------------------------------------
    */

        Route::post(
            '/break-start',
            [AttendanceController::class, 'breakStart']
        );

        /*
    |--------------------------------------------------------------------------
    | BREAK END
    |--------------------------------------------------------------------------
    */

        Route::post(
            '/break-end',
            [AttendanceController::class, 'breakEnd']
        );

        /*
    |--------------------------------------------------------------------------
    | CLOCK OUT
    |--------------------------------------------------------------------------
    */

        Route::post(
            '/clock-out',
            [AttendanceController::class, 'clockOut']
        );

        /*
    |--------------------------------------------------------------------------
    | TODAY
    |--------------------------------------------------------------------------
    */

        Route::get(
            '/today',
            [AttendanceController::class, 'today']
        );

        /*
    |--------------------------------------------------------------------------
    | HISTORY
    |--------------------------------------------------------------------------
    */

        Route::get(
            '/history',
            [AttendanceController::class, 'history']
        );
    });


    Route::prefix('break-types')
        ->group(function () {

            /*
                |--------------------------------------------------------------------------
                | LIST
                |--------------------------------------------------------------------------
                */

            Route::get(
                '/',
                [BreakTypeController::class, 'index']
            );

            /*
                |--------------------------------------------------------------------------
                | STORE
                |--------------------------------------------------------------------------
                */

            Route::post(
                '/',
                [BreakTypeController::class, 'store']
            );

            /*
                |--------------------------------------------------------------------------
                | SHOW
                |--------------------------------------------------------------------------
                */

            Route::get(
                '/{breakType}',
                [BreakTypeController::class, 'show']
            );

            /*
                |--------------------------------------------------------------------------
                | UPDATE
                |--------------------------------------------------------------------------
                */

            Route::put(
                '/{breakType}',
                [BreakTypeController::class, 'update']
            );

            /*
                |--------------------------------------------------------------------------
                | DELETE
                |--------------------------------------------------------------------------
                */

            Route::delete(
                '/{breakType}',
                [BreakTypeController::class, 'destroy']
            );
        });

    Route::prefix('holidays')
        ->group(function () {

            /*
                |--------------------------------------------------------------------------
                | LIST
                |--------------------------------------------------------------------------
                */

            Route::get(
                '/',
                [HolidayController::class, 'index']
            );

            /*
                |--------------------------------------------------------------------------
                | STORE
                |--------------------------------------------------------------------------
                */

            Route::post(
                '/',
                [HolidayController::class, 'store']
            );

            /*
                |--------------------------------------------------------------------------
                | SHOW
                |--------------------------------------------------------------------------
                */

            Route::get(
                '/{holiday}',
                [HolidayController::class, 'show']
            );

            /*
                |--------------------------------------------------------------------------
                | UPDATE
                |--------------------------------------------------------------------------
                */

            Route::put(
                '/{holiday}',
                [HolidayController::class, 'update']
            );

            /*
                |--------------------------------------------------------------------------
                | DELETE
                |--------------------------------------------------------------------------
                */

            Route::delete(
                '/{holiday}',
                [HolidayController::class, 'destroy']
            );
        });


    Route::prefix('leave-types')
        ->group(function () {

            Route::get(
                '/',
                [LeaveTypeController::class, 'index']
            );

            Route::post(
                '/',
                [LeaveTypeController::class, 'store']
            );

            Route::get(
                '/{leaveType}',
                [LeaveTypeController::class, 'show']
            );

            Route::put(
                '/{leaveType}',
                [LeaveTypeController::class, 'update']
            );

            Route::delete(
                '/{leaveType}',
                [LeaveTypeController::class, 'destroy']
            );
        });

    Route::prefix('sticky-notes')
        ->group(function () {

            Route::get(
                '/',
                [StickyNoteController::class, 'index']
            );

            Route::post(
                '/',
                [StickyNoteController::class, 'store']
            );

            Route::put(
                '/{stickyNote}',
                [StickyNoteController::class, 'update']
            );

            Route::delete(
                '/{stickyNote}',
                [StickyNoteController::class, 'destroy']
            );
        });


    Route::prefix('announcements')
        ->group(function () {

            Route::get(
                '/',
                [AnnouncementController::class, 'index']
            );

            Route::post(
                '/',
                [AnnouncementController::class, 'store']
            );

            Route::get(
                '/{announcement}',
                [AnnouncementController::class, 'show']
            );

            Route::put(
                '/{announcement}',
                [AnnouncementController::class, 'update']
            );

            Route::delete(
                '/{announcement}',
                [AnnouncementController::class, 'destroy']
            );
        });


    Route::prefix('leaves')
        ->group(function () {

            /*
        |--------------------------------------------------------------------------
        | USER
        |--------------------------------------------------------------------------
        */

            Route::get(
                '/my-leaves',
                [LeaveController::class, 'myLeaves']
            );

            Route::post(
                '/apply',
                [LeaveController::class, 'apply']
            );

            Route::get(
                '/{leave}',
                [LeaveController::class, 'show']
            );

            Route::post(
                '/{leave}/cancel',
                [LeaveController::class, 'cancel']
            );

            /*
        |--------------------------------------------------------------------------
        | ADMIN / HR
        |--------------------------------------------------------------------------
        */

            Route::get(
                '/company/list',
                [LeaveController::class, 'companyLeaves']
            );

            Route::post(
                '/{leave}/approve',
                [LeaveController::class, 'approve']
            );

            Route::post(
                '/{leave}/reject',
                [LeaveController::class, 'reject']
            );

            Route::delete(
                '/{leave}',
                [LeaveController::class, 'destroy']
            );
        });


    Route::prefix('leave-balances')
        ->group(function () {

            /*
        |--------------------------------------------------------------------------
        | USER
        |--------------------------------------------------------------------------
        */

            Route::get(
                '/my-balances',
                [LeaveBalanceController::class, 'myBalances']
            );

            /*
        |--------------------------------------------------------------------------
        | ADMIN / HR
        |--------------------------------------------------------------------------
        */

            Route::get(
                '/user/{userId}',
                [LeaveBalanceController::class, 'userBalances']
            );
        });


    Route::prefix('shifts')->group(function () {
        Route::get('/', [ShiftController::class, 'index']);
        Route::post('/', [ShiftController::class, 'store']);
        Route::get('/{shift}', [ShiftController::class, 'show']);
        Route::put('/{shift}', [ShiftController::class, 'update']);
        Route::delete('/{shift}', [ShiftController::class, 'destroy']);
        Route::post('/assign', [ShiftController::class, 'assign']);
    });

    Route::prefix('payrolls')
        ->group(function () {

            Route::get(
                '/',
                [PayrollController::class, 'index']
            );

            Route::post(
                '/generate',
                [PayrollController::class, 'generate']
            );

            Route::get(
                '/{payroll}',
                [PayrollController::class, 'show']
            );

            Route::post(
                '/{payroll}/mark-paid',
                [PayrollController::class, 'markPaid']
            );

            Route::delete(
                '/{payroll}',
                [PayrollController::class, 'destroy']
            );
        });


    Route::prefix('analytics')
        ->group(function () {

            /*
        |--------------------------------------------------------------------------
        | MAIN DASHBOARD
        |--------------------------------------------------------------------------
        */

            Route::get(
                '/dashboard',
                [AnalyticsController::class, 'dashboard']
            );
        });



    Route::prefix('support-tickets')
        ->group(function () {

            Route::get(
                '/',
                [SupportTicketController::class, 'index']
            );

            Route::post(
                '/',
                [SupportTicketController::class, 'store']
            );

            Route::get(
                '/{ticket}',
                [SupportTicketController::class, 'show']
            );

            Route::put(
                '/{ticket}',
                [SupportTicketController::class, 'update']
            );

            Route::post(
                '/{ticket}/reply',
                [SupportTicketController::class, 'reply']
            );

            Route::post(
                '/{ticket}/close',
                [SupportTicketController::class, 'close']
            );

            Route::delete(
                '/{ticket}',
                [SupportTicketController::class, 'destroy']
            );
        });
});
