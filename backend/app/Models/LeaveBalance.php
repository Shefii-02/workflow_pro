<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class LeaveBalance extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'user_id',

        'leave_type_id',

        'year',

        'allocated_days',

        'used_days',

        'remaining_days',

        'carry_forward_days',

        'manual_adjustment_days',

        'is_active',
    ];

    protected $casts = [

        'allocated_days'
            => 'float',

        'used_days'
            => 'float',

        'remaining_days'
            => 'float',

        'carry_forward_days'
            => 'float',

        'manual_adjustment_days'
            => 'float',

        'is_active'
            => 'boolean',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function leaveType()
    {
        return $this->belongsTo(
            LeaveType::class
        );
    }

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }
}
