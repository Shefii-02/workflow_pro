<?php

namespace App\Services;

use App\Models\Project;
use App\Repositories\ProjectAttachmentRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProjectAttachmentService
{
    public function __construct(
        protected ProjectAttachmentRepository $repo
    ) {}

    public function upload($request)
    {

        $project = Project::findOrFail($request->project_id);

        $file = $request->file('file');

        $path = $file->store('project-attachments', 'public');

        return $this->repo->create([
            'company_id' => Auth::user()->company_id,

            'project_id' => $project->id,

            'uploaded_by' => Auth::id(),

            'file_name' => basename($path),

            'original_name' => $file->getClientOriginalName(),

            'file_url' => Storage::url($path),

            'disk' => 'public',

            'mime_type' => $file->getMimeType(),

            'file_size' => $file->getSize(),
        ]);
    }

    public function list($projectId)
    {
        return $this->repo->listByProject($projectId);
    }

    public function attachToTask($taskId, $attachmentId)
    {
        return $this->repo->linkToTask(
            $taskId,
            $attachmentId
        );
    }

    public function detachFromTask($taskId, $attachmentId)
    {
        return $this->repo->removeFromTask(
            $taskId,
            $attachmentId
        );
    }

    public function delete($id)
    {
        $attachment = $this->repo->find($id);

        Storage::disk($attachment->disk)
            ->delete(
                'project-attachments/' .
                $attachment->file_name
            );

        return $this->repo->delete($attachment);
    }
}
