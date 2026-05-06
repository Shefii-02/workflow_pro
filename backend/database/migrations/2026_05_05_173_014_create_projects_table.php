<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('company_id');
            $table->uuid('client_id')->nullable();
            $table->uuid('created_by');

            $table->string('title');
            $table->text('description')->nullable();

            $table->string('status')->default('planning');
            $table->string('priority')->default('medium');

            $table->decimal('budget', 12, 2)->nullable();
            $table->string('currency')->default('USD');

            $table->date('start_date')->nullable();
            $table->date('due_date')->nullable();

            $table->timestamp('completed_at')->nullable();
            $table->integer('progress_percent')->default(0);

            $table->string('cover_color')->default('#6366f1');
            $table->boolean('is_archived')->default(false);

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('company_id')->cascadeOnDelete()->references('id')->on('companies');
            $table->foreign('client_id')->nullOnDelete()->references('id')->on('users');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
