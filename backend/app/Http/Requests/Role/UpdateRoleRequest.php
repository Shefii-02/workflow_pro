<?php

namespace App\Http\Requests\Role;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'name'
                => 'sometimes|required|string|max:255',

            'slug'
                => 'sometimes|required|string|max:255',

            'description'
                => 'nullable|string',

            'permissions'
                => 'nullable|array',

            'permissions.*'
                => 'uuid|exists:permissions,id',
        ];
    }
}
