<?php

namespace App\Repositories;

use App\Models\SupportTicket;

class SupportTicketRepository
{
    public function getAll()
    {
        return SupportTicket::with([
            'creator',
            'assignedUser',
        ])
        ->latest()
        ->paginate(20);
    }

    public function create(
        array $data
    )
    {
        return SupportTicket::create($data);
    }

    public function update(
        SupportTicket $ticket,
        array $data
    )
    {
        $ticket->update($data);

        return $ticket->fresh();
    }

    public function delete(
        SupportTicket $ticket
    )
    {
        return $ticket->delete();
    }
}
