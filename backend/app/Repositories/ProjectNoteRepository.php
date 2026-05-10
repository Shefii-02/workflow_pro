<?php

namespace App\Repositories;

use App\Models\ProjectNote;

class ProjectNoteRepository
{
    /*
    |--------------------------------------------------------------------------
    | LIST NOTES
    |--------------------------------------------------------------------------
    */

    public function list($projectId)
    {
        return ProjectNote::with([
            'creator'
        ])
        ->where('project_id', $projectId)
        ->orderByDesc('is_pinned')
        ->latest()
        ->paginate(20);
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    public function create(array $data)
    {
        return ProjectNote::create($data);
    }

    /*
    |--------------------------------------------------------------------------
    | FIND
    |--------------------------------------------------------------------------
    */

    public function find($id)
    {
        return ProjectNote::with([
            'creator',
            'project'
        ])
        ->findOrFail($id);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        ProjectNote $note,
        array $data
    ) {
        $note->update($data);

        return $note->refresh();
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function delete(ProjectNote $note)
    {
        return $note->delete();
    }
}
