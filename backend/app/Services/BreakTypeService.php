<?php

namespace App\Services;

use App\Models\BreakType;
use App\Repositories\BreakTypeRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BreakTypeService
{
    public function __construct(
        protected BreakTypeRepository $repository
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

                    'label'
                        => $data['label'],

                    'slug'
                        => $data['slug']
                        ?? Str::slug(
                            $data['label']
                        ),

                    'allowed_minutes'
                        => $data['allowed_minutes']
                        ?? 15,

                    'is_paid'
                        => $data['is_paid']
                        ?? true,

                    'requires_approval'
                        => $data['requires_approval']
                        ?? false,

                    'status'
                        => $data['status']
                        ?? true,
                ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        BreakType $breakType,
        array $data
    )
    {

        return DB::transaction(function () use (
            $breakType,
            $data
        ) {

            if (
                isset($data['label']) &&
                empty($data['slug'])
            ) {

                $data['slug']
                    = Str::slug(
                        $data['label']
                    );
            }

            return $this->repository
                ->update(
                    $breakType,
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
        BreakType $breakType
    )
    {
        return $this->repository
            ->delete($breakType);
    }

    /*
    |--------------------------------------------------------------------------
    | TOGGLE STATUS
    |--------------------------------------------------------------------------
    */

    public function toggleStatus(
        BreakType $breakType
    )
    {

        $breakType->update([

            'status'
                => !$breakType->status,
        ]);

        return $breakType->fresh();
    }
}
