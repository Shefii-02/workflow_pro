<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class LeaveType extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'name',

        'slug',

        'description',

        'days_per_year',

        'max_days_per_month',

        'max_consecutive_days',

        'is_paid',

        'requires_approval',

        'allow_half_day',

        'carry_forward',

        'requires_document',

        'applicable_roles',

        'applicable_departments',

        'status',
    ];

    protected $casts = [

        'is_paid'
            => 'boolean',

        'requires_approval'
            => 'boolean',

        'allow_half_day'
            => 'boolean',

        'carry_forward'
            => 'boolean',

        'requires_document'
            => 'boolean',

        'status'
            => 'boolean',

        'applicable_roles'
            => 'array',

        'applicable_departments'
            => 'array',
    ];
}
