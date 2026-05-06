<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('role_permissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('role_id');
            $table->uuid('permission_id');
            $table->timestamps();

            $table->unique(['role_id', 'permission_id']);

            $table->foreign('role_id')->cascadeOnDelete()->references('id')->on('roles');
            $table->foreign('permission_id')->cascadeOnDelete()->references('id')->on('permissions');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('role_permissions');
    }
};
