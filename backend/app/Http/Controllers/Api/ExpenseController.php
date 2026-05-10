<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\Expense\StoreExpenseRequest;
use App\Http\Requests\Project\Expense\UpdateExpenseRequest;
use App\Models\Expense;
use App\Models\Project;
use App\Services\ExpenseService;

class ExpenseController extends Controller
{
    public function __construct(
        protected ExpenseService $service
    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST
    |--------------------------------------------------------------------------
    */

    public function index(
        Project $project
    ) {

        return response()->json([

            'success' => true,

            'data'
                => $this->service
                    ->list($project),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STORE
    |--------------------------------------------------------------------------
    */

    public function store(
        StoreExpenseRequest $request,
        Project $project
    ) {

        $expense = $this->service
            ->create(
                $project,
                $request->validated()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Expense created successfully',

            'data'
                => $expense,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show(
        Expense $expense
    ) {

        return response()->json([

            'success' => true,

            'data'
                => $expense->load([
                    'user',
                    'approver',
                    'project',
                ]),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        UpdateExpenseRequest $request,
        Expense $expense
    ) {
        $expense = $this->service
            ->update(
                $expense,
                $request->validated()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Expense updated successfully',

            'data'
                => $expense,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Expense $expense
    ) {

        $this->service
            ->delete($expense);

        return response()->json([

            'success' => true,

            'message'
                => 'Expense deleted successfully',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | APPROVE
    |--------------------------------------------------------------------------
    */

    public function approve(
        Expense $expense
    ) {

        $this->service
            ->approve($expense);

        return response()->json([

            'success' => true,

            'message'
                => 'Expense approved',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | REJECT
    |--------------------------------------------------------------------------
    */

    public function reject(
        Expense $expense
    ) {

        $this->service
            ->reject(
                $expense,
                request('reason')
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Expense rejected',
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

        $this->service
            ->reimburse($expense);

        return response()->json([

            'success' => true,

            'message'
                => 'Expense reimbursed',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | PROFITABILITY
    |--------------------------------------------------------------------------
    */

    public function profitability(
        Project $project
    ) {

        return response()->json([

            'success' => true,

            'data'
                => $this->service
                    ->profitability(
                        $project
                    ),
        ]);
    }
}
