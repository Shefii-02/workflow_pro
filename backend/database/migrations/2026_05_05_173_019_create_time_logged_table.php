<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('time_logged', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('task_id')->nullable();
            $table->uuid('project_id');
            $table->uuid('user_id');

            $table->integer('duration_minutes')->default(0);
            $table->date('log_date')->useCurrent();

            $table->boolean('is_billable')->default(true);
            $table->decimal('hourly_rate', 10, 2)->nullable();

            $table->timestamps();

            $table->foreign('task_id')->references('id')->on('project_tasks')->nullOnDelete();
            $table->foreign('project_id')->references('id')->on('projects')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('time_logged');
    }
};
