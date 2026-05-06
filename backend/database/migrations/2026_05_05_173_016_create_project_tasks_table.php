<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('project_tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('project_id');
            $table->uuid('parent_task_id')->nullable();

            $table->uuid('assigned_to')->nullable();
            $table->uuid('created_by');

            $table->string('title');
            $table->text('description')->nullable();

            $table->string('status')->default('todo');
            $table->string('priority')->default('medium');

            $table->date('due_date')->nullable();
            $table->timestamp('completed_at')->nullable();

            $table->decimal('estimated_hours', 6, 2)->nullable();
            $table->integer('sort_order')->default(0);

            $table->json('tags')->nullable();
            $table->boolean('is_milestone')->default(false);

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('project_id')->cascadeOnDelete()->references('id')->on('projects');
            $table->foreign('parent_task_id')->cascadeOnDelete()->references('id')->on('project_tasks');
            $table->foreign('assigned_to')->nullOnDelete()->references('id')->on('users');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('project_tasks');
    }
};
