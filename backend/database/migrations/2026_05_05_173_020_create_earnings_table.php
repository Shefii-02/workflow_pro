<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('earnings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('company_id');
            $table->uuid('project_id')->nullable();
            $table->uuid('client_id')->nullable();

            $table->decimal('amount', 12, 2);
            $table->string('currency', 10)->default('USD');

            $table->enum('status', ['pending', 'received', 'overdue', 'cancelled'])->default('pending');

            $table->date('earned_date')->nullable();
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('earnings');
    }
};
