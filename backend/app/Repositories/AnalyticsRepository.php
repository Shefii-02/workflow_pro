<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Invoice;
use App\Models\Expense;
use App\Models\Project;
use App\Models\Payroll;
use App\Models\ProjectTask;
use App\Models\Attendance;
use App\Models\SupportTicket;
use App\Models\Leave;

class AnalyticsRepository
{
    /*
    |--------------------------------------------------------------------------
    | PROJECTS
    |--------------------------------------------------------------------------
    */

    public function totalProjects()
    {
        return Project::count();
    }

    public function completedProjects()
    {
        return Project::where(
            'status',
            'completed'
        )->count();
    }

    /*
    |--------------------------------------------------------------------------
    | TASKS
    |--------------------------------------------------------------------------
    */

    public function totalTasks()
    {
        return ProjectTask::count();
    }

    public function completedTasks()
    {
        return ProjectTask::where(
            'status',
            'completed'
        )->count();
    }

    public function pendingTasks()
    {
        return ProjectTask::where(
            'status',
            'pending'
        )->count();
    }

    /*
    |--------------------------------------------------------------------------
    | STAFF
    |--------------------------------------------------------------------------
    */

    public function totalStaff()
    {
        return User::count();
    }

    /*
    |--------------------------------------------------------------------------
    | ATTENDANCE
    |--------------------------------------------------------------------------
    */

    public function todayAttendance()
    {
        return Attendance::whereDate(
            'attendance_date',
            now()
        )->count();
    }

    /*
    |--------------------------------------------------------------------------
    | LEAVES
    |--------------------------------------------------------------------------
    */

    public function pendingLeaves()
    {
        return Leave::where(
            'status',
            'pending'
        )->count();
    }

    /*
    |--------------------------------------------------------------------------
    | PAYROLL
    |--------------------------------------------------------------------------
    */

    public function monthlyPayroll()
    {
        return Payroll::sum(
            'net_salary'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | REVENUE
    |--------------------------------------------------------------------------
    */

    public function totalRevenue()
    {
        return Invoice::where(
            'status',
            'paid'
        )->sum(
            'grand_total'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | EXPENSE
    |--------------------------------------------------------------------------
    */

    public function totalExpense()
    {
        return Expense::sum(
            'amount'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | PROFIT
    |--------------------------------------------------------------------------
    */

    public function profitability()
    {
        return
            $this->totalRevenue()
            -
            $this->totalExpense();
    }

    /*
    |--------------------------------------------------------------------------
    | SUPPORT TICKETS
    |--------------------------------------------------------------------------
    */

    public function openTickets()
    {
        return SupportTicket::where(
            'status',
            'open'
        )->count();
    }
}
