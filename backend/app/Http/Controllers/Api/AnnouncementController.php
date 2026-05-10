<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index()
    {

        return response()->json([

            'success' => true,

            'data'
                => Announcement::latest()
                ->paginate(20),
        ]);
    }

    public function store(
        Request $request
    )
    {

        $announcement
            = Announcement::create([

                'company_id'
                    => auth()->user()->company_id,

                'created_by'
                    => auth()->id(),

                'title'
                    => $request->title,

                'content'
                    => $request->content,

                'visibility'
                    => $request->visibility
                    ?? 'all',

                'target_roles'
                    => $request->target_roles,

                'target_departments'
                    => $request->target_departments,

                'target_users'
                    => $request->target_users,

                'is_pinned'
                    => $request->is_pinned
                    ?? false,

                'expires_at'
                    => $request->expires_at,

                'send_push'
                    => $request->send_push
                    ?? false,

                'send_email'
                    => $request->send_email
                    ?? false,
            ]);

        return response()->json([

            'success' => true,

            'message'
                => 'Announcement created',

            'data'
                => $announcement,
        ]);
    }

    public function show(
        Announcement $announcement
    )
    {

        return response()->json([

            'success' => true,

            'data'
                => $announcement,
        ]);
    }

    public function update(
        Request $request,
        Announcement $announcement
    )
    {

        $announcement->update(
            $request->all()
        );

        return response()->json([

            'success' => true,

            'message'
                => 'Announcement updated',

            'data'
                => $announcement,
        ]);
    }

    public function destroy(
        Announcement $announcement
    )
    {

        $announcement->delete();

        return response()->json([

            'success' => true,

            'message'
                => 'Announcement deleted',
        ]);
    }
}
