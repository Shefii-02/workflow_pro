<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Holiday;
use App\Services\HolidayService;
use Illuminate\Http\Request;

class HolidayController extends Controller
{
    public function __construct(
        protected HolidayService $service
    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST
    |--------------------------------------------------------------------------
    */

    public function index()
    {

        $holidays = Holiday::latest()
            ->paginate(20);

        return response()->json([

            'success' => true,

            'data'
                => $holidays,
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

        $request->validate([

            'name'
                => 'required|string|max:255',

            'date'
                => 'required|date',

            'is_recurring'
                => 'nullable|boolean',

            'description'
                => 'nullable|string',

            'is_paid'
                => 'nullable|boolean',

            'holiday_type'
                => 'nullable|string|max:255',
        ]);

        $holiday = $this->service
            ->create(
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Holiday created successfully',

            'data'
                => $holiday,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show(
        Holiday $holiday
    )
    {

        return response()->json([

            'success' => true,

            'data'
                => $holiday,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        Holiday $holiday
    )
    {

        $request->validate([

            'name'
                => 'sometimes|required|string|max:255',

            'date'
                => 'sometimes|required|date',

            'is_recurring'
                => 'nullable|boolean',

            'description'
                => 'nullable|string',

            'is_paid'
                => 'nullable|boolean',

            'holiday_type'
                => 'nullable|string|max:255',
        ]);

        $holiday = $this->service
            ->update(
                $holiday,
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Holiday updated successfully',

            'data'
                => $holiday,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Holiday $holiday
    )
    {

        $this->service
            ->delete($holiday);

        return response()->json([

            'success' => true,

            'message'
                => 'Holiday deleted successfully',
        ]);
    }
}
