<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ActivityLog extends Model
{
    use HasUuids;

    protected $fillable = [

        'user_id',
        'company_id',

        'action',
        'module',

        'reference_id',

        'old_value',
        'new_value',

        'ip_address',
        'user_agent',
    ];

    protected $casts = [

        'old_value' => 'array',

        'new_value' => 'array',
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

    public function company()
    {
        return $this->belongsTo(
            Company::class
        );
    }
}
