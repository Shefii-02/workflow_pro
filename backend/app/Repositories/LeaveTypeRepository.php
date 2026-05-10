<?php

namespace App\Repositories;

use App\Models\LeaveType;

class LeaveTypeRepository
{
    public function create(
        array $data
    )
    {
        return LeaveType::create($data);
    }

    public function update(
        LeaveType $leaveType,
        array $data
    )
    {
        $leaveType->update($data);

        return $leaveType->fresh();
    }

    public function delete(
        LeaveType $leaveType
    )
    {
        return $leaveType->delete();
    }
}
