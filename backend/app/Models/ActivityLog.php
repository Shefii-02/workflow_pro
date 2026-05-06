<?php

namespace App\Models;

use app\Models\BaseModel;

class ActivityLog extends BaseModel
{
    protected $casts = [
        'old_value' => 'array',
        'new_value' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
