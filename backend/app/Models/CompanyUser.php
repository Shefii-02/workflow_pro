<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class CompanyUser extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',
        'user_id',

        'employee_code',

        'designation',

        'department_id',

        'role_id',

        'joined_at',

        'left_at',

        'employment_type',

        'salary',

        'status',

        'meta',
    ];

    protected $casts = [

        'meta' => 'array',

        'joined_at' => 'date',

        'left_at' => 'date',
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

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }
}
