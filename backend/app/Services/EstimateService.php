<?php

namespace App\Services;

use App\Models\Project;
use App\Models\ProjectEstimate;
use App\Repositories\EstimateRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EstimateService
{
    public function __construct(
        protected EstimateRepository $repository
    ) {
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    public function create(
        Project $project,
        array $data
    ) {
        return DB::transaction(function () use (
            $project,
            $data
        ) {

            /*
            |--------------------------------------------------------------------------
            | CALCULATE
            |--------------------------------------------------------------------------
            */

            $calculated = $this->calculateTotals(
                $data
            );

            /*
            |--------------------------------------------------------------------------
            | CREATE ESTIMATE
            |--------------------------------------------------------------------------
            */

            $estimate = $this->repository->create([

                'project_id' => $project->id,

                'company_id' => auth()->user()->company_id,

                'created_by' => auth()->id(),

                'estimate_number'
                    => $this->generateEstimateNumber(),

                'title' => $data['title'],

                'description'
                    => $data['description'] ?? null,

                'client_id'
                    => $data['client_id'] ?? null,

                'issue_date'
                    => $data['issue_date'] ?? now(),

                'expiry_date'
                    => $data['expiry_date'] ?? null,

                'tax_percent'
                    => $data['tax_percent'] ?? 0,

                'discount_amount'
                    => $data['discount_amount'] ?? 0,

                'estimated_days'
                    => $data['estimated_days'] ?? 0,

                'estimated_completion_date'
                    => $data['estimated_completion_date'] ?? null,

                'notes'
                    => $data['notes'] ?? null,

                'terms_conditions'
                    => $data['terms_conditions'] ?? null,

                /*
                |--------------------------------------------------------------------------
                | AUTO TOTALS
                |--------------------------------------------------------------------------
                */

                'subtotal'
                    => $calculated['subtotal'],

                'tax_amount'
                    => $calculated['tax_amount'],

                'total_amount'
                    => $calculated['grand_total'],

                'estimated_hours'
                    => $calculated['estimated_hours'],
            ]);

            /*
            |--------------------------------------------------------------------------
            | CREATE ITEMS
            |--------------------------------------------------------------------------
            */

            foreach ($data['items'] as $index => $item) {

                $total = (
                    $item['quantity']
                    * $item['unit_price']
                );

                $estimate->items()->create([

                    'title' => $item['title'],

                    'description'
                        => $item['description'] ?? null,

                    'quantity'
                        => $item['quantity'],

                    'estimated_hours'
                        => $item['estimated_hours'] ?? 0,

                    'unit_price'
                        => $item['unit_price'],

                    'total'
                        => $total,

                    'sort_order'
                        => $index + 1,
                ]);
            }

            return $estimate->load('items');
        });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        ProjectEstimate $estimate,
        array $data
    ) {
        return DB::transaction(function () use (
            $estimate,
            $data
        ) {

            /*
            |--------------------------------------------------------------------------
            | DELETE OLD ITEMS
            |--------------------------------------------------------------------------
            */

            $estimate->items()->delete();

            /*
            |--------------------------------------------------------------------------
            | RECALCULATE
            |--------------------------------------------------------------------------
            */

            $calculated = $this->calculateTotals(
                $data
            );

            /*
            |--------------------------------------------------------------------------
            | UPDATE ESTIMATE
            |--------------------------------------------------------------------------
            */

            $this->repository->update(
                $estimate,
                [

                    'title' => $data['title'],

                    'description'
                        => $data['description'] ?? null,

                    'client_id'
                        => $data['client_id'] ?? null,

                    'issue_date'
                        => $data['issue_date'] ?? now(),

                    'expiry_date'
                        => $data['expiry_date'] ?? null,

                    'tax_percent'
                        => $data['tax_percent'] ?? 0,

                    'discount_amount'
                        => $data['discount_amount'] ?? 0,

                    'estimated_days'
                        => $data['estimated_days'] ?? 0,

                    'estimated_completion_date'
                        => $data['estimated_completion_date'] ?? null,

                    'notes'
                        => $data['notes'] ?? null,

                    'terms_conditions'
                        => $data['terms_conditions'] ?? null,

                    'subtotal'
                        => $calculated['subtotal'],

                    'tax_amount'
                        => $calculated['tax_amount'],

                    'total_amount'
                        => $calculated['grand_total'],

                    'estimated_hours'
                        => $calculated['estimated_hours'],
                ]
            );

            /*
            |--------------------------------------------------------------------------
            | RECREATE ITEMS
            |--------------------------------------------------------------------------
            */

            foreach ($data['items'] as $index => $item) {

                $estimate->items()->create([

                    'title' => $item['title'],

                    'description'
                        => $item['description'] ?? null,

                    'quantity'
                        => $item['quantity'],

                    'estimated_hours'
                        => $item['estimated_hours'] ?? 0,

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

            return $estimate->load('items');
        });
    }

    /*
    |--------------------------------------------------------------------------
    | CALCULATE TOTALS
    |--------------------------------------------------------------------------
    */

    private function calculateTotals(
        array $data
    ): array {

        $subtotal = 0;

        $estimatedHours = 0;

        foreach ($data['items'] as $item) {

            $lineTotal = (
                $item['quantity']
                * $item['unit_price']
            );

            $subtotal += $lineTotal;

            $estimatedHours += (
                $item['estimated_hours'] ?? 0
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
        ) - $discount;

        return [

            'subtotal' => $subtotal,

            'tax_amount' => $taxAmount,

            'grand_total' => $grandTotal,

            'estimated_hours'
                => $estimatedHours,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | ESTIMATE NUMBER
    |--------------------------------------------------------------------------
    */

    private function generateEstimateNumber()
    {
        return 'EST-'
            . now()->format('Y')
            . '-'
            . strtoupper(
                Str::random(6)
            );
    }
}
