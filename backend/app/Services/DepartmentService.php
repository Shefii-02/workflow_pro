<?php

namespace App\Services;

use App\Models\Department;
use App\Repositories\DepartmentRepository;
use Illuminate\Support\Facades\DB;

class DepartmentService
{
    public function __construct(
        protected DepartmentRepository $repository
    ) {}

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    public function create(
        array $data
    )
    {

        return DB::transaction(function () use (
            $data
        ) {

            return $this->repository
                ->create([

                    'company_id'
                        => auth()->user()->company_id,

                    'name'
                        => $data['name'],

                    'slug'
                        => $data['slug'],

                    'description'
                        => $data['description']
                        ?? null,

                    'department_head_id'
                        => $data['department_head_id']
                        ?? null,

                    'status'
                        => $data['status']
                        ?? 'active',
                ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Department $department,
        array $data
    )
    {

        return DB::transaction(function () use (
            $department,
            $data
        ) {

            return $this->repository
                ->update(
                    $department,
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
        Department $department
    )
    {
        return $this->repository
            ->delete($department);
    }
}
