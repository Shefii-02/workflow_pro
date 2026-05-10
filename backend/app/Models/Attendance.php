<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Attendance extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',
        'user_id',
        'attendance_date',

        'clock_in_at',
        'clock_in_latitude',
        'clock_in_longitude',
        'clock_in_selfie',

        'clock_out_at',
        'clock_out_latitude',
        'clock_out_longitude',
        'clock_out_selfie',

        'biometric_verified',
        'face_verified',
        'face_match_score',

        'inside_office',
        'distance_meter',
        'outside_reason',

        'device_id',

        'status',

        'total_work_seconds',
        'total_break_seconds',

        'ip_address',
    ];

    protected $casts = [

        'clock_in_at'
            => 'datetime',

        'clock_out_at'
            => 'datetime',

        'biometric_verified'
            => 'boolean',

        'face_verified'
            => 'boolean',

        'inside_office'
            => 'boolean',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function breaks()
    {
        return $this->hasMany(
            AttendanceBreak::class
        );
    }

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }
}
