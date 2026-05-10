<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class TaskComment extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'task_id',
        'user_id',
        'content',
        'is_edited',
    ];

    protected $casts = [
        'is_edited' => 'boolean',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    public function task()
    {
        return $this->belongsTo(ProjectTask::class, 'task_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
