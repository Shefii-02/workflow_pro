<?php

namespace App\Services;

use App\Models\Shift;
use App\Models\UserShift;
use App\Repositories\ShiftRepository;

class ShiftService
{
    public function __construct(
        protected ShiftRepository $repository
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

        $data['company_id']
            = auth()->user()->company_id;

        return $this->repository
            ->create($data);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Shift $shift,
        array $data
    )
    {

        return $this->repository
            ->update(
                $shift,
                $data
            );
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function delete(
        Shift $shift
    )
    {

        return $this->repository
            ->delete($shift);
    }

    /*
    |--------------------------------------------------------------------------
    | ASSIGN SHIFT
    |--------------------------------------------------------------------------
    */

    public function assignShift(
        array $data
    )
    {

        return UserShift::create([

            'company_id'
                => auth()->user()->company_id,

            'user_id'
                => $data['user_id'],

            'shift_id'
                => $data['shift_id'],

            'effective_from'
                => $data['effective_from'],

            'effective_to'
                => $data['effective_to']
                ?? null,
        ]);
    }
}
