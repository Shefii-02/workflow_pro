<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\Invoice\SendInvoiceRequest;
use App\Http\Requests\Project\Invoice\UpdateInvoiceRequest;
use App\Http\Requests\Project\Invoice\StoreInvoiceRequest;
use App\Models\Invoice;
use App\Models\ProjectEstimate;
use App\Services\InvoiceService;
use App\Services\InvoiceDeliveryService;

class InvoiceController extends Controller
{
    public function __construct(
        protected InvoiceService $service,
        protected InvoiceDeliveryService $deliveryService
    ) {}

    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Invoice::with('items')
                ->latest()
                ->paginate(20),
        ]);
    }

    public function store(
        StoreInvoiceRequest $request
    ) {

        return response()->json([

            'success' => true,

            'data'
            => $this->service->create(
                $request->validated()
            ),
        ]);
    }

    public function show(Invoice $invoice)
    {
        return response()->json([

            'success' => true,

            'data'
            => $invoice->load([
                'items',
                'client',
                'project',
                'estimate',
            ]),
        ]);
    }

    public function update(
        UpdateInvoiceRequest $request,
        Invoice $invoice
    ) {

        return response()->json([

            'success' => true,

            'data'
            => $this->service->update(
                $invoice,
                $request->validated()
            ),
        ]);
    }

    public function destroy(
        Invoice $invoice
    ) {

        $invoice->delete();

        return response()->json([

            'success' => true,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | CONVERT
    |--------------------------------------------------------------------------
    */

    public function convertEstimate(
        ProjectEstimate $estimate
    ) {

        return response()->json([

            'success' => true,

            'message'
            => 'Invoice created successfully',

            'data'
            => $this->service
                ->convertEstimate(
                    $estimate
                ),
        ]);
    }

    public function markPaid(
        Invoice $invoice
    ) {

        $invoice = $this->deliveryService
            ->markPaid(
                $invoice,
                request()->all()
            );

        return response()->json([

            'success' => true,

            'message'
            => 'Invoice marked paid',

            'data'
            => $invoice,
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
