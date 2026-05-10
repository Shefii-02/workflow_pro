<?php

namespace App\Repositories;

use App\Models\BreakType;

class BreakTypeRepository
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
        return BreakType::create(
            $data
        );
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

        $breakType->update($data);

        return $breakType->fresh();
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
        return $breakType->delete();
    }
}
