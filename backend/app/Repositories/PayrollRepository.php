<?php

namespace App\Repositories;

use App\Models\Payroll;

class PayrollRepository
{
    public function getAll()
    {
        return Payroll::with([
            'user',
            'items',
        ])
        ->latest()
        ->paginate(20);
    }

    public function create(
        array $data
    )
    {
        return Payroll::create($data);
    }

    public function update(
        Payroll $payroll,
        array $data
    )
    {
        $payroll->update($data);

        return $payroll->fresh();
    }

    public function delete(
        Payroll $payroll
    )
    {
        return $payroll->delete();
    }
}
