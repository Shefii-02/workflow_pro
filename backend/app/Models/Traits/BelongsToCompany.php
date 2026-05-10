<?php

namespace App\Models\Traits;

trait BelongsToCompany
{
    protected static function bootBelongsToCompany()
    {
        // 🔥 Global scope (auto filter by company)
        static::addGlobalScope('company', function ($query) {
            if (app()->bound('company_id')) {
                $query->where('company_id', app('company_id'));
            }
        });

        // 🔥 Auto set company_id on create
        static::creating(function ($model) {
            if (app()->bound('company_id')) {
                $model->company_id = app('company_id');
            }
        });
    }
}
