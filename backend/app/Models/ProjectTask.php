<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ProjectTask extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'project_tasks';

    protected $fillable = [
        'project_id',
        'parent_task_id',
        'assigned_to',
        'created_by',
        'title',
        'description',
        'status',
        'priority',
        'due_date',
        'completed_at',
        'estimated_hours',
        'tags',
        'sort_order',
        'is_milestone',
    ];

    protected $casts = [
        'is_milestone' => 'boolean',
        'due_date' => 'date',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function parentTask()
    {
        return $this->belongsTo(ProjectTask::class, 'parent_task_id');
    }

    public function subtasks()
    {
        return $this->hasMany(ProjectTask::class, 'parent_task_id');
    }

    public function attachments()
    {
        return $this->belongsToMany(
            ProjectAttachment::class,
            'task_attachments',
            'task_id',
            'project_attachment_id'
        );
    }

    public function comments()
    {
        return $this->hasMany(TaskComment::class, 'task_id')
            ->latest();
    }

    public function timeLogs()
    {
        return $this->hasMany(TaskTimeLog::class, 'task_id');
    }
}
