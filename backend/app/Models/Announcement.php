<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Announcement extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'created_by',

        'title',

        'content',

        'visibility',

        'target_roles',

        'target_departments',

        'target_users',

        'is_pinned',

        'expires_at',

        'send_push',

        'send_email',

        'attachment',
    ];

    protected $casts = [

        'target_roles'
            => 'array',

        'target_departments'
            => 'array',

        'target_users'
            => 'array',

        'is_pinned'
            => 'boolean',

        'send_push'
            => 'boolean',

        'send_email'
            => 'boolean',

        'expires_at'
            => 'datetime',
    ];
}
