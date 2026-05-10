<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\SupportTicket;
use App\Services\SupportTicketService;
use App\Http\Controllers\Controller;
use App\Repositories\SupportTicketRepository;

class SupportTicketController extends Controller
{
    public function __construct(
        protected SupportTicketRepository $repository,
        protected SupportTicketService $service,
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
                => $this->repository
                    ->getAll(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STORE
    |--------------------------------------------------------------------------
    */

    public function store(
        Request $request
    )
    {

        $ticket = $this->service
            ->create(
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Ticket created successfully',

            'data'
                => $ticket,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show(
        SupportTicket $ticket
    )
    {

        return response()->json([

            'success' => true,

            'data'
                => $ticket->load([
                    'creator',
                    'assignedUser',
                    'replies.user',
                ]),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        SupportTicket $ticket
    )
    {

        $ticket = $this->service
            ->update(
                $ticket,
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Ticket updated successfully',

            'data'
                => $ticket,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | REPLY
    |--------------------------------------------------------------------------
    */

    public function reply(
        Request $request,
        SupportTicket $ticket
    )
    {

        $reply = $this->service
            ->reply(
                $ticket,
                $request->all()
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Reply added successfully',

            'data'
                => $reply,
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

        $ticket = $this->service
            ->close($ticket);

        return response()->json([

            'success' => true,

            'message'
                => 'Ticket closed successfully',

            'data'
                => $ticket,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        SupportTicket $ticket
    )
    {

        $this->service
            ->delete($ticket);

        return response()->json([

            'success' => true,

            'message'
                => 'Ticket deleted successfully',
        ]);
    }
}
