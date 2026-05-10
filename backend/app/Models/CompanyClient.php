<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class CompanyClient extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'client_id',

        'service_type',

        'notes',

        'status',

        'created_by',

        'joined_at',
    ];

    protected $casts = [

        'joined_at'
            => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function company()
    {
        return $this->belongsTo(
            Company::class
        );
    }

    public function client()
    {
        return $this->belongsTo(
            Client::class
        );
    }

    public function creator()
    {
        return $this->belongsTo(
            User::class,
            'created_by'
        );
    }
}
