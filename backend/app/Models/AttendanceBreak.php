<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class AttendanceBreak extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'attendance_id',

        'break_start_at',
        'break_end_at',

        'break_end_latitude',
        'break_end_longitude',

        'break_end_selfie',

        'break_end_biometric_verified',

        'break_type',
        'break_label',

        'duration_minutes',
    ];

    protected $casts = [

        'break_start_at'
            => 'datetime',

        'break_end_at'
            => 'datetime',

        'break_end_biometric_verified'
            => 'boolean',
    ];

    public function attendance()
    {
        return $this->belongsTo(
            Attendance::class
        );
    }
}
