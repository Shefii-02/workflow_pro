<?php

namespace App\Models;



class SubscriptionPurchase extends BaseModel
{
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function plan()
    {
        return $this->belongsTo(SubscriptionPlan::class);
    }
}
