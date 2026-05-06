<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('chat_id');
            $table->uuid('sender_id');
            $table->text('message')->nullable();
            $table->uuid('reply_to_id')->nullable();
            $table->timestamps();

            $table->foreign('chat_id')->cascadeOnDelete()->references('id')->on('chats');
            $table->foreign('sender_id')->references('id')->on('users');
            $table->foreign('reply_to_id')->nullOnDelete()->references('id')->on('chat_messages');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('chat_messages');
    }
};
