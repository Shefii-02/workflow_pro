<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Client extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'name',
        'email',
        'phone',
        'password',

        'company_name',
        'website',

        'country',
        'state',
        'city',
        'address',

        'avatar',
        'notes',

        'status',
    ];

    protected $hidden = [

        'password',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function companies()
    {
        return $this->belongsToMany(

            Company::class,

            'company_clients'
        )
        ->withPivot([

            'service_type',

            'status',
        ]);
    }
}
