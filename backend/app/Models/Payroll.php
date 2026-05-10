<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Payroll extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'user_id',

        'payroll_month',

        'salary_date',

        'working_days',

        'present_days',

        'leave_days',

        'absent_days',

        'overtime_hours',

        'gross_salary',

        'total_bonus',

        'total_deduction',

        'net_salary',

        'status',

        'paid_at',
    ];

    protected $casts = [

        'salary_date'
            => 'date',

        'paid_at'
            => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }

    public function items()
    {
        return $this->hasMany(
            PayrollItem::class
        );
    }
}
