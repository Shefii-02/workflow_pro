<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class EmployeeShift extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'user_id',

        'shift_id',

        'effective_from',

        'effective_to',
    ];

    protected $casts = [

        'effective_from'
            => 'date',

        'effective_to'
            => 'date',
    ];

    public function shift()
    {
        return $this->belongsTo(
            Shift::class
        );
    }

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }
}
