<?php

namespace App\Services;

use App\Repositories\TaskRepository;
use App\DTOs\TaskDTO;
use Illuminate\Support\Facades\Auth;

class TaskService
{
    public function __construct(
        protected TaskRepository $repo
    ) {}

    public function list($projectId)
    {
        return $this->repo->listByProject($projectId);
    }

    public function create(TaskDTO $dto)
    {
        return $this->repo->create([
            ...(array) $dto,
            'created_by' => Auth::id(),
        ]);
    }

    public function show($id)
    {
        return $this->repo->find($id);
    }

    public function update($id, TaskDTO $dto)
    {
        $task = $this->repo->find($id);

        return $this->repo->update($task, (array) $dto);
    }

    public function changeStatus($id, $status)
    {
        $task = $this->repo->find($id);

        $task->update([
            'status' => $status
        ]);

        return $task;
    }

    public function delete($id)
    {
        $task = $this->repo->find($id);

        return $this->repo->delete($task);
    }
}
