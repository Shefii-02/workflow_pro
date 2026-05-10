<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProjectNoteService;

use Illuminate\Http\Request;

class ProjectNoteController extends Controller
{
    public function __construct(
        protected ProjectNoteService $service
    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST
    |--------------------------------------------------------------------------
    */

    public function index($projectId)
    {
        return response()->json([
            'success' => true,
            'data' => $this->service
                ->list($projectId),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STORE
    |--------------------------------------------------------------------------
    */

    public function store(
        Request $request,
        $projectId
    ) {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Note created',
            'data' => $this->service
                ->create(
                    $projectId,
                    $request->all()
                ),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show($id)
    {
        return response()->json([
            'success' => true,
            'data' => $this->service
                ->show($id),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        $id
    ) {
        return response()->json([
            'success' => true,
            'message' => 'Note updated',
            'data' => $this->service
                ->update(
                    $id,
                    $request->all()
                ),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy($id)
    {
        $this->service->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Note deleted',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | PIN / UNPIN
    |--------------------------------------------------------------------------
    */

    public function togglePin($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Pin status updated',
            'data' => $this->service
                ->togglePin($id),
        ]);
    }
}
