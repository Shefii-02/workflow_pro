<?php

namespace App\Models;

use app\Models\BaseModel;

class TaskComment extends BaseModel
{
    protected $fillable = ['task_id','user_id','content'];

    public function task()
    {
        return $this->belongsTo(ProjectTask::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
