<?php

namespace App\Repositories;

use App\Models\Meeting;
use App\Models\MeetingParticipant;

class MeetingRepository
{
    /*
    |--------------------------------------------------------------------------
    | MEETINGS
    |--------------------------------------------------------------------------
    */

    public function list()
    {
        return Meeting::with([
            'project',
            'creator',
            'participants.user'
        ])
        ->latest()
        ->paginate(20);
    }

    public function create(array $data)
    {
        return Meeting::create($data);
    }

    public function find($id)
    {
        return Meeting::with([
            'project',
            'creator',
            'participants.user'
        ])
        ->findOrFail($id);
    }

    public function update(Meeting $meeting, array $data)
    {
        $meeting->update($data);

        return $meeting->refresh();
    }

    public function delete(Meeting $meeting)
    {
        return $meeting->delete();
    }

    /*
    |--------------------------------------------------------------------------
    | PARTICIPANTS
    |--------------------------------------------------------------------------
    */

    public function addParticipant(array $data)
    {
        return MeetingParticipant::create($data);
    }

    public function listParticipants($meetingId)
    {
        return MeetingParticipant::with('user')
            ->where('meeting_id', $meetingId)
            ->get();
    }

    public function removeParticipant(
        $meetingId,
        $participantId
    ) {
        return MeetingParticipant::where(
            'meeting_id',
            $meetingId
        )
        ->where('id', $participantId)
        ->delete();
    }
}
