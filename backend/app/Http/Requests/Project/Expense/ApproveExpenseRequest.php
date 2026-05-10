<?php

namespace App\Http\Requests\Project\Expense;

use Illuminate\Foundation\Http\FormRequest;

class ApproveExpenseRequest extends FormRequest
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

            'status'
                => 'required|in:approved,rejected',

            'rejection_reason'
                => 'required_if:status,rejected'
                . '|nullable|string|max:1000',
        ];
    }

    /**
     * Messages
     */
    public function messages(): array
    {
        return [

            'status.required'
                => 'Expense status is required',

            'status.in'
                => 'Invalid expense status',

            'rejection_reason.required_if'
                => 'Rejection reason is required when rejecting expense',
        ];
    }
}
