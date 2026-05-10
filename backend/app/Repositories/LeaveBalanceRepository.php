<?php

namespace App\Repositories;

use App\Models\LeaveBalance;

class LeaveBalanceRepository
{
    public function firstOrCreate(
        array $attributes,
        array $values = []
    )
    {
        return LeaveBalance::firstOrCreate(
            $attributes,
            $values
        );
    }

    public function update(
        LeaveBalance $balance,
        array $data
    )
    {
        $balance->update($data);

        return $balance->fresh();
    }
}
