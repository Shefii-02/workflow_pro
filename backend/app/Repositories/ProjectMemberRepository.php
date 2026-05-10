<?php

namespace App\Repositories;

use App\Models\Project;

class ProjectMemberRepository
{
    public function addMember(Project $project, $userId, $role)
    {

        $project->members()->syncWithoutDetaching([
            $userId => ['role' => $role]
        ]);

        return true;
    }

    public function removeMember(Project $project, $userId)
    {
        return $project->members()->detach($userId);
    }

    public function listMembers(Project $project)
    {
        return $project->members()->get();
    }

    public function updateRole(Project $project, $userId, $role)
    {
        return $project->members()->updateExistingPivot($userId, [
            'role' => $role
        ]);
    }
}
