<?php

namespace App\Models;



class SubscriptionPlan extends BaseModel
{
    public function features()
    {
        return $this->hasMany(PlanFeature::class, 'plan_id');
    }
}
