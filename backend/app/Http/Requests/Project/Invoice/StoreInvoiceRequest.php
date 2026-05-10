<?php

namespace App\Http\Requests\Project\Invoice;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'client_id'
                => 'nullable',

            'project_id'
                => 'nullable|exists:projects,id',

            'issue_date'
                => 'nullable|date',

            'due_date'
                => 'nullable|date',

            'tax_percent'
                => 'nullable|numeric|min:0',

            'discount_amount'
                => 'nullable|numeric|min:0',

            'notes'
                => 'nullable|string',

            'items'
                => 'required|array|min:1',

            'items.*.description'
                => 'required|string|max:500',

            'items.*.quantity'
                => 'required|numeric|min:1',

            'items.*.unit_price'
                => 'required|numeric|min:0',
        ];
    }
}
