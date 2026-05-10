<?php

namespace App\Services;

use App\Models\Client;
use App\Models\CompanyClient;
use App\Repositories\ClientRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ClientService
{
    public function __construct(
        protected ClientRepository $repository,
        protected ActivityLogService $activityLogService,
    ) {}

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    public function create(
        array $data
    )
    {

        return DB::transaction(function () use (
            $data
        ) {

            /*
            |--------------------------------------------------------------------------
            | FIND EXISTING CLIENT
            |--------------------------------------------------------------------------
            */

            $client = Client::where(

                'email',
                $data['email']

            )->orWhere(

                'phone',
                $data['mobile']
                ?? null

            )->first();

            /*
            |--------------------------------------------------------------------------
            | CREATE CLIENT
            |--------------------------------------------------------------------------
            */

            if (!$client) {

                /*
                |--------------------------------------------------------------------------
                | AVATAR
                |--------------------------------------------------------------------------
                */

                if (
                    isset($data['avatar'])
                ) {

                    $data['avatar']
                        = $data['avatar']
                        ->store(
                            'clients/avatar',
                            'public'
                        );
                }

                $client = $this->repository
                    ->create([

                        'name'
                            => $data['name'],

                        'email'
                            => $data['email'],

                        'phone'
                            => $data['mobile']
                            ?? null,

                        'address'
                            => $data['address']
                            ?? null,

                        'city'
                            => $data['city']
                            ?? null,

                        'country'
                            => $data['country']
                            ?? null,

                        'state'
                            => $data['state']
                            ?? null,

                        'avatar'
                            => $data['avatar']
                            ?? null,

                        'status'
                            => $data['status']
                            ?? 'active',

                        'company_name'
                            => $data['company_name']
                            ?? null,
                    ]);
            }

            /*
            |--------------------------------------------------------------------------
            | CHECK ALREADY ATTACHED
            |--------------------------------------------------------------------------
            */

            $alreadyAttached
                = CompanyClient::where(

                    'company_id',
                    auth()->user()->company_id

                )
                ->where(
                    'client_id',
                    $client->id
                )
                ->exists();

            if (!$alreadyAttached) {

                /*
                |--------------------------------------------------------------------------
                | ATTACH COMPANY
                |--------------------------------------------------------------------------
                */

                CompanyClient::create([

                    'company_id'
                        => auth()->user()->company_id,

                    'client_id'
                        => $client->id,

                    'status'
                        => 'active',

                    'created_by'
                        => auth()->id(),

                    'joined_at'
                        => now(),
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | ACTIVITY LOG
            |--------------------------------------------------------------------------
            */

            $this->activityLogService
                ->log(

                    action: 'created',

                    module: 'client',

                    referenceId: $client->id,

                    newValue: $client->toArray()
                );

            return $client;
        });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Client $client,
        array $data
    )
    {

        return DB::transaction(function () use (
            $client,
            $data
        ) {

            $old = $client->toArray();

            /*
            |--------------------------------------------------------------------------
            | AVATAR
            |--------------------------------------------------------------------------
            */

            if (
                isset($data['avatar'])
            ) {

                if ($client->avatar) {

                    Storage::disk('public')
                        ->delete(
                            $client->avatar
                        );
                }

                $data['avatar']
                    = $data['avatar']
                    ->store(
                        'clients/avatar',
                        'public'
                    );
            }

            $client = $this->repository
                ->update(
                    $client,
                    $data
                );

            /*
            |--------------------------------------------------------------------------
            | ACTIVITY LOG
            |--------------------------------------------------------------------------
            */

            $this->activityLogService
                ->log(

                    action: 'updated',

                    module: 'client',

                    referenceId: $client->id,

                    oldValue: $old,

                    newValue: $client->toArray()
                );

            return $client;
        });
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function delete(
        Client $client
    )
    {

        $old = $client->toArray();

        $this->repository
            ->delete($client);

        $this->activityLogService
            ->log(

                action: 'deleted',

                module: 'client',

                referenceId: $client->id,

                oldValue: $old
            );
    }
}
