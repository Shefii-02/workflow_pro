<?php

namespace App\Repositories;

use App\Models\Shift;

class ShiftRepository
{
    public function getAll()
    {
        return Shift::latest()
            ->paginate(20);
    }

    public function create(
        array $data
    )
    {
        return Shift::create($data);
    }

    public function update(
        Shift $shift,
        array $data
    )
    {
        $shift->update($data);

        return $shift->fresh();
    }

    public function delete(
        Shift $shift
    )
    {
        return $shift->delete();
    }
}
