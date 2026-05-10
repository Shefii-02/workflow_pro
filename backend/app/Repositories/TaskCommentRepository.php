<?php

namespace App\Repositories;

use App\Models\TaskComment;

class TaskCommentRepository
{
    public function list($taskId)
    {
        return TaskComment::with('user')
            ->where('task_id', $taskId)
            ->latest()
            ->paginate(20);
    }

    public function create(array $data)
    {
        return TaskComment::create($data);
    }

    public function find($taskId, $commentId)
    {
        return TaskComment::where('task_id', $taskId)
            ->where('id', $commentId)
            ->firstOrFail();
    }

    public function update(TaskComment $comment, array $data)
    {
        $comment->update($data);

        return $comment->refresh();
    }

    public function delete(TaskComment $comment)
    {
        return $comment->delete();
    }
}
