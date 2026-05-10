<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\ProjectEstimate;
use App\Repositories\InvoiceRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class InvoiceService
{
    public function __construct(
        protected InvoiceRepository $repository
    ) {
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {

            $calculated = $this->calculate(
                $data
            );

            $invoice = $this->repository->create([

                'company_id'
                    => auth()->user()->company_id,

                'client_id'
                    => $data['client_id'],

                'project_id'
                    => $data['project_id'] ?? null,

                'created_by'
                    => auth()->id(),

                'invoice_number'
                    => $this->generateInvoiceNumber(),

                'subtotal'
                    => $calculated['subtotal'],

                'tax_percent'
                    => $data['tax_percent'] ?? 0,

                'tax_amount'
                    => $calculated['tax_amount'],

                'discount_amount'
                    => $data['discount_amount'] ?? 0,

                'total_amount'
                    => $calculated['grand_total'],

                'issue_date'
                    => $data['issue_date'] ?? now(),

                'due_date'
                    => $data['due_date'] ?? null,

                'notes'
                    => $data['notes'] ?? null,
            ]);

            /*
            |--------------------------------------------------------------------------
            | ITEMS
            |--------------------------------------------------------------------------
            */

            foreach ($data['items'] as $index => $item) {

                $invoice->items()->create([

                    'description'
                        => $item['description'],

                    'quantity'
                        => $item['quantity'],

                    'unit_price'
                        => $item['unit_price'],

                    'total'
                        => (
                            $item['quantity']
                            * $item['unit_price']
                        ),

                    'sort_order'
                        => $index + 1,
                ]);
            }

            return $invoice->load('items');
        });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Invoice $invoice,
        array $data
    ) {

        return DB::transaction(function () use (
            $invoice,
            $data
        ) {

            $invoice->items()->delete();

            $calculated = $this->calculate(
                $data
            );

            $this->repository->update(
                $invoice,
                [

                    'client_id'
                        => $data['client_id'],

                    'project_id'
                        => $data['project_id'] ?? null,

                    'subtotal'
                        => $calculated['subtotal'],

                    'tax_percent'
                        => $data['tax_percent'] ?? 0,

                    'tax_amount'
                        => $calculated['tax_amount'],

                    'discount_amount'
                        => $data['discount_amount'] ?? 0,

                    'total_amount'
                        => $calculated['grand_total'],

                    'issue_date'
                        => $data['issue_date'] ?? now(),

                    'due_date'
                        => $data['due_date'] ?? null,

                    'notes'
                        => $data['notes'] ?? null,
                ]
            );

            foreach ($data['items'] as $index => $item) {

                $invoice->items()->create([

                    'description'
                        => $item['description'],

                    'quantity'
                        => $item['quantity'],

                    'unit_price'
                        => $item['unit_price'],

                    'total'
                        => (
                            $item['quantity']
                            * $item['unit_price']
                        ),

                    'sort_order'
                        => $index + 1,
                ]);
            }

            return $invoice->load('items');
        });
    }

    /*
    |--------------------------------------------------------------------------
    | CONVERT ESTIMATE TO INVOICE
    |--------------------------------------------------------------------------
    */

    public function convertEstimate(
        ProjectEstimate $estimate
    ) {

        return DB::transaction(function () use (
            $estimate
        ) {

            /*
            |--------------------------------------------------------------------------
            | CREATE INVOICE
            |--------------------------------------------------------------------------
            */

            $invoice = Invoice::create([

                'company_id'
                    => $estimate->company_id,

                'client_id'
                    => $estimate->client_id,

                'project_id'
                    => $estimate->project_id,

                'estimate_id'
                    => $estimate->id,

                'created_by'
                    => auth()->id(),

                'invoice_number'
                    => $this->generateInvoiceNumber(),

                'subtotal'
                    => $estimate->subtotal,

                'tax_percent'
                    => $estimate->tax_percent,

                'tax_amount'
                    => $estimate->tax_amount,

                'discount_amount'
                    => $estimate->discount_amount,

                'total_amount'
                    => $estimate->total_amount,

                'currency'
                    => $estimate->currency,

                'notes'
                    => $estimate->notes,

                'issue_date'
                    => now(),

                'status'
                    => 'draft',
            ]);

            /*
            |--------------------------------------------------------------------------
            | COPY ITEMS
            |--------------------------------------------------------------------------
            */

            foreach ($estimate->items as $item) {

                $invoice->items()->create([

                    'description'
                        => $item->title,

                    'quantity'
                        => $item->quantity,

                    'unit_price'
                        => $item->unit_price,

                    'total'
                        => $item->total,
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | UPDATE ESTIMATE
            |--------------------------------------------------------------------------
            */

            $estimate->update([

                'status'
                    => 'converted_to_invoice',

                'invoice_id'
                    => $invoice->id,
            ]);

            return $invoice->load('items');
        });
    }

    /*
    |--------------------------------------------------------------------------
    | CALCULATE
    |--------------------------------------------------------------------------
    */

    private function calculate(array $data)
    {
        $subtotal = 0;

        foreach ($data['items'] as $item) {

            $subtotal += (
                $item['quantity']
                * $item['unit_price']
            );
        }

        $taxPercent = (
            $data['tax_percent'] ?? 0
        );

        $discount = (
            $data['discount_amount'] ?? 0
        );

        $taxAmount = (
            $subtotal
            * $taxPercent
        ) / 100;

        $grandTotal = (
            $subtotal
            + $taxAmount
            - $discount
        );

        return [

            'subtotal' => $subtotal,

            'tax_amount' => $taxAmount,

            'grand_total' => $grandTotal,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | NUMBER
    |--------------------------------------------------------------------------
    */

    private function generateInvoiceNumber()
    {
        return 'INV-'
            . now()->format('Y')
            . '-'
            . strtoupper(
                Str::random(6)
            );
    }
}
