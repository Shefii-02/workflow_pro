<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Invoice;
use App\Models\Expense;
use App\Models\ProjectTask;
use App\Models\Attendance;
use App\Repositories\AnalyticsRepository;

class AnalyticsService
{
    public function __construct(
        protected AnalyticsRepository $repository
    ) {}

    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */

    public function dashboard()
    {

        return [

            /*
            |--------------------------------------------------------------------------
            | PROJECTS
            |--------------------------------------------------------------------------
            */

            'projects' => [

                'total'
                    => $this->repository
                        ->totalProjects(),

                'completed'
                    => $this->repository
                        ->completedProjects(),
            ],

            /*
            |--------------------------------------------------------------------------
            | TASKS
            |--------------------------------------------------------------------------
            */

            'tasks' => [

                'total'
                    => $this->repository
                        ->totalTasks(),

                'completed'
                    => $this->repository
                        ->completedTasks(),

                'pending'
                    => $this->repository
                        ->pendingTasks(),
            ],

            /*
            |--------------------------------------------------------------------------
            | STAFF
            |--------------------------------------------------------------------------
            */

            'staff' => [

                'total'
                    => $this->repository
                        ->totalStaff(),
            ],

            /*
            |--------------------------------------------------------------------------
            | ATTENDANCE
            |--------------------------------------------------------------------------
            */

            'attendance' => [

                'today'
                    => $this->repository
                        ->todayAttendance(),
            ],

            /*
            |--------------------------------------------------------------------------
            | LEAVES
            |--------------------------------------------------------------------------
            */

            'leaves' => [

                'pending'
                    => $this->repository
                        ->pendingLeaves(),
            ],

            /*
            |--------------------------------------------------------------------------
            | FINANCE
            |--------------------------------------------------------------------------
            */

            'finance' => [

                'revenue'
                    => $this->repository
                        ->totalRevenue(),

                'expense'
                    => $this->repository
                        ->totalExpense(),

                'profit'
                    => $this->repository
                        ->profitability(),

                'monthly_payroll'
                    => $this->repository
                        ->monthlyPayroll(),
            ],

            /*
            |--------------------------------------------------------------------------
            | TICKETS
            |--------------------------------------------------------------------------
            */

            'tickets' => [

                'open'
                    => $this->repository
                        ->openTickets(),
            ],

            /*
            |--------------------------------------------------------------------------
            | CHARTS
            |--------------------------------------------------------------------------
            */

            'charts' => [

                /*
                |--------------------------------------------------------------------------
                | TASK STATUS
                |--------------------------------------------------------------------------
                */

                'task_status_chart'
                    => $this->taskStatusChart(),

                /*
                |--------------------------------------------------------------------------
                | MONTHLY REVENUE
                |--------------------------------------------------------------------------
                */

                'monthly_revenue_chart'
                    => $this->monthlyRevenueChart(),

                /*
                |--------------------------------------------------------------------------
                | MONTHLY EXPENSE
                |--------------------------------------------------------------------------
                */

                'monthly_expense_chart'
                    => $this->monthlyExpenseChart(),

                /*
                |--------------------------------------------------------------------------
                | ATTENDANCE
                |--------------------------------------------------------------------------
                */

                'attendance_chart'
                    => $this->attendanceChart(),
            ],
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | TASK CHART
    |--------------------------------------------------------------------------
    */

    public function taskStatusChart()
    {

        return [

            'pending'
                => ProjectTask::where(
                    'status',
                    'pending'
                )->count(),

            'in_progress'
                => ProjectTask::where(
                    'status',
                    'in_progress'
                )->count(),

            'completed'
                => ProjectTask::where(
                    'status',
                    'completed'
                )->count(),
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | MONTHLY REVENUE CHART
    |--------------------------------------------------------------------------
    */

    public function monthlyRevenueChart()
    {

        return collect(range(1, 12))
            ->map(function ($month) {

                return [

                    'month'
                        => Carbon::create()
                            ->month($month)
                            ->format('M'),

                    'amount'
                        => Invoice::whereMonth(
                            'created_at',
                            $month
                        )
                        ->where(
                            'status',
                            'paid'
                        )
                        ->sum(
                            'grand_total'
                        ),
                ];
            });
    }

    /*
    |--------------------------------------------------------------------------
    | MONTHLY EXPENSE
    |--------------------------------------------------------------------------
    */

    public function monthlyExpenseChart()
    {

        return collect(range(1, 12))
            ->map(function ($month) {

                return [

                    'month'
                        => Carbon::create()
                            ->month($month)
                            ->format('M'),

                    'amount'
                        => Expense::whereMonth(
                            'created_at',
                            $month
                        )
                        ->sum(
                            'amount'
                        ),
                ];
            });
    }

    /*
    |--------------------------------------------------------------------------
    | ATTENDANCE CHART
    |--------------------------------------------------------------------------
    */

    public function attendanceChart()
    {

        return collect(range(1, 30))
            ->map(function ($day) {

                return [

                    'day'
                        => $day,

                    'count'
                        => Attendance::whereDay(
                            'attendance_date',
                            $day
                        )->count(),
                ];
            });
    }
}
