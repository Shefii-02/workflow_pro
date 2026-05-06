<?php

namespace App\Models;

use app\Models\BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class TimeLogged extends BaseModel
{
    protected $table = 'time_logged';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function task()
    {
        return $this->belongsTo(ProjectTask::class);
    }
}
