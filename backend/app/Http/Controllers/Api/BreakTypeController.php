<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BreakType;
use App\Services\BreakTypeService;
use Illuminate\Http\Request;

class BreakTypeController extends Controller
{
    public function __construct(
        protected BreakTypeService $service
    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST
    |--------------------------------------------------------------------------
    */

    public function index()
    {

        $breakTypes = BreakType::latest()
            ->paginate(20);

        return response()->json([

            'success' => true,

            'data'
                => $breakTypes,
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

            'label'
                => 'required|string|max:255',

            'slug'
                => 'nullable|string|max:255',

            'allowed_minutes'
                => 'nullable|integer|min:1',

            'is_paid'
                => 'nullable|boolean',

            'requires_approval'
                => 'nullable|boolean',

            'status'
                => 'nullable|boolean',
        ]);

        $breakType = $this->service
            ->create(
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Break type created successfully',

            'data'
                => $breakType,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show(
        BreakType $breakType
    )
    {

        return response()->json([

            'success' => true,

            'data'
                => $breakType,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        BreakType $breakType
    )
    {

        $request->validate([

            'label'
                => 'sometimes|required|string|max:255',

            'slug'
                => 'nullable|string|max:255',

            'allowed_minutes'
                => 'nullable|integer|min:1',

            'is_paid'
                => 'nullable|boolean',

            'requires_approval'
                => 'nullable|boolean',

            'status'
                => 'nullable|boolean',
        ]);

        $breakType = $this->service
            ->update(
                $breakType,
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Break type updated successfully',

            'data'
                => $breakType,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        BreakType $breakType
    )
    {

        $this->service
            ->delete($breakType);

        return response()->json([

            'success' => true,

            'message'
                => 'Break type deleted successfully',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | ACTIVE LIST
    |--------------------------------------------------------------------------
    */

    public function activeList()
    {

        $breakTypes = BreakType::where(
            'status',
            true
        )
        ->latest()
        ->get();

        return response()->json([

            'success' => true,

            'data'
                => $breakTypes,
        ]);
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

        $breakType = $this->service
            ->toggleStatus(
                $breakType
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Break type status updated',

            'data'
                => $breakType,
        ]);
    }
}
