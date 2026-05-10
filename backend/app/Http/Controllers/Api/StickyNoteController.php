<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StickyNote;
use Illuminate\Http\Request;

class StickyNoteController extends Controller
{
    public function index()
    {

        return response()->json([

            'success' => true,

            'data'
                => StickyNote::where(
                    'user_id',
                    auth()->id()
                )
                ->latest()
                ->get(),
        ]);
    }

    public function store(
        Request $request
    )
    {

        $note = StickyNote::create([

            'user_id'
                => auth()->id(),

            'company_id'
                => auth()->user()->company_id,

            'content'
                => $request->content,

            'color'
                => $request->color
                ?? '#FFF59D',

            'position_x'
                => $request->position_x
                ?? 0,

            'position_y'
                => $request->position_y
                ?? 0,

            'width'
                => $request->width
                ?? 250,

            'height'
                => $request->height
                ?? 250,

            'is_pinned'
                => $request->is_pinned
                ?? false,
        ]);

        return response()->json([

            'success' => true,

            'message'
                => 'Sticky note created',

            'data'
                => $note,
        ]);
    }

    public function update(
        Request $request,
        StickyNote $stickyNote
    )
    {

        $stickyNote->update(
            $request->all()
        );

        return response()->json([

            'success' => true,

            'message'
                => 'Sticky note updated',

            'data'
                => $stickyNote,
        ]);
    }

    public function destroy(
        StickyNote $stickyNote
    )
    {

        $stickyNote->delete();

        return response()->json([

            'success' => true,

            'message'
                => 'Sticky note deleted',
        ]);
    }
}
