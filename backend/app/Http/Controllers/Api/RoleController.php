<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Models\Role;
use App\Services\RoleService;

class RoleController extends Controller
{
    public function __construct(
        protected RoleService $service
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
                => Role::with([
                    'permissions',
                ])
                ->latest()
                ->paginate(20),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STORE
    |--------------------------------------------------------------------------
    */

    public function store(
        StoreRoleRequest $request
    )
    {

        $role = $this->service
            ->create(
                $request->validated()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Role created successfully',

            'data'
                => $role,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show(
        Role $role
    )
    {

        return response()->json([

            'success' => true,

            'data'
                => $role->load([
                    'permissions',
                ]),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        UpdateRoleRequest $request,
        Role $role
    )
    {

        $role = $this->service
            ->update(
                $role,
                $request->validated()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Role updated successfully',

            'data'
                => $role,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Role $role
    )
    {

        $role->delete();

        return response()->json([

            'success' => true,

            'message'
                => 'Role deleted successfully',
        ]);
    }
}
