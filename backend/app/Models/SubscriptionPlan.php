<?php

namespace App\Models;

use app\Models\BaseModel;

class SubscriptionPlan extends BaseModel
{
    public function features()
    {
        return $this->hasMany(PlanFeature::class, 'plan_id');
    }
}
