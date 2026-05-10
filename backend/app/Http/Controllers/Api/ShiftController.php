<?php

namespace App\Http\Controllers\Api;

use App\Models\Shift;
use Illuminate\Http\Request;
use App\Services\ShiftService;
use App\Http\Controllers\Controller;
use App\Repositories\ShiftRepository;

class ShiftController extends Controller
{
    public function __construct(
        protected ShiftRepository $repository,
        protected ShiftService $service,
    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST
    |--------------------------------------------------------------------------
    */

    public function index()
    {

        return response()->json([

            'success' => true,

            'data'
                => $this->repository
                    ->getAll(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STORE
    |--------------------------------------------------------------------------
    */

    public function store(
        Request $request
    )
    {

        $shift = $this->service
            ->create(
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Shift created successfully',

            'data'
                => $shift,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show(
        Shift $shift
    )
    {

        return response()->json([

            'success' => true,

            'data'
                => $shift,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        Shift $shift
    )
    {

        $shift = $this->service
            ->update(
                $shift,
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Shift updated successfully',

            'data'
                => $shift,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Shift $shift
    )
    {

        $this->service
            ->delete($shift);

        return response()->json([

            'success' => true,

            'message'
                => 'Shift deleted successfully',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | ASSIGN SHIFT
    |--------------------------------------------------------------------------
    */

    public function assign(
        Request $request
    )
    {

        $assigned = $this->service
            ->assignShift(
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Shift assigned successfully',

            'data'
                => $assigned,
        ]);
    }
}
