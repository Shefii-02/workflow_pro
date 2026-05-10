<?php

namespace App\Services;

use App\Models\Holiday;
use App\Repositories\HolidayRepository;
use Illuminate\Support\Facades\DB;

class HolidayService
{
    public function __construct(
        protected HolidayRepository $repository
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

                    'date'
                        => $data['date'],

                    'is_recurring'
                        => $data['is_recurring']
                        ?? false,

                    'description'
                        => $data['description']
                        ?? null,

                    'is_paid'
                        => $data['is_paid']
                        ?? true,

                    'holiday_type'
                        => $data['holiday_type']
                        ?? null,
                ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Holiday $holiday,
        array $data
    )
    {

        return DB::transaction(function () use (
            $holiday,
            $data
        ) {

            return $this->repository
                ->update(
                    $holiday,
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
        Holiday $holiday
    )
    {
        return $this->repository
            ->delete($holiday);
    }
}
