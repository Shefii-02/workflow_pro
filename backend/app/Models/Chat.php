<?php

namespace App\Models;

use app\Models\BaseModel;

class Chat extends BaseModel
{
    public function participants()
    {
        return $this->belongsToMany(User::class, 'chat_participants');
    }

    public function messages()
    {
        return $this->hasMany(ChatMessage::class);
    }
}
