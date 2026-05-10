<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TaskCommentService;
use Illuminate\Http\Request;

class TaskCommentController extends Controller
{
    public function __construct(
        protected TaskCommentService $service
    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST COMMENTS
    |--------------------------------------------------------------------------
    */

    public function index($taskId)
    {
        return response()->json([
            'success' => true,
            'data' => $this->service->list($taskId),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE COMMENT
    |--------------------------------------------------------------------------
    */

    public function store(Request $request, $taskId)
    {
        $request->validate([
            'content' => ['required', 'string'],
        ]);

        $comment = $this->service->create(
            $taskId,
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'Comment added successfully',
            'data' => $comment,
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE COMMENT
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        $taskId,
        $commentId
    ) {
        $request->validate([
            'content' => ['required', 'string'],
        ]);

        $comment = $this->service->update(
            $taskId,
            $commentId,
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'Comment updated successfully',
            'data' => $comment,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE COMMENT
    |--------------------------------------------------------------------------
    */

    public function destroy($taskId, $commentId)
    {
        $this->service->delete(
            $taskId,
            $commentId
        );

        return response()->json([
            'success' => true,
            'message' => 'Comment deleted successfully',
        ]);
    }
}
