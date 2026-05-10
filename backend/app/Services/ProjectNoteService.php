<?php

namespace App\Services;

use App\Repositories\ProjectNoteRepository;

use Illuminate\Support\Facades\Auth;

class ProjectNoteService
{
    public function __construct(
        protected ProjectNoteRepository $repo
    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST
    |--------------------------------------------------------------------------
    */

    public function list($projectId)
    {
        return $this->repo->list($projectId);
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    public function create(
        $projectId,
        array $data
    ) {
        return $this->repo->create([

            'company_id' => Auth::user()->company_id,

            'project_id' => $projectId,

            'created_by' => Auth::id(),

            'title' => $data['title'],

            'content' => $data['content'],

            'is_pinned' => $data['is_pinned'] ?? false,

            'is_private' => $data['is_private'] ?? false,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show($id)
    {
        return $this->repo->find($id);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update($id, array $data)
    {
        $note = $this->repo->find($id);

        return $this->repo->update(
            $note,
            $data
        );
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function delete($id)
    {
        $note = $this->repo->find($id);

        return $this->repo->delete($note);
    }

    /*
    |--------------------------------------------------------------------------
    | PIN / UNPIN
    |--------------------------------------------------------------------------
    */

    public function togglePin($id)
    {
        $note = $this->repo->find($id);

        return $this->repo->update($note, [
            'is_pinned' => !$note->is_pinned
        ]);
    }
}
