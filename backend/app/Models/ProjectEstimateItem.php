<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ProjectEstimateItem extends Model
{
    use HasUuids;

    protected $fillable = [

        'estimate_id',

        'title',
        'description',

        'quantity',

        'estimated_hours',

        'unit_price',

        'tax_percent',

        'discount_amount',

        'total',

        'sort_order',
    ];

    protected $casts = [

        'quantity' => 'float',

        'estimated_hours' => 'float',

        'unit_price' => 'float',

        'tax_percent' => 'float',

        'discount_amount' => 'float',

        'total' => 'float',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function estimate()
    {
        return $this->belongsTo(
            ProjectEstimate::class,
            'estimate_id'
        );
    }
}
