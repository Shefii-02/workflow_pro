<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class SupportTicket extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [

        'company_id',

        'user_id',

        'assigned_to',

        'ticket_number',

        'subject',

        'description',

        'category',

        'priority',

        'status',

        'resolution_note',

        'resolved_at',

        'rating',

        'feedback',
    ];

    protected $casts = [

        'resolved_at'
            => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function messages()
    {
        return $this->hasMany(
            SupportTicketMessage::class
        );
    }
}
