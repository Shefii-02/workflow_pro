<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Permission extends Model
{
    use HasUuids;

    protected $fillable = [

        'module',

        'name',

        'action',

        'slug',
        'acc_type'
    ];


    public function roles()
    {
        return $this->belongsToMany(

            Role::class,

            'permission_role'
        );
    }
}
