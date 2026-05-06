<?php

namespace App\Models;

use app\Models\BaseModel;

class Permission extends BaseModel
{
    protected $fillable = ['name','slug','module','action'];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_permissions');
    }
}
