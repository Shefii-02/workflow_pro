<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Project;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | GLOBAL LOGS
    |--------------------------------------------------------------------------
    */

    public function index(Request $request)
    {
        $logs = ActivityLog::with([
            'user',
        ])
        ->when(
            $request->module,
            fn ($q) =>
                $q->where(
                    'module',
                    $request->module
                )
        )
        ->when(
            $request->action,
            fn ($q) =>
                $q->where(
                    'action',
                    $request->action
                )
        )
        ->latest()
        ->paginate(50);

        return response()->json([

            'success' => true,

            'message'
                => 'Activity logs fetched successfully',

            'data'
                => $logs,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | PROJECT LOGS
    |--------------------------------------------------------------------------
    */

    public function projectLogs(
        Request $request,
        Project $project
    ) {

        $logs = ActivityLog::with([
            'user',
        ])
        ->where(
            'reference_id',
            $project->id
        )
        ->orWhere(function ($query) use (
            $project
        ) {

            $query->where(
                'module',
                'project'
            )
            ->where(
                'reference_id',
                $project->id
            );
        })
        ->latest()
        ->paginate(50);

        return response()->json([

            'success' => true,

            'message'
                => 'Project activity logs fetched successfully',

            'data'
                => $logs,
        ]);
    }
}
