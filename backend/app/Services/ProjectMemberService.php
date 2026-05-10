<?php

namespace App\Services;

use App\Repositories\ProjectMemberRepository;
use App\Models\Project;

class ProjectMemberService
{
    public function __construct(
        protected ProjectMemberRepository $repo
    ) {}

    public function add($projectId, $userId, $role)
    {
        $project = Project::findOrFail($projectId);

        $this->repo->addMember($project, $userId, $role);

        return ['message' => 'Member added'];
    }

    public function remove($projectId, $userId)
    {
        $project = Project::findOrFail($projectId);

        $this->repo->removeMember($project, $userId);

        return ['message' => 'Member removed'];
    }

    public function list($projectId)
    {
        $project = Project::findOrFail($projectId);

        return $this->repo->listMembers($project);
    }

    public function updateRole($projectId, $userId, $role)
    {
        $project = Project::findOrFail($projectId);

        $this->repo->updateRole($project, $userId, $role);

        return ['message' => 'Role updated'];
    }
}
