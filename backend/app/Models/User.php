<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, HasUuids;

    protected $table = 'users';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $guarded = [];

    protected $hidden = [
        'password',
        'two_fa_secret',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'email_verified' => 'boolean',
        'two_fa_enabled' => 'boolean',
        'last_login_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | AUTH OVERRIDE (IMPORTANT)
    |--------------------------------------------------------------------------
    */

    public function getAuthPassword()
    {
        return $this->password;
    }

    /*
    |--------------------------------------------------------------------------
    | JWT METHODS
    |--------------------------------------------------------------------------
    */

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'company_id' => $this->company_id,
            'role' => $this->role,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    // Company
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    // Roles (RBAC)
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    // Permissions (through roles)
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permissions', 'role_id', 'permission_id')
            ->join('user_roles', 'user_roles.role_id', '=', 'role_permissions.role_id')
            ->where('user_roles.user_id', $this->id)
            ->select('permissions.*')
            ->distinct();
    }

    // Projects (many-to-many)
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_members')
            ->withPivot('role')
            ->withTimestamps();
    }

    // Created Projects
    public function createdProjects()
    {
        return $this->hasMany(Project::class, 'created_by');
    }

    // Assigned Tasks
    public function tasks()
    {
        return $this->hasMany(ProjectTask::class, 'assigned_to');
    }

    // Created Tasks
    public function createdTasks()
    {
        return $this->hasMany(ProjectTask::class, 'created_by');
    }

    // Task Comments
    public function taskComments()
    {
        return $this->hasMany(TaskComment::class);
    }

    // Attachments
    public function attachments()
    {
        return $this->hasMany(TaskAttachment::class, 'uploaded_by');
    }

    // Time Logs
    public function timeLogs()
    {
        return $this->hasMany(TimeLogged::class);
    }

    // Attendance
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    // Leaves
    public function leaves()
    {
        return $this->hasMany(Leave::class);
    }

    // Approved Leaves
    public function approvedLeaves()
    {
        return $this->hasMany(Leave::class, 'approved_by');
    }

    // Meetings Created
    public function meetings()
    {
        return $this->hasMany(Meeting::class, 'created_by');
    }

    // Meeting Participation
    public function meetingParticipations()
    {
        return $this->belongsToMany(Meeting::class, 'meeting_participants')
            ->withPivot('rsvp', 'responded_at');
    }

    // Tickets Created
    public function ticketsCreated()
    {
        return $this->hasMany(Ticket::class, 'created_by');
    }

    // Tickets Assigned
    public function ticketsAssigned()
    {
        return $this->hasMany(Ticket::class, 'assigned_to');
    }

    // Chat Participation
    public function chats()
    {
        return $this->belongsToMany(Chat::class, 'chat_participants')
            ->withPivot('last_read_at', 'joined_at');
    }

    // Messages Sent
    public function messages()
    {
        return $this->hasMany(ChatMessage::class, 'sender_id');
    }

    // Notifications
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    // Activity Logs
    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }

    // Sticky Notes
    public function stickyNotes()
    {
        return $this->hasMany(StickyNote::class);
    }

    /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */

    // Active users
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Company filter (multi-tenant)
    public function scopeOfCompany($query, $companyId)
    {
        return $query->where('company_id', $companyId);
    }

    /*
    |--------------------------------------------------------------------------
    | HELPER METHODS
    |--------------------------------------------------------------------------
    */

    public function hasRole($role)
    {
        return $this->roles()->where('slug', $role)->exists();
    }

    public function hasPermission($permission)
    {
        return $this->permissions()->where('slug', $permission)->exists();
    }


    public function projectNotes()
    {
        return $this->hasMany(
            ProjectNote::class,
            'created_by'
        );
    }

    public function createdEstimates()
    {
        return $this->hasMany(
            ProjectEstimate::class,
            'created_by'
        );
    }

    public function clientEstimates()
    {
        return $this->hasMany(
            ProjectEstimate::class,
            'client_id'
        );
    }

    public function companies()
    {
        return $this->belongsToMany(

            Company::class,

            'company_users'
        )
            ->withPivot([

                'designation',

                'employee_code',

                'salary',

                'status',
            ]);
    }
}
