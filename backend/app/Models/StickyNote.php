<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class StickyNote extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'user_id',

        'company_id',

        'content',

        'color',

        'position_x',

        'position_y',

        'width',

        'height',

        'is_pinned',
    ];

    protected $casts = [

        'is_pinned'
            => 'boolean',
    ];
}
