<?php

namespace App\Repositories;

use App\Models\Leave;

class LeaveRepository
{
    public function create(
        array $data
    )
    {
        return Leave::create($data);
    }

    public function update(
        Leave $leave,
        array $data
    )
    {
        $leave->update($data);

        return $leave->fresh();
    }

    public function delete(
        Leave $leave
    )
    {
        return $leave->delete();
    }
}
