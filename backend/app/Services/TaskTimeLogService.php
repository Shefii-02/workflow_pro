<?php

namespace App\Services;

use App\Models\ProjectTask;
use App\Repositories\TaskTimeLogRepository;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class TaskTimeLogService
{
    public function __construct(
        protected TaskTimeLogRepository $repo
    ) {}

    /*
    |--------------------------------------------------------------------------
    | START TIMER
    |--------------------------------------------------------------------------
    */

    public function start($taskId)
    {
        $task = ProjectTask::findOrFail($taskId);

        $existing = $this->repo->getRunning(
            $taskId,
            Auth::id()
        );

        if ($existing) {
            throw new \Exception(
                'Timer already running or paused'
            );
        }

        return $this->repo->create([
            'company_id' => Auth::user()->company_id,

            'project_id' => $task->project_id,

            'task_id' => $task->id,

            'user_id' => Auth::id(),

            'started_at' => now(),

            'status' => 'running',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | PAUSE TIMER
    |--------------------------------------------------------------------------
    */

    public function pause($taskId)
    {
        $log = $this->repo->getRunning(
            $taskId,
            Auth::id()
        );

        if (!$log || $log->status !== 'running') {
            throw new \Exception(
                'No running timer found'
            );
        }

        $worked = now()->diffInSeconds(
            Carbon::parse($log->started_at)
        );

        return $this->repo->update($log, [
            'paused_at' => now(),

            'worked_seconds' =>
                $log->worked_seconds + $worked,

            'status' => 'paused',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | RESUME TIMER
    |--------------------------------------------------------------------------
    */

    public function resume($taskId)
    {
        $log = $this->repo->getRunning(
            $taskId,
            Auth::id()
        );

        if (!$log || $log->status !== 'paused') {
            throw new \Exception(
                'No paused timer found'
            );
        }

        return $this->repo->update($log, [
            'started_at' => now(),

            'paused_at' => null,

            'status' => 'running',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STOP TIMER
    |--------------------------------------------------------------------------
    */

    public function stop($taskId)
    {
        $log = $this->repo->getRunning(
            $taskId,
            Auth::id()
        );

        if (!$log) {
            throw new \Exception(
                'No active timer found'
            );
        }

        $worked = 0;

        if ($log->status === 'running') {

            $worked = now()->diffInSeconds(
                Carbon::parse($log->started_at)
            );
        }

        return $this->repo->update($log, [

            'ended_at' => now(),

            'worked_seconds' =>
                $log->worked_seconds + $worked,

            'status' => 'completed',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | LIST TIME LOGS
    |--------------------------------------------------------------------------
    */

    public function list($taskId)
    {
        return $this->repo->list($taskId);
    }
}
