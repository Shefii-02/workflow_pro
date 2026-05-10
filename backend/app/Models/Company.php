<?php

namespace App\Models;

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



    public function staff()
{
    return $this->belongsToMany(

        User::class,

        'company_users'
    )
    ->withPivot([

        'designation',

        'employee_code',

        'salary',

        'status',
    ]);
}
}
