<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Requests\Client\UpdateClientRequest;
use App\Models\Client;
use App\Models\CompanyClient;
use App\Services\ClientService;

class ClientController extends Controller
{
    public function __construct(
        protected ClientService $service
    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        return response()->json([

            'success' => true,

            'data'
                => Client::latest()
                    ->paginate(20),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STORE
    |--------------------------------------------------------------------------
    */

    public function store(
        StoreClientRequest $request
    )
    {

        $client = $this->service
            ->create(
                $request->validated()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Client created successfully',

            'data'
                => $client,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show(
        Client $client
    )
    {

        return response()->json([

            'success' => true,

            'data'
                => $client,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        UpdateClientRequest $request,
        Client $client
    )
    {

        $client = $this->service
            ->update(
                $client,
                $request->validated()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Client updated successfully',

            'data'
                => $client,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Client $client
    )
    {

        $this->service
            ->delete($client);

        return response()->json([

            'success' => true,

            'message'
                => 'Client deleted successfully',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | COMPANY CLIENTS
    |--------------------------------------------------------------------------
    */

    public function companyClients()
    {

        $clients = CompanyClient::with([
            'client',
        ])
        ->where(
            'company_id',
            auth()->user()->company_id
        )
        ->latest()
        ->paginate(20);

        return response()->json([

            'success' => true,

            'data'
                => $clients,
        ]);
    }
}
