<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('meetings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('company_id');
            $table->uuid('created_by');

            $table->string('title');
            $table->text('description')->nullable();

            $table->timestamp('starts_at');
            $table->timestamp('ends_at')->nullable();

            $table->enum('platform', ['google_meet', 'zoom', 'teams', 'custom'])->default('custom');
            $table->text('meeting_link')->nullable();

            $table->uuid('project_id')->nullable();

            $table->enum('status', ['scheduled', 'ongoing', 'completed', 'cancelled'])->default('scheduled');

            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
            $table->foreign('created_by')->references('id')->on('users');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('meetings');
    }
};
