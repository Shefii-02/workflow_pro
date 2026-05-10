<?php

namespace App\Models;

use App\Models\Traits\BelongsToCompany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ProjectEstimate extends Model
{
    use HasUuids, SoftDeletes, BelongsToCompany;

    protected $fillable = [

        'company_id',
        'project_id',
        'client_id',
        'created_by',

        'estimate_number',
        'title',
        'description',

        'subtotal',
        'tax_percent',
        'tax_amount',
        'discount_amount',
        'total_amount',

        'estimated_hours',
        'estimated_days',
        'estimated_completion_date',

        'status',

        'invoice_id',

        'issue_date',
        'expiry_date',

        'terms_conditions',
        'notes',

        'currency',

        'pdf_url',
    ];

    protected $casts = [

        'subtotal' => 'float',
        'tax_percent' => 'float',
        'tax_amount' => 'float',
        'discount_amount' => 'float',
        'total_amount' => 'float',

        'estimated_hours' => 'integer',
        'estimated_days' => 'integer',

        'issue_date' => 'date',
        'expiry_date' => 'date',
        'estimated_completion_date' => 'date',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function company()
    {
        return $this->belongsTo(
            Company::class
        );
    }

    public function project()
    {
        return $this->belongsTo(
            Project::class
        );
    }

    public function client()
    {
        return $this->belongsTo(
            User::class,
            'client_id'
        );
    }

    public function creator()
    {
        return $this->belongsTo(
            User::class,
            'created_by'
        );
    }

    public function items()
    {
        return $this->hasMany(
            ProjectEstimateItem::class,
            'estimate_id'
        )->orderBy('sort_order');
    }

    public function invoice()
    {
        return $this->belongsTo(
            Invoice::class
        );
    }
}
