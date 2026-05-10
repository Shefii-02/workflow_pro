<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
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

            'mobile'
                => 'nullable|string|max:20',

            'address'
                => 'nullable|string',

            'city'
                => 'nullable|string|max:100',

            'country'
                => 'nullable|string|max:100',

            'state'
                => 'nullable|string|max:100',

            'avatar'
                => 'nullable|image|max:2048',

            'status'
                => 'nullable|in:active,inactive,blocked',

            'company_name'
                => 'nullable|string|max:255',
        ];
    }
}
