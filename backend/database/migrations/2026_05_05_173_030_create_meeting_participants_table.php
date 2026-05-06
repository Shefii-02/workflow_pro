<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('meeting_participants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('meeting_id');
            $table->uuid('user_id');

            $table->enum('rsvp', ['pending', 'accepted', 'declined', 'tentative'])->default('pending');
            $table->timestamp('responded_at')->nullable();

            $table->unique(['meeting_id', 'user_id']);

            $table->foreign('meeting_id')->references('id')->on('meetings')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('meeting_participants');
    }
};
