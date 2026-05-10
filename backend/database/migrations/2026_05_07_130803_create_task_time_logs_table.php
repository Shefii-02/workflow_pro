<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_time_logs', function (Blueprint $table) {

            $table->uuid('id')->primary();

            $table->uuid('company_id');

            $table->uuid('project_id');

            $table->uuid('task_id');

            $table->uuid('user_id');

            $table->timestamp('started_at');

            $table->timestamp('paused_at')->nullable();

            $table->timestamp('ended_at')->nullable();

            $table->integer('worked_seconds')
                ->default(0);

            $table->enum('status', [
                'running',
                'paused',
                'completed'
            ])->default('running');

            $table->text('note')->nullable();

            $table->timestamps();

            /*
            |--------------------------------------------------------------------------
            | FOREIGN KEYS
            |--------------------------------------------------------------------------
            */

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->cascadeOnDelete();

            $table->foreign('project_id')
                ->references('id')
                ->on('projects')
                ->cascadeOnDelete();

            $table->foreign('task_id')
                ->references('id')
                ->on('project_tasks')
                ->cascadeOnDelete();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            /*
            |--------------------------------------------------------------------------
            | INDEXES
            |--------------------------------------------------------------------------
            */

            $table->index('task_id');

            $table->index('user_id');

            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_time_logs');
    }
};
