<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Traits\BelongsToCompany;

class ProjectAttachment extends Model
{
    use HasUuids, SoftDeletes, BelongsToCompany;

    protected $fillable = [
        'company_id',
        'uploaded_by',
        'attachable_id',
        'attachable_type',
        'file_name',
        'original_name',
        'file_url',
        'disk',
        'mime_type',
        'file_size',
        'project_id'
    ];

    public function attachable()
    {
        return $this->morphTo();
    }



    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function tasks()
    {
        return $this->belongsToMany(
            ProjectTask::class,
            'task_attachments',
            'project_attachment_id',
            'task_id'
        );
    }
}
