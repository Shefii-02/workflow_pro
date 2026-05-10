<?php

namespace App\Http\Requests\Project\Estimate;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectEstimateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'title' => 'required|string|max:255',

            'description' => 'nullable|string',

            'client_id' => 'nullable',

            'issue_date' => 'nullable|date',

            'expiry_date' => 'nullable|date',

            'tax_percent' => 'nullable|numeric|min:0',

            'discount_amount' => 'nullable|numeric|min:0',

            'estimated_days' => 'nullable|integer|min:0',

            'estimated_completion_date'
                => 'nullable|date',

            'notes' => 'nullable|string',

            'terms_conditions'
                => 'nullable|string',

            /*
            |--------------------------------------------------------------------------
            | ITEMS
            |--------------------------------------------------------------------------
            */

            'items' => 'required|array|min:1',

            'items.*.title'
                => 'required|string|max:255',

            'items.*.description'
                => 'nullable|string',

            'items.*.quantity'
                => 'required|numeric|min:1',

            'items.*.estimated_hours'
                => 'nullable|numeric|min:0',

            'items.*.unit_price'
                => 'required|numeric|min:0',
        ];
    }
}


