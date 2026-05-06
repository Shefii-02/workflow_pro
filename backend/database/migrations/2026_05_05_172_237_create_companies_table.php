<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('companies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('logo_url')->nullable();
            $table->string('website')->nullable();
            $table->text('address')->nullable();
            $table->string('country')->nullable();
            $table->string('currency',10)->default('USD');
            $table->string('timezone')->default('UTC');
            $table->uuid('owner_id')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('companies');
    }
};
