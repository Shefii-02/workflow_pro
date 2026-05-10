<?php

namespace App\Repositories;

use App\Models\TaskTimeLog;

class TaskTimeLogRepository
{
    public function getRunning($taskId, $userId)
    {
        return TaskTimeLog::where('task_id', $taskId)
            ->where('user_id', $userId)
            ->whereIn('status', ['running', 'paused'])
            ->latest()
            ->first();
    }

    public function create(array $data)
    {
        return TaskTimeLog::create($data);
    }

    public function update(TaskTimeLog $log, array $data)
    {
        $log->update($data);

        return $log->refresh();
    }

    public function list($taskId)
    {
        return TaskTimeLog::with('user')
            ->where('task_id', $taskId)
            ->latest()
            ->get();
    }
}
