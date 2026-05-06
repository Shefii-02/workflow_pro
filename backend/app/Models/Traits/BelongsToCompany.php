<?php
namespace App\Models\Traits;

trait BelongsToCompany
{
    protected static function booted()
    {
        static::addGlobalScope('company', function ($query) {
            if ($companyId = app('company_id')) {
                $query->where('company_id', $companyId);
            }
        });

        static::creating(function ($model) {
            if ($companyId = app('company_id')) {
                $model->company_id = $companyId;
            }
        });
    }
}
