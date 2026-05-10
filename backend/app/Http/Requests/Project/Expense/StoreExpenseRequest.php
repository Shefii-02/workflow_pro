<?php

namespace App\Http\Requests\Project\Expense;

use Illuminate\Foundation\Http\FormRequest;

class StoreExpenseRequest extends FormRequest
{
    /**
     * Authorize
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Rules
     */
    public function rules(): array
    {
        return [

            'title'
                => 'required|string|max:255',

            'description'
                => 'nullable|string',

            'amount'
                => 'required|numeric|min:0',

            'currency'
                => 'required|string|max:10',

            'category'
                => 'nullable|string|max:100',

            'expense_date'
                => 'required|date',

            'is_billable'
                => 'nullable|boolean',

            'receipt'
                => 'nullable|file|max:20480'
                . '|mimes:jpg,jpeg,png,pdf,doc,docx,xls,xlsx,zip',
        ];
    }

    /**
     * Messages
     */
    public function messages(): array
    {
        return [

            'receipt.max'
                => 'Receipt file maximum size is 20MB',

            'receipt.mimes'
                => 'Invalid receipt file type',
        ];
    }
}
