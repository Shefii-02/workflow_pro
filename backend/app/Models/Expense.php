<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Expense extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',
        'project_id',
        'user_id',

        'title',
        'description',

        'amount',
        'currency',

        'category',

        'receipt_url',
        'receipt_original_name',
        'receipt_file_size',
        'receipt_file_type',

        'is_billable',

        'expense_date',

        'status',

        'approved_by',
        'approved_at',

        'reimbursed_at',

        'rejection_reason',
    ];

    protected $casts = [

        'is_billable' => 'boolean',

        'expense_date' => 'date',

        'approved_at' => 'datetime',

        'reimbursed_at' => 'datetime',
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

    public function project()
    {
        return $this->belongsTo(
            Project::class
        );
    }

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }

    public function approver()
    {
        return $this->belongsTo(
            User::class,
            'approved_by'
        );
    }
}
