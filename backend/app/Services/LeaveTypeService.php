<?php

namespace App\Services;

use App\Models\LeaveType;
use App\Repositories\LeaveTypeRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LeaveTypeService
{
    public function __construct(
        protected LeaveTypeRepository $repository
    ) {}

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
                        => $data['slug']
                        ?? Str::slug(
                            $data['name']
                        ),

                    'description'
                        => $data['description']
                        ?? null,

                    'days_per_year'
                        => $data['days_per_year']
                        ?? 0,

                    'max_days_per_month'
                        => $data['max_days_per_month']
                        ?? null,

                    'max_consecutive_days'
                        => $data['max_consecutive_days']
                        ?? null,

                    'is_paid'
                        => $data['is_paid']
                        ?? true,

                    'requires_approval'
                        => $data['requires_approval']
                        ?? true,

                    'allow_half_day'
                        => $data['allow_half_day']
                        ?? true,

                    'carry_forward'
                        => $data['carry_forward']
                        ?? false,

                    'requires_document'
                        => $data['requires_document']
                        ?? false,

                    'applicable_roles'
                        => $data['applicable_roles']
                        ?? null,

                    'applicable_departments'
                        => $data['applicable_departments']
                        ?? null,

                    'status'
                        => $data['status']
                        ?? true,
                ]);
        });
    }

    public function update(
        LeaveType $leaveType,
        array $data
    )
    {

        return DB::transaction(function () use (
            $leaveType,
            $data
        ) {

            return $this->repository
                ->update(
                    $leaveType,
                    $data
                );
        });
    }

    public function delete(
        LeaveType $leaveType
    )
    {
        return $this->repository
            ->delete($leaveType);
    }
}
