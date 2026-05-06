<?php

namespace App\Models;

use app\Models\BaseModel;

class ChatMessage extends BaseModel
{
    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function reply()
    {
        return $this->belongsTo(ChatMessage::class, 'reply_to_id');
    }
}
