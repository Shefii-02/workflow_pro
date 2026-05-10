<?php

namespace App\Services;

use Illuminate\Support\Str;
use App\Models\SupportTicket;
use App\Models\SupportTicketReply;
use App\Repositories\SupportTicketRepository;

class SupportTicketService
{
    public function __construct(
        protected SupportTicketRepository $repository
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

        $data['created_by']
            = auth()->id();

        $data['company_id']
            = auth()->user()->company_id;

        $data['ticket_number']
            = 'TKT-'
            . strtoupper(
                Str::random(8)
            );

        return $this->repository
            ->create($data);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        SupportTicket $ticket,
        array $data
    )
    {

        return $this->repository
            ->update(
                $ticket,
                $data
            );
    }

    /*
    |--------------------------------------------------------------------------
    | REPLY
    |--------------------------------------------------------------------------
    */

    public function reply(
        SupportTicket $ticket,
        array $data
    )
    {

        return SupportTicketReply::create([

            'ticket_id'
                => $ticket->id,

            'user_id'
                => auth()->id(),

            'message'
                => $data['message'],

            'attachments'
                => $data['attachments']
                ?? null,

            'is_internal'
                => $data['is_internal']
                ?? false,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | CLOSE
    |--------------------------------------------------------------------------
    */

    public function close(
        SupportTicket $ticket
    )
    {

        return $this->repository
            ->update(
                $ticket,
                [

                    'status'
                        => 'closed',

                    'closed_at'
                        => now(),
                ]
            );
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function delete(
        SupportTicket $ticket
    )
    {

        return $this->repository
            ->delete($ticket);
    }
}
