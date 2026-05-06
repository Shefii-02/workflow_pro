<?php

namespace App\Models;

use app\Models\BaseModel;

class Leave extends BaseModel
{
    protected $table = 'leaves';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
