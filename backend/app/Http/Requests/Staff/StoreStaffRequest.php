<?php

namespace App\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;

class StoreStaffRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | USER
            |--------------------------------------------------------------------------
            */

            'name'
                => 'required|string|max:255',

            'email'
                => 'required|email|max:255',

            'phone'
                => 'nullable|string|max:20',

            'password'
                => 'nullable|string|min:6',

            /*
            |--------------------------------------------------------------------------
            | STAFF
            |--------------------------------------------------------------------------
            */

            'employee_code'
                => 'nullable|string|max:100',

            'designation'
                => 'nullable|string|max:255',

            'department_id'
                => 'nullable|uuid',

            'role_id'
                => 'nullable|uuid',

            'joined_at'
                => 'nullable|date',

            'employment_type'
                => 'nullable|in:full_time,part_time,contract,intern,freelancer',

            'salary'
                => 'nullable|numeric|min:0',

            'status'
                => 'nullable|in:active,inactive,terminated',
        ];
    }
}
