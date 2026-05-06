<?php

namespace App\Models;

use app\Models\BaseModel;

class Role extends BaseModel
{
    protected $fillable = ['name','slug'];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permissions');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_roles');
    }
}
