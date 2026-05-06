<?php

namespace App\Models;

use app\Models\BaseModel;

class Notification extends BaseModel
{
    protected $fillable = ['user_id','title','body'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
