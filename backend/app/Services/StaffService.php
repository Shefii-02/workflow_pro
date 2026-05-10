<?php

namespace App\Services;

use App\Models\User;
use App\Models\CompanyUser;
use App\Repositories\StaffRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class StaffService
{
    public function __construct(
        protected StaffRepository $repository,
        protected ActivityLogService $activityLogService,
    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST
    |--------------------------------------------------------------------------
    */

    public function list()
    {
        return $this->repository
            ->list();
    }

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

            /*
            |--------------------------------------------------------------------------
            | CHECK EXISTING USER
            |--------------------------------------------------------------------------
            */

            $user = User::where(
                'email',
                $data['email']
            )->first();

            /*
            |--------------------------------------------------------------------------
            | CREATE USER
            |--------------------------------------------------------------------------
            */

            if (!$user) {

                $user = User::create([

                    'name'
                        => $data['name'],

                    'email'
                        => $data['email'],

                    'phone'
                        => $data['phone']
                        ?? null,

                    'password'
                        => Hash::make(
                            $data['password']
                            ?? 'password123'
                        ),
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | PREVENT DUPLICATE STAFF
            |--------------------------------------------------------------------------
            */

            $existing = CompanyUser::where(

                'company_id',
                auth()->user()->company_id

            )
            ->where(
                'user_id',
                $user->id
            )
            ->first();

            if ($existing) {

                abort(
                    422,
                    'User already added to company'
                );
            }

            /*
            |--------------------------------------------------------------------------
            | CREATE STAFF
            |--------------------------------------------------------------------------
            */

            $staff = $this->repository
                ->create([

                    'company_id'
                        => auth()->user()->company_id,

                    'user_id'
                        => $user->id,

                    'employee_code'
                        => $data['employee_code']
                        ?? strtoupper(
                            Str::random(8)
                        ),

                    'designation'
                        => $data['designation']
                        ?? null,

                    'department_id'
                        => $data['department_id']
                        ?? null,

                    'role_id'
                        => $data['role_id']
                        ?? null,

                    'joined_at'
                        => $data['joined_at']
                        ?? now(),

                    'employment_type'
                        => $data['employment_type']
                        ?? 'full_time',

                    'salary'
                        => $data['salary']
                        ?? null,

                    'status'
                        => $data['status']
                        ?? 'active',
                ]);

            /*
            |--------------------------------------------------------------------------
            | ACTIVITY LOG
            |--------------------------------------------------------------------------
            */

            $this->activityLogService
                ->log(

                    action: 'created',

                    module: 'staff',

                    referenceId: $staff->id,

                    newValue: $staff->toArray()
                );

            return $staff->load([
                'user',
            ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        CompanyUser $staff,
        array $data
    )
    {

        return DB::transaction(function () use (
            $staff,
            $data
        ) {

            $old = $staff->toArray();

            /*
            |--------------------------------------------------------------------------
            | UPDATE USER
            |--------------------------------------------------------------------------
            */

            $staff->user->update([

                'name'
                    => $data['name']
                    ?? $staff->user->name,

                'phone'
                    => $data['phone']
                    ?? $staff->user->phone,
            ]);

            /*
            |--------------------------------------------------------------------------
            | UPDATE STAFF
            |--------------------------------------------------------------------------
            */

            $staff = $this->repository
                ->update(
                    $staff,
                    $data
                );

            /*
            |--------------------------------------------------------------------------
            | ACTIVITY LOG
            |--------------------------------------------------------------------------
            */

            $this->activityLogService
                ->log(

                    action: 'updated',

                    module: 'staff',

                    referenceId: $staff->id,

                    oldValue: $old,

                    newValue: $staff->fresh()->toArray()
                );

            return $staff->load([
                'user',
            ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function delete(
        CompanyUser $staff
    )
    {

        $old = $staff->toArray();

        $this->repository
            ->delete($staff);

        $this->activityLogService
            ->log(

                action: 'deleted',

                module: 'staff',

                referenceId: $staff->id,

                oldValue: $old
            );
    }
}
