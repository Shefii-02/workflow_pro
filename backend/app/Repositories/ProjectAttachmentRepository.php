<?php

namespace App\Repositories;

use App\Models\ProjectAttachment;
use App\Models\TaskAttachment;

class ProjectAttachmentRepository
{
    public function create(array $data)
    {
        return ProjectAttachment::create($data);
    }

    public function find($id)
    {
        return ProjectAttachment::findOrFail($id);
    }

    public function listByProject($projectId)
    {
        return ProjectAttachment::where('project_id', $projectId)
            ->latest()
            ->get();
    }

    public function linkToTask($taskId, $attachmentId)
    {
        return TaskAttachment::create([
            'task_id' => $taskId,
            'project_attachment_id' => $attachmentId,
        ]);
    }

    public function removeFromTask($taskId, $attachmentId)
    {
        return TaskAttachment::where([
            'task_id' => $taskId,
            'project_attachment_id' => $attachmentId,
        ])->delete();
    }

    public function delete(ProjectAttachment $attachment)
    {
        return $attachment->delete();
    }
}
