<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class EmployeeSalaryStructure extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'user_id',

        'basic_salary',

        'hra',

        'allowance',

        'bonus',

        'tax',

        'pf',

        'esi',

        'overtime_per_hour',

        'monthly_working_days',
    ];

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }
}
