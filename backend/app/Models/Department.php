<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Department extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'name',

        'slug',

        'description',

        'department_head_id',

        'status',

        'meta',
    ];

    protected $casts = [

        'meta' => 'array',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function head()
    {
        return $this->belongsTo(
            User::class,
            'department_head_id'
        );
    }

    public function staff()
    {
        return $this->hasMany(
            CompanyUser::class,
            'department_id'
        );
    }
}
