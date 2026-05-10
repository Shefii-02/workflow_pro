<?php

namespace App\Http\Requests\Department;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDepartmentRequest extends FormRequest
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

            'department_head_id'
                => 'nullable|uuid|exists:users,id',

            'status'
                => 'nullable|in:active,inactive',
        ];
    }
}
