<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('company_id');
            $table->uuid('created_by');
            $table->uuid('assigned_to')->nullable();

            $table->string('title');
            $table->text('description');

            $table->enum('type', ['technical', 'payment', 'project', 'general', 'feature_request'])->default('general');
            $table->enum('priority', ['low', 'medium', 'high', 'critical', 'urgent'])->default('medium');
            $table->enum('status', ['open', 'in_progress', 'waiting_reply', 'resolved', 'closed'])->default('open');

            $table->uuid('project_id')->nullable();
            $table->timestamp('resolved_at')->nullable();

            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
