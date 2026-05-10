<?php

namespace App\Services;

use App\Models\Role;
use Illuminate\Support\Facades\DB;

class RoleService
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

        return DB::transaction(function () use (
            $data
        ) {

            $role = Role::create([

                'company_id'
                    => auth()->user()->company_id,

                'name'
                    => $data['name'],

                'slug'
                    => $data['slug'],

                'description'
                    => $data['description']
                    ?? null,
            ]);

            /*
            |--------------------------------------------------------------------------
            | PERMISSIONS
            |--------------------------------------------------------------------------
            */

            if (
                isset($data['permissions'])
            ) {

                $role->permissions()
                    ->sync(
                        $data['permissions']
                    );
            }

            return $role->load([
                'permissions',
            ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Role $role,
        array $data
    )
    {

        return DB::transaction(function () use (
            $role,
            $data
        ) {

            $role->update([

                'name'
                    => $data['name']
                    ?? $role->name,

                'slug'
                    => $data['slug']
                    ?? $role->slug,

                'description'
                    => $data['description']
                    ?? $role->description,
            ]);

            /*
            |--------------------------------------------------------------------------
            | OVERWRITE PERMISSIONS
            |--------------------------------------------------------------------------
            */

            if (
                isset($data['permissions'])
            ) {

                $role->permissions()
                    ->sync(
                        $data['permissions']
                    );
            }

            return $role->load([
                'permissions',
            ]);
        });
    }
}
