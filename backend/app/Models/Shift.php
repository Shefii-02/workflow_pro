<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Shift extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'name',

        'code',

        'start_time',

        'end_time',

        'working_hours',

        'break_duration_minutes',

        'late_mark_after_minutes',

        'half_day_after_minutes',

        'grace_minutes',

        'is_night_shift',

        'allow_overtime',

        'overtime_after_minutes',

        'weekly_off_days',

        'description',

        'status',
    ];

    protected $casts = [

        'weekly_off_days'
            => 'array',

        'is_night_shift'
            => 'boolean',

        'allow_overtime'
            => 'boolean',

        'status'
            => 'boolean',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function users()
    {
        return $this->belongsToMany(
            User::class,
            'user_shifts'
        );
    }
}
