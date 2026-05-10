<?php

namespace App\Repositories;

use App\Models\ProjectTask;

class TaskRepository
{
    public function listByProject($projectId)
    {
        return ProjectTask::where('project_id', $projectId)
            ->with(['assignee', 'subtasks'])
            ->latest()
            ->paginate(20);
    }

    public function find($id)
    {
        return ProjectTask::with(['assignee', 'subtasks'])
            ->findOrFail($id);
    }

    public function create(array $data)
    {
        return ProjectTask::create($data);
    }

    public function update(ProjectTask $task, array $data)
    {
        $task->update($data);
        return $task;
    }

    public function delete(ProjectTask $task)
    {
        return $task->delete();
    }
}
