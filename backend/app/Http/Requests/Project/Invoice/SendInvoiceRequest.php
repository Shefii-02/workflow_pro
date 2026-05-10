<?php

namespace App\Http\Requests\Project\Invoice;

use Illuminate\Foundation\Http\FormRequest;

class SendInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'subject'
                => 'nullable|string|max:255',

            'body'
                => 'nullable|string',

            'meeting_link'
                => 'nullable|url',

            'phone'
                => 'nullable|string|max:20',

            'email'
                => 'nullable|email',
        ];
    }
}
