<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TaskService;
use App\DTOs\TaskDTO;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct(
        protected TaskService $service
    ) {}

    public function index($projectId)
    {
        return response()->json(
            $this->service->list($projectId)
        );
    }

    public function store(Request $request)
    {
        return response()->json(
            $this->service->create(
                TaskDTO::fromRequest($request)
            ),
            201
        );
    }

    public function show($id)
    {
        return response()->json(
            $this->service->show($id)
        );
    }

    public function update(Request $request, $id)
    {

        return response()->json(
            $this->service->update(
                $id,
                TaskDTO::fromRequest($request)
            )
        );
    }

    public function changeStatus(Request $request, $id)
    {
        return response()->json(
            $this->service->changeStatus(
                $id,
                $request->status
            )
        );
    }

    public function destroy($id)
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Task deleted'
        ]);
    }
}
