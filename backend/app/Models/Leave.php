<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Leave extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'user_id',

        'leave_type_id',

        'start_date',

        'end_date',

        'total_days',

        'is_half_day',

        'half_day_type',

        'reason',

        'attachment',

        'status',

        'approved_by',

        'approved_at',

        'rejection_reason',

        'salary_deducted',
    ];

    protected $casts = [

        'start_date'
            => 'date',

        'end_date'
            => 'date',

        'is_half_day'
            => 'boolean',

        'salary_deducted'
            => 'boolean',

        'approved_at'
            => 'datetime',
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

    public function approver()
    {
        return $this->belongsTo(
            User::class,
            'approved_by'
        );
    }
}
