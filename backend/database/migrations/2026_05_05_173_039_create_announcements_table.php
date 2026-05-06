<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('company_id');
            $table->uuid('created_by');

            $table->string('title');
            $table->text('content');

            $table->enum('visibility', ['all', 'company_only', 'role_based'])->default('company_only');
            $table->json('target_roles')->nullable();

            $table->boolean('is_pinned')->default(false);
            $table->timestamp('expires_at')->nullable();

            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
