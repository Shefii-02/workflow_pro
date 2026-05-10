<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Holiday extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'name',

        'date',

        'is_recurring',

        'description',

        'is_paid',

        'holiday_type',
    ];

    protected $casts = [

        'date'
            => 'date',

        'is_recurring'
            => 'boolean',

        'is_paid'
            => 'boolean',
    ];
}
