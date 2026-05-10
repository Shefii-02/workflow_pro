<?php

namespace App\Services;

use App\Models\Meeting;
use App\Repositories\MeetingRepository;
use Illuminate\Support\Facades\Auth;

class MeetingService
{
    public function __construct(
        protected MeetingRepository $repo
    ) {}

    /*
    |--------------------------------------------------------------------------
    | MEETINGS
    |--------------------------------------------------------------------------
    */

    public function list()
    {
        return $this->repo->list();
    }

    public function create(array $data)
    {
        return $this->repo->create([
            'company_id' => Auth::user()->company_id,

            'created_by' => Auth::id(),

            'project_id' => $data['project_id'] ?? null,

            'title' => $data['title'],

            'description' => $data['description'] ?? null,

            'starts_at' => $data['starts_at'],

            'ends_at' => $data['ends_at'],

            'platform' => $data['platform'],

            'meeting_link' => $data['meeting_link'] ?? null,

            'status' => 'scheduled',
        ]);
    }

    public function show($id)
    {
        return $this->repo->find($id);
    }

    public function update($id, array $data)
    {
        $meeting = $this->repo->find($id);

        return $this->repo->update($meeting, $data);
    }

    public function delete($id)
    {
        $meeting = $this->repo->find($id);

        return $this->repo->delete($meeting);
    }

    /*
    |--------------------------------------------------------------------------
    | PARTICIPANTS
    |--------------------------------------------------------------------------
    */

    public function addParticipant(
        $meetingId,
        array $data
    ) {
        return $this->repo->addParticipant([
            'meeting_id' => $meetingId,

            'user_id' => $data['user_id'],

            'rsvp' => 'pending',
        ]);
    }

    public function listParticipants($meetingId)
    {
        return $this->repo->listParticipants(
            $meetingId
        );
    }

    public function removeParticipant(
        $meetingId,
        $participantId
    ) {
        return $this->repo->removeParticipant(
            $meetingId,
            $participantId
        );
    }
}
