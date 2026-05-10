<?php

namespace App\Repositories;

use App\Models\Holiday;

class HolidayRepository
{
    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    public function create(
        array $data
    )
    {
        return Holiday::create(
            $data
        );
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

        $holiday->update($data);

        return $holiday->fresh();
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
        return $holiday->delete();
    }
}
