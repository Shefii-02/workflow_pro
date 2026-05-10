<?php

namespace App\Http\Requests\Role;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'name'
                => 'required|string|max:255',

            'slug'
                => 'required|string|max:255',

            'description'
                => 'nullable|string',

            /*
            |--------------------------------------------------------------------------
            | ARRAY
            |--------------------------------------------------------------------------
            */

            'permissions'
                => 'nullable|array',

            'permissions.*'
                => 'uuid|exists:permissions,id',
        ];
    }
}
