<?php

namespace App\Repositories;

use App\Models\Expense;
use App\Models\Project;

class ExpenseRepository
{
    public function list(Project $project)
    {
        return Expense::with([
            'user',
            'approver',
        ])
        ->where(
            'project_id',
            $project->id
        )
        ->latest()
        ->paginate(20);
    }

    public function create(array $data)
    {
        return Expense::create($data);
    }

    public function update(
        Expense $expense,
        array $data
    ) {

        $expense->update($data);

        return $expense->fresh();
    }

    public function delete(
        Expense $expense
    ) {

        return $expense->delete();
    }
}
