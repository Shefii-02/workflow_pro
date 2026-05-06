<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('task_attachments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('task_id');
            $table->uuid('uploaded_by');

            $table->string('file_name');
            $table->text('file_url');
            $table->string('file_type')->nullable();
            $table->integer('file_size_bytes')->nullable();

            $table->timestamps();

            $table->foreign('task_id')->references('id')->on('project_tasks')->cascadeOnDelete();
            $table->foreign('uploaded_by')->references('id')->on('users');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('task_attachments');
    }
};
