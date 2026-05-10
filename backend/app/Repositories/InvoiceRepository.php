<?php

namespace App\Repositories;

use App\Models\Invoice;

class InvoiceRepository
{
    public function create(array $data)
    {
        return Invoice::create($data);
    }

    public function update(
        Invoice $invoice,
        array $data
    ) {
        $invoice->update($data);

        return $invoice;
    }

    public function delete(
        Invoice $invoice
    ) {
        return $invoice->delete();
    }
}
