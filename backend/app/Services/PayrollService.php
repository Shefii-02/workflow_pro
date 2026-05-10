<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Payroll;
use App\Models\Attendance;
use App\Models\PayrollItem;
use App\Models\LeaveApplication;
use Illuminate\Support\Facades\DB;
use App\Models\EmployeeSalaryStructure;
use App\Repositories\PayrollRepository;

class PayrollService
{
    public function __construct(
        protected PayrollRepository $repository
    ) {}

    /*
    |--------------------------------------------------------------------------
    | GENERATE PAYROLL
    |--------------------------------------------------------------------------
    */

    public function generate(
        User $user,
        string $month
    )
    {

        return DB::transaction(function () use (
            $user,
            $month
        ) {

            /*
            |--------------------------------------------------------------------------
            | SALARY STRUCTURE
            |--------------------------------------------------------------------------
            */

            $salary = EmployeeSalaryStructure::where(
                'user_id',
                $user->id
            )->firstOrFail();

            /*
            |--------------------------------------------------------------------------
            | DATE RANGE
            |--------------------------------------------------------------------------
            */

            $start = Carbon::parse(
                $month . '-01'
            )->startOfMonth();

            $end = Carbon::parse(
                $month . '-01'
            )->endOfMonth();

            /*
            |--------------------------------------------------------------------------
            | ATTENDANCE
            |--------------------------------------------------------------------------
            */

            $presentDays = Attendance::where(
                'user_id',
                $user->id
            )
            ->whereBetween(
                'attendance_date',
                [$start, $end]
            )
            ->whereNotNull(
                'clock_in_at'
            )
            ->count();

            /*
            |--------------------------------------------------------------------------
            | LEAVES
            |--------------------------------------------------------------------------
            */

            $leaveDays = LeaveApplication::where(
                'user_id',
                $user->id
            )
            ->where(
                'status',
                'approved'
            )
            ->whereBetween(
                'start_date',
                [$start, $end]
            )
            ->sum('total_days');

            /*
            |--------------------------------------------------------------------------
            | ABSENT
            |--------------------------------------------------------------------------
            */

            $workingDays
                = $salary->monthly_working_days;

            $absentDays
                = $workingDays
                - ($presentDays + $leaveDays);

            /*
            |--------------------------------------------------------------------------
            | GROSS
            |--------------------------------------------------------------------------
            */

            $grossSalary
                = $salary->basic_salary
                + $salary->hra
                + $salary->allowance
                + $salary->bonus;

            /*
            |--------------------------------------------------------------------------
            | PER DAY
            |--------------------------------------------------------------------------
            */

            $perDaySalary
                = $grossSalary
                / $workingDays;

            /*
            |--------------------------------------------------------------------------
            | DEDUCTIONS
            |--------------------------------------------------------------------------
            */

            $absentDeduction
                = $perDaySalary
                * $absentDays;

            $totalDeduction
                = $salary->tax
                + $salary->pf
                + $salary->esi
                + $absentDeduction;

            /*
            |--------------------------------------------------------------------------
            | NET
            |--------------------------------------------------------------------------
            */

            $netSalary
                = $grossSalary
                - $totalDeduction;

            /*
            |--------------------------------------------------------------------------
            | CREATE PAYROLL
            |--------------------------------------------------------------------------
            */

            $payroll = $this->repository
                ->create([

                    'company_id'
                        => $user->company_id,

                    'user_id'
                        => $user->id,

                    'payroll_month'
                        => $month,

                    'salary_date'
                        => now(),

                    'working_days'
                        => $workingDays,

                    'present_days'
                        => $presentDays,

                    'leave_days'
                        => $leaveDays,

                    'absent_days'
                        => $absentDays,

                    'gross_salary'
                        => $grossSalary,

                    'total_bonus'
                        => $salary->bonus,

                    'total_deduction'
                        => $totalDeduction,

                    'net_salary'
                        => $netSalary,

                    'status'
                        => 'generated',
                ]);

            /*
            |--------------------------------------------------------------------------
            | ITEMS
            |--------------------------------------------------------------------------
            */

            PayrollItem::create([
                'payroll_id'
                    => $payroll->id,
                'type'
                    => 'earning',
                'title'
                    => 'Basic Salary',
                'amount'
                    => $salary->basic_salary,
            ]);

            PayrollItem::create([
                'payroll_id'
                    => $payroll->id,
                'type'
                    => 'earning',
                'title'
                    => 'HRA',
                'amount'
                    => $salary->hra,
            ]);

            PayrollItem::create([
                'payroll_id'
                    => $payroll->id,
                'type'
                    => 'deduction',
                'title'
                    => 'Tax',
                'amount'
                    => $salary->tax,
            ]);

            PayrollItem::create([
                'payroll_id'
                    => $payroll->id,
                'type'
                    => 'deduction',
                'title'
                    => 'PF',
                'amount'
                    => $salary->pf,
            ]);

            return $payroll->load([
                'items',
                'user',
            ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | MARK PAID
    |--------------------------------------------------------------------------
    */

    public function markPaid(
        Payroll $payroll
    )
    {

        return $this->repository
            ->update(
                $payroll,
                [

                    'status'
                        => 'paid',

                    'paid_at'
                        => now(),
                ]
            );
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function delete(
        Payroll $payroll
    )
    {

        return $this->repository
            ->delete($payroll);
    }
}
