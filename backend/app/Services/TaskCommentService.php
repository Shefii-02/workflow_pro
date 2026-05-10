<?php

namespace App\Services;

use App\Models\ProjectTask;
use App\Repositories\TaskCommentRepository;
use Illuminate\Support\Facades\Auth;

class TaskCommentService
{
    public function __construct(
        protected TaskCommentRepository $repo
    ) {}

    public function list($taskId)
    {
        ProjectTask::findOrFail($taskId);

        return $this->repo->list($taskId);
    }

    public function create($taskId, array $data)
    {
        ProjectTask::findOrFail($taskId);

        return $this->repo->create([
            'task_id' => $taskId,
            'user_id' => Auth::id(),
            'content' => $data['content'],
        ]);
    }

    public function update($taskId, $commentId, array $data)
    {
        $comment = $this->repo->find($taskId, $commentId);

        $comment = $this->repo->update($comment, [
            'content' => $data['content'],
            'is_edited' => true,
        ]);

        return $comment;
    }

    public function delete($taskId, $commentId)
    {
        $comment = $this->repo->find($taskId, $commentId);

        return $this->repo->delete($comment);
    }
}
