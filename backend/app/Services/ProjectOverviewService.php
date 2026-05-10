<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\Expense;
use App\Models\Invoice;
use App\Models\Meeting;
use App\Models\Project;
use App\Models\ProjectAttachment;
use App\Models\ProjectEstimate;
use App\Models\ProjectMember;
use App\Models\ProjectNote;
use App\Models\ProjectTask;
use App\Models\TaskTimeLog;

class ProjectOverviewService
{
    public function overview(
        Project $project
    ) {

        /*
        |--------------------------------------------------------------------------
        | TASKS
        |--------------------------------------------------------------------------
        */

        $totalTasks = ProjectTask::where(
            'project_id',
            $project->id
        )->count();

        $completedTasks = ProjectTask::where(
            'project_id',
            $project->id
        )
        ->where(
            'status',
            'completed'
        )
        ->count();

        $pendingTasks = ProjectTask::where(
            'project_id',
            $project->id
        )
        ->where(
            'status',
            'pending'
        )
        ->count();

        $inProgressTasks = ProjectTask::where(
            'project_id',
            $project->id
        )
        ->where(
            'status',
            'in_progress'
        )
        ->count();

        /*
        |--------------------------------------------------------------------------
        | MEMBERS
        |--------------------------------------------------------------------------
        */

        $membersCount = ProjectMember::where(
            'project_id',
            $project->id
        )->count();

        /*
        |--------------------------------------------------------------------------
        | MEETINGS
        |--------------------------------------------------------------------------
        */

        $meetingsCount = Meeting::where(
            'project_id',
            $project->id
        )->count();

        /*
        |--------------------------------------------------------------------------
        | EXPENSES
        |--------------------------------------------------------------------------
        */

        $totalExpenses = Expense::where(
            'project_id',
            $project->id
        )->sum('amount');

        /*
        |--------------------------------------------------------------------------
        | INVOICES
        |--------------------------------------------------------------------------
        */

        $totalInvoices = Invoice::where(
            'project_id',
            $project->id
        )->sum('total_amount');

        $paidInvoices = Invoice::where(
            'project_id',
            $project->id
        )
        ->where(
            'status',
            'paid'
        )
        ->sum('total_amount');

        /*
        |--------------------------------------------------------------------------
        | ESTIMATES
        |--------------------------------------------------------------------------
        */

        $estimateTotal = ProjectEstimate::where(
            'project_id',
            $project->id
        )->sum('total_amount');

        /*
        |--------------------------------------------------------------------------
        | TIME TRACKING
        |--------------------------------------------------------------------------
        */

        $trackedMinutes = TaskTimeLog::whereHas(
            'task',
            fn ($q) =>
                $q->where(
                    'project_id',
                    $project->id
                )
        )->sum('worked_seconds');

        /*
        |--------------------------------------------------------------------------
        | RECENT TASKS
        |--------------------------------------------------------------------------
        */

        $recentTasks = ProjectTask::with([
            'assignee',
        ])
        ->where(
            'project_id',
            $project->id
        )
        ->latest()
        ->take(10)
        ->get();

        /*
        |--------------------------------------------------------------------------
        | UPCOMING TASKS
        |--------------------------------------------------------------------------
        */

        $upcomingTasks = ProjectTask::where(
            'project_id',
            $project->id
        )
        ->whereDate(
            'due_date',
            '>=',
            now()
        )
        ->orderBy('due_date')
        ->take(10)
        ->get();

        /*
        |--------------------------------------------------------------------------
        | ACTIVITIES
        |--------------------------------------------------------------------------
        */

        $activities = ActivityLog::with([
            'user',
        ])
        ->where(
            'module',
            'project'
        )
        ->where('reference_id',$project->id)
        ->latest()
        ->take(20)
        ->get();

        /*
        |--------------------------------------------------------------------------
        | ATTACHMENTS
        |--------------------------------------------------------------------------
        */

        $attachments = ProjectAttachment::where(
            'project_id',
            $project->id
        )
        ->latest()
        ->take(20)
        ->get();

        /*
        |--------------------------------------------------------------------------
        | MEETINGS
        |--------------------------------------------------------------------------
        */

        $meetings = Meeting::where(
            'project_id',
            $project->id
        )
        ->latest()
        ->take(10)
        ->get();

        /*
        |--------------------------------------------------------------------------
        | NOTES
        |--------------------------------------------------------------------------
        */

        $notes = ProjectNote::where(
            'project_id',
            $project->id
        )
        ->latest()
        ->take(10)
        ->get();

        /*
        |--------------------------------------------------------------------------
        | CHARTS
        |--------------------------------------------------------------------------
        */

        $taskStatusChart = [

            [
                'status' => 'completed',
                'count' => $completedTasks,
            ],

            [
                'status' => 'pending',
                'count' => $pendingTasks,
            ],

            [
                'status' => 'in_progress',
                'count' => $inProgressTasks,
            ],
        ];

        $expenseChart = Expense::selectRaw('
            DATE(expense_date) as date,
            SUM(amount) as total
        ')
        ->where(
            'project_id',
            $project->id
        )
        ->groupBy('date')
        ->get();

        /*
        |--------------------------------------------------------------------------
        | PERFORMANCE
        |--------------------------------------------------------------------------
        */

        $completionPercentage
            = $totalTasks > 0
            ? round(
                (
                    $completedTasks
                    / $totalTasks
                ) * 100,
                2
            )
            : 0;

        /*
        |--------------------------------------------------------------------------
        | PROJECT HEALTH
        |--------------------------------------------------------------------------
        */

        $healthStatus = 'on_track';

        if (
            $pendingTasks > $completedTasks
        ) {

            $healthStatus = 'at_risk';
        }

        /*
        |--------------------------------------------------------------------------
        | RETURN
        |--------------------------------------------------------------------------
        */

        return [

            'project'
                => $project,

            'analytics' => [

                'tasks_total'
                    => $totalTasks,

                'tasks_completed'
                    => $completedTasks,

                'tasks_pending'
                    => $pendingTasks,

                'tasks_in_progress'
                    => $inProgressTasks,

                'members_total'
                    => $membersCount,

                'meetings_total'
                    => $meetingsCount,

                'expenses_total'
                    => $totalExpenses,

                'invoice_total'
                    => $totalInvoices,

                'paid_invoice_total'
                    => $paidInvoices,

                'estimate_total'
                    => $estimateTotal,

                'tracked_minutes'
                    => $trackedMinutes,

                'profit'
                    => $paidInvoices
                    - $totalExpenses,

                'completion_percentage'
                    => $completionPercentage,
            ],

            'charts' => [

                'task_status_chart'
                    => $taskStatusChart,

                'expense_chart'
                    => $expenseChart,
            ],

            'members'
                => $project->members,

            'recent_tasks'
                => $recentTasks,

            'upcoming_tasks'
                => $upcomingTasks,

            'activities'
                => $activities,

            'attachments'
                => $attachments,

            'meetings'
                => $meetings,

            'notes'
                => $notes,

            'health' => [

                'status'
                    => $healthStatus,
            ],
        ];
    }
}
