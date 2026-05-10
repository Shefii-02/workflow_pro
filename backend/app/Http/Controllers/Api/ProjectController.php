<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use App\Services\ProjectOverviewService;
use App\Services\ProjectService;

class ProjectController extends Controller
{
    protected $service;
    protected $serviceOverview;

    public function __construct(ProjectService $service,ProjectOverviewService $serviceOverview)
    {
        $this->service = $service;
        $this->serviceOverview = $serviceOverview;

    }

    public function index()
    {

        return response()->json($this->service->list());
    }

    public function store(StoreProjectRequest $request)
    {
        $project = $this->service->create($request->validated());

        return response()->json($project, 201);
    }

    public function show($id)
    {
        $project = $this->service->get($id);
        return response()->json($project);
    }

    public function update(UpdateProjectRequest $request, $id)
    {
        $project = $this->service->update($id, $request->validated());

        return response()->json($project);
    }

    public function destroy($id)
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Project deleted'
        ]);
    }


     public function overview(
        Project $project
    ) {

        return response()->json([

            'success' => true,

            'data'
                => $this->serviceOverview
                    ->overview($project),
        ]);
    }
}
