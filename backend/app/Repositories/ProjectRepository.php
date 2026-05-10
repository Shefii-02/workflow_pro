<?php
namespace App\Repositories;

use App\Models\Project;

class ProjectRepository
{
    public function list($companyId)
    {
        return Project::where('company_id', $companyId)
            ->latest()
            ->paginate(10);
    }

    public function find($id, $companyId)
    {
        return Project::where('company_id', $companyId)
            ->where('id', $id)
            ->firstOrFail();
    }

    public function create(array $data)
    {
        return Project::create($data);
    }

    public function update(Project $project, array $data)
    {
        $project->update($data);
        return $project;
    }

    public function delete(Project $project)
    {
        return $project->delete(); // soft delete
    }
}
