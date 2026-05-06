<?php

namespace App\Models;

use app\Models\BaseModel;

class Company extends BaseModel
{
    protected $fillable = ['name', 'slug', 'owner_id'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(SubscriptionPurchase::class);
    }
}
