<?php

namespace App\Repositories;

use App\Models\Client;

class ClientRepository
{
    public function list()
    {
        return Client::latest()
            ->paginate(20);
    }

    public function create(
        array $data
    )
    {
        return Client::create($data);
    }

    public function update(
        Client $client,
        array $data
    )
    {
        $client->update($data);

        return $client->fresh();
    }

    public function delete(
        Client $client
    )
    {
        return $client->delete();
    }
}
