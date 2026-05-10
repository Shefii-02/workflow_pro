<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MeetingService;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    public function __construct(
        protected MeetingService $service
    ) {}

    /*
    |--------------------------------------------------------------------------
    | MEETINGS
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => $this->service->list(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',

            'starts_at' => 'required|date',

            'ends_at' => 'required|date',

            'platform' => 'required',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Meeting created',
            'data' => $this->service->create(
                $request->all()
            ),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'success' => true,
            'data' => $this->service->show($id),
        ]);
    }

    public function update(
        Request $request,
        $id
    ) {
        return response()->json([
            'success' => true,
            'message' => 'Meeting updated',
            'data' => $this->service->update(
                $id,
                $request->all()
            ),
        ]);
    }

    public function destroy($id)
    {
        $this->service->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Meeting deleted',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | PARTICIPANTS
    |--------------------------------------------------------------------------
    */

    public function participants($meetingId)
    {
        return response()->json([
            'success' => true,
            'data' => $this->service
                ->listParticipants($meetingId),
        ]);
    }

    public function addParticipant(
        Request $request,
        $meetingId
    ) {
        $request->validate([
            'user_id' => 'required|uuid',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Participant added',
            'data' => $this->service
                ->addParticipant(
                    $meetingId,
                    $request->all()
                ),
        ]);
    }

    public function removeParticipant(
        $meetingId,
        $participantId
    ) {
        $this->service->removeParticipant(
            $meetingId,
            $participantId
        );

        return response()->json([
            'success' => true,
            'message' => 'Participant removed',
        ]);
    }
}
