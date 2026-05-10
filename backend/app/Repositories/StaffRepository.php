<?php

namespace App\Repositories;

use App\Models\CompanyUser;

class StaffRepository
{
    public function list()
    {
        return CompanyUser::with([
            'user',
        ])
        ->latest()
        ->paginate(20);
    }

    public function create(
        array $data
    )
    {
        return CompanyUser::create($data);
    }

    public function update(
        CompanyUser $staff,
        array $data
    )
    {
        $staff->update($data);

        return $staff->fresh();
    }

    public function delete(
        CompanyUser $staff
    )
    {
        return $staff->delete();
    }
}
