<?php

namespace App\Models;



class Notification extends BaseModel
{
    protected $fillable = ['user_id','title','body'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
