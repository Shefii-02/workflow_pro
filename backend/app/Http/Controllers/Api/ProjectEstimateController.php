<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\Estimate\StoreProjectEstimateRequest;
use App\Http\Requests\Project\Estimate\UpdateProjectEstimateRequest;
use App\Http\Requests\Project\Invoice\SendInvoiceRequest;
use App\Models\Invoice;
use App\Models\Project;
use App\Models\ProjectEstimate;
use App\Services\EstimateService;
use App\Services\InvoiceDeliveryService;
use Illuminate\Http\JsonResponse;

class ProjectEstimateController extends Controller
{
    public function __construct(
        protected EstimateService $service,
        protected InvoiceDeliveryService $deliveryService

    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST
    |--------------------------------------------------------------------------
    */

    public function index(Project $project): JsonResponse
    {
        $estimates = ProjectEstimate::with([
            'items',
            'client',
            'creator',
        ])
            ->where('project_id', $project->id)
            ->latest()
            ->paginate(20);

        return response()->json([

            'success' => true,

            'message' => 'Estimates fetched successfully',

            'data' => $estimates,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STORE
    |--------------------------------------------------------------------------
    */

    public function store(
        StoreProjectEstimateRequest $request,
        Project $project
    ): JsonResponse {

        $estimate = $this->service->create(
            $project,
            $request->validated()
        );


        return response()->json([

            'success' => true,

            'message' => 'Estimate created successfully',

            'data' => $estimate,
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show(
        ProjectEstimate $estimate
    ): JsonResponse {

        $estimate->load([
            'items',
            'client',
            'creator',
            'project',
        ]);

        return response()->json([

            'success' => true,

            'message' => 'Estimate fetched successfully',

            'data' => $estimate,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        UpdateProjectEstimateRequest $request,
        ProjectEstimate $estimate
    ): JsonResponse {

        $estimate = $this->service->update(
            $estimate,
            $request->validated()
        );

        return response()->json([

            'success' => true,

            'message' => 'Estimate updated successfully',

            'data' => $estimate,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        ProjectEstimate $estimate
    ): JsonResponse {

        $estimate->delete();

        return response()->json([

            'success' => true,

            'message' => 'Estimate deleted successfully',
        ]);
    }

    public function sendEmail(
        SendInvoiceRequest $request,
        Invoice $invoice
    ) {

        $this->deliveryService
            ->sendEmail(
                $invoice,
                $request->validated()
            );

        return response()->json([

            'success' => true,

            'message'
            => 'Invoice emailed successfully',
        ]);
    }
    public function sendWhatsapp(
        SendInvoiceRequest $request,
        Invoice $invoice
    ) {

        $response = $this->deliveryService
            ->sendWhatsapp(
                $invoice,
                $request->validated()
            );

        return response()->json([

            'success' => true,

            'message'
            => 'Invoice sent successfully',

            'response'
            => $response,
        ]);
    }
}
