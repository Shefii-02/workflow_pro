<?php

namespace App\Models;

use App\Models\Traits\BelongsToCompany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends BaseModel
{
    use SoftDeletes;
    use BelongsToCompany;

    protected $fillable = [
        'company_id',
        'title',
        'created_by',
        'client_id',
        'budget',
        'priority'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'project_members')
            ->withPivot('role');
    }

    public function attachments()
    {
        return $this->morphMany(ProjectAttachment::class, 'attachable');
    }

    public function tasks()
    {
        return $this->hasMany(ProjectTask::class);
    }

    public function meetings()
    {
        return $this->hasMany(Meeting::class);
    }


    public function notes()
    {
        return $this->hasMany(ProjectNote::class);
    }

    public function estimates()
    {
        return $this->hasMany(
            ProjectEstimate::class
        );
    }
}
