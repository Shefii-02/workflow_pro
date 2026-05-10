<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('support_tickets', function (
            Blueprint $table
        ) {

            $table->uuid('id')->primary();

            /*
    |--------------------------------------------------------------------------
    | COMPANY
    |--------------------------------------------------------------------------
    */

            $table->uuid('company_id')
                ->nullable();

            $table->uuid('user_id');

            /*
    |--------------------------------------------------------------------------
    | ASSIGNED
    |--------------------------------------------------------------------------
    */

            $table->uuid('assigned_to')
                ->nullable();

            /*
    |--------------------------------------------------------------------------
    | BASIC
    |--------------------------------------------------------------------------
    */

            $table->string('ticket_number')
                ->unique();

            $table->string('subject');

            $table->longText('description');

            /*
    |--------------------------------------------------------------------------
    | CATEGORY
    |--------------------------------------------------------------------------
    */

            $table->enum(
                'category',
                [
                    'technical',
                    'billing',
                    'bug',
                    'feature_request',
                    'account',
                    'other',
                ]
            )->default('technical');

            /*
    |--------------------------------------------------------------------------
    | PRIORITY
    |--------------------------------------------------------------------------
    */

            $table->enum(
                'priority',
                [
                    'low',
                    'medium',
                    'high',
                    'urgent',
                ]
            )->default('medium');

            /*
    |--------------------------------------------------------------------------
    | STATUS
    |--------------------------------------------------------------------------
    */

            $table->enum(
                'status',
                [
                    'open',
                    'in_progress',
                    'resolved',
                    'closed',
                ]
            )->default('open');

            /*
    |--------------------------------------------------------------------------
    | RESOLUTION
    |--------------------------------------------------------------------------
    */

            $table->text(
                'resolution_note'
            )->nullable();

            $table->timestamp(
                'resolved_at'
            )->nullable();

            /*
    |--------------------------------------------------------------------------
    | RATINGS
    |--------------------------------------------------------------------------
    */

            $table->integer(
                'rating'
            )->nullable();

            $table->text(
                'feedback'
            )->nullable();

            $table->timestamps();

            $table->softDeletes();
        });

        Schema::create(
            'support_ticket_messages',
            function (Blueprint $table) {

                $table->uuid('id')->primary();

                $table->uuid('support_ticket_id');

                $table->uuid('sender_id');

                /*
        |--------------------------------------------------------------------------
        | MESSAGE
        |--------------------------------------------------------------------------
        */

                $table->longText('message');

                /*
        |--------------------------------------------------------------------------
        | TYPE
        |--------------------------------------------------------------------------
        */

                $table->enum(
                    'sender_type',
                    [
                        'company',
                        'staff',
                        'super_admin',
                    ]
                );

                /*
        |--------------------------------------------------------------------------
        | READ
        |--------------------------------------------------------------------------
        */

                $table->boolean(
                    'is_read'
                )->default(false);

                $table->timestamps();

                $table->softDeletes();
            }
        );

        Schema::create(
            'support_ticket_attachments',
            function (Blueprint $table) {

                $table->uuid('id')->primary();

                $table->uuid(
                    'support_ticket_message_id'
                );

                /*
        |--------------------------------------------------------------------------
        | FILE
        |--------------------------------------------------------------------------
        */

                $table->string('file_name');

                $table->string(
                    'original_name'
                );

                $table->text('file_url');

                $table->string('mime_type')
                    ->nullable();

                $table->unsignedBigInteger(
                    'file_size'
                )->nullable();

                $table->timestamps();

                $table->softDeletes();
            }
        );

        Schema::create(
            'support_ticket_status_logs',
            function (Blueprint $table) {

                $table->uuid('id')->primary();

                $table->uuid('support_ticket_id');

                $table->uuid('changed_by');

                $table->string('old_status')
                    ->nullable();

                $table->string('new_status');

                $table->text('note')
                    ->nullable();

                $table->timestamps();
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('support_tickets');
        Schema::dropIfExists('support_ticket_messages');
        Schema::dropIfExists('support_ticket_attachments');
        Schema::dropIfExists('support_ticket_status_logs');
    }
};
