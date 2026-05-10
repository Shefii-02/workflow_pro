<?php

namespace App\Models;



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
