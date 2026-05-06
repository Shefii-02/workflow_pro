<?php

namespace App\Models;

use app\Models\BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectTask extends BaseModel
{
    use SoftDeletes;

    protected $fillable = ['project_id','title','created_by'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function parent()
    {
        return $this->belongsTo(ProjectTask::class, 'parent_task_id');
    }

    public function children()
    {
        return $this->hasMany(ProjectTask::class, 'parent_task_id');
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function comments()
    {
        return $this->hasMany(TaskComment::class, 'task_id');
    }
}
