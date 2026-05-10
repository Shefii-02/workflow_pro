<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class BreakType extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'label',

        'slug',

        'allowed_minutes',

        'is_paid',

        'requires_approval',

        'status',
    ];

    protected $casts = [

        'is_paid'
            => 'boolean',

        'requires_approval'
            => 'boolean',

        'status'
            => 'boolean',
    ];
}
