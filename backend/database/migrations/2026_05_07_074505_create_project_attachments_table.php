<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_attachments', function (Blueprint $table) {

            $table->uuid('id')->primary();

            $table->uuid('company_id');

            $table->uuid('project_id');

            $table->uuid('uploaded_by');

            $table->string('file_name');

            $table->string('original_name');

            $table->text('file_url');

            $table->string('disk')->default('public');

            $table->string('mime_type')->nullable();

            $table->unsignedBigInteger('file_size')->nullable();

            $table->timestamps();

            $table->softDeletes();

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->cascadeOnDelete();

            $table->foreign('project_id')
                ->references('id')
                ->on('projects')
                ->cascadeOnDelete();

            $table->foreign('uploaded_by')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();
        });
        Schema::dropIfExists('task_attachments');
        Schema::create('task_attachments', function (Blueprint $table) {

            $table->uuid('task_id');

            $table->uuid('project_attachment_id');

            $table->timestamps();

            $table->foreign('task_id')
                ->references('id')
                ->on('project_tasks')
                ->cascadeOnDelete();

            $table->foreign('project_attachment_id')
                ->references('id')
                ->on('project_attachments')
                ->cascadeOnDelete();

            $table->unique([
                'task_id',
                'project_attachment_id'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_attachments');
    }
};
