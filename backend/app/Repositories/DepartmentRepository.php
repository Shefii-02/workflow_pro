<?php

namespace App\Repositories;

use App\Models\Department;

class DepartmentRepository
{
    public function create(
        array $data
    )
    {
        return Department::create($data);
    }

    public function update(
        Department $department,
        array $data
    )
    {
        $department->update($data);

        return $department->fresh();
    }

    public function delete(
        Department $department
    )
    {
        return $department->delete();
    }
}
