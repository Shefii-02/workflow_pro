<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProjectMemberService;
use Illuminate\Http\Request;

class ProjectMemberController extends Controller
{
    public function __construct(
        protected ProjectMemberService $service
    ) {}

    public function index($projectId)
    {
        return response()->json(
            $this->service->list($projectId)
        );
    }

    public function store(Request $request, $projectId)
    {
        return response()->json(
            $this->service->add(
                $projectId,
                $request->user_id,
                $request->role ?? 'member'
            )
        );
    }

    public function update(Request $request, $projectId, $userId)
    {
        return response()->json(
            $this->service->updateRole(
                $projectId,
                $userId,
                $request->role
            )
        );
    }

    public function destroy($projectId, $userId)
    {
        return response()->json(
            $this->service->remove($projectId, $userId)
        );
    }
}
