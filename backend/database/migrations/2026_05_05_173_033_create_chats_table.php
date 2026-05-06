<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('company_id');
            $table->string('type')->default('direct');
            $table->string('name')->nullable();
            $table->uuid('created_by');
            $table->timestamps();

            $table->foreign('company_id')->cascadeOnDelete()->references('id')->on('companies');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
