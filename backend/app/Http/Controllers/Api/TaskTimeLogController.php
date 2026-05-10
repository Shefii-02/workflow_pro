<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TaskTimeLogService;

class TaskTimeLogController extends Controller
{
    public function __construct(
        protected TaskTimeLogService $service
    ) {}

    public function start($taskId)
    {
        return response()->json([
            'success' => true,
            'message' => 'Timer started',
            'data' => $this->service->start($taskId),
        ]);
    }

    public function pause($taskId)
    {
        return response()->json([
            'success' => true,
            'message' => 'Timer paused',
            'data' => $this->service->pause($taskId),
        ]);
    }

    public function resume($taskId)
    {
        return response()->json([
            'success' => true,
            'message' => 'Timer resumed',
            'data' => $this->service->resume($taskId),
        ]);
    }

    public function stop($taskId)
    {
        return response()->json([
            'success' => true,
            'message' => 'Timer stopped',
            'data' => $this->service->stop($taskId),
        ]);
    }

    public function index($taskId)
    {
        return response()->json([
            'success' => true,
            'data' => $this->service->list($taskId),
        ]);
    }
}
