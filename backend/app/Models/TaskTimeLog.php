<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class TaskTimeLog extends Model
{
    use HasUuids;

    protected $fillable = [
        'company_id',
        'project_id',
        'task_id',
        'user_id',
        'started_at',
        'paused_at',
        'ended_at',
        'worked_seconds',
        'status',
        'note',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'paused_at' => 'datetime',
        'ended_at' => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    public function task()
    {
        return $this->belongsTo(ProjectTask::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /*
    |--------------------------------------------------------------------------
    | ACCESSORS
    |--------------------------------------------------------------------------
    */

    public function getWorkedHoursAttribute()
    {
        return round(
            $this->worked_seconds / 3600,
            2
        );
    }
}
