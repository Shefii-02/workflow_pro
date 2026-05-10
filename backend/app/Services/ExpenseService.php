<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\Project;
use App\Repositories\ExpenseRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ExpenseService
{
    public function __construct(
        protected ExpenseRepository $repository
    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST
    |--------------------------------------------------------------------------
    */

    public function list(Project $project)
    {
        return $this->repository
            ->list($project);
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    public function create(
        Project $project,
        array $data
    ) {

        return DB::transaction(function () use (
            $project,
            $data
        ) {

            if (isset($data['receipt'])) {

                $file = $data['receipt'];

                $data['receipt_url']
                    = $file->store(
                        'expenses/receipts',
                        'public'
                    );

                $data['receipt_original_name']
                    = $file->getClientOriginalName();

                $data['receipt_file_size']
                    = $file->getSize();

                $data['receipt_file_type']
                    = $file->getMimeType();
            }

            $data['company_id']
                = auth()->user()->company_id;

            $data['project_id']
                = $project->id;

            $data['user_id']
                = auth()->id();

            return $this->repository
                ->create($data);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Expense $expense,
        array $data
    ) {

        return DB::transaction(function () use (
            $expense,
            $data
        ) {

            if (
                isset($data['receipt'])
            ) {

                if (
                    $expense->receipt_url
                ) {

                    Storage::disk('public')
                        ->delete(
                            $expense->receipt_url
                        );
                }

                $data['receipt_url']
                    = $data['receipt']
                    ->store(
                        'expenses/receipts',
                        'public'
                    );
                $file = $data['receipt'];
                $data['receipt_original_name']
                    = $file->getClientOriginalName();

                $data['receipt_file_size']
                    = $file->getSize();

                $data['receipt_file_type']
                    = $file->getMimeType();
            }

            return $this->repository
                ->update(
                    $expense,
                    $data
                );
        });
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function delete(
        Expense $expense
    ) {

        if (
            $expense->receipt_url
        ) {

            Storage::disk('public')
                ->delete(
                    $expense->receipt_url
                );
        }

        return $this->repository
            ->delete($expense);
    }

    /*
    |--------------------------------------------------------------------------
    | APPROVE
    |--------------------------------------------------------------------------
    */

    public function approve(
        Expense $expense
    ) {

        return $expense->update([

            'status'
            => 'approved',

            'approved_by'
            => auth()->id(),

            'approved_at'
            => now(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | REJECT
    |--------------------------------------------------------------------------
    */

    public function reject(
        Expense $expense,
        string $reason
    ) {

        return $expense->update([

            'status'
            => 'rejected',

            'rejection_reason'
            => $reason,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | REIMBURSE
    |--------------------------------------------------------------------------
    */

    public function reimburse(
        Expense $expense
    ) {

        return $expense->update([

            'status'
            => 'reimbursed',

            'reimbursed_at'
            => now(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | PROJECT PROFITABILITY
    |--------------------------------------------------------------------------
    */

    public function profitability(
        Project $project
    ) {

        $totalExpenses = Expense::where(
            'project_id',
            $project->id
        )->sum('amount');

        $clientPaid
            = $project->client_paid_amount;

        $budget
            = $project->client_budget_amount;

        return [

            'project_budget'
            => $budget,

            'client_paid_amount'
            => $clientPaid,

            'total_expenses'
            => $totalExpenses,

            'remaining_budget'
            => $budget - $totalExpenses,

            'profit'
            => $clientPaid - $totalExpenses,
        ];
    }
}
