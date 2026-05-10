<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProjectAttachmentService;
use Illuminate\Http\Request;

class ProjectAttachmentController extends Controller
{
    public function __construct(
        protected ProjectAttachmentService $service
    ) {}

    public function upload(Request $request)
    {


        $request->validate([
            'project_id' => 'required|uuid',
            'file' => 'required|file|max:20480',
        ]);

        return response()->json(
            $this->service->upload($request)
        );
    }

    public function index($projectId)
    {
        return response()->json(
            $this->service->list($projectId)
        );
    }

    public function attachToTask(Request $request)
    {
        $request->validate([
            'task_id' => 'required|uuid',
            'attachment_id' => 'required|uuid',
        ]);

        return response()->json(
            $this->service->attachToTask(
                $request->task_id,
                $request->attachment_id
            )
        );
    }

    public function detachFromTask(Request $request)
    {
        $request->validate([
            'task_id' => 'required|uuid',
            'attachment_id' => 'required|uuid',
        ]);

        return response()->json(
            $this->service->detachFromTask(
                $request->task_id,
                $request->attachment_id
            )
        );
    }

    public function destroy($id)
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Attachment deleted'
        ]);
    }
}
