<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class PayrollItem extends Model
{
    use HasUuids;

    protected $fillable = [

        'payroll_id',

        'type',

        'title',

        'amount',
    ];

    public function payroll()
    {
        return $this->belongsTo(
            Payroll::class
        );
    }
}
