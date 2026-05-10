<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('company_id');
            $table->uuid('client_id')->nullable();
            $table->uuid('project_id')->nullable();

            $table->string('invoice_number')->unique();
            $table->decimal('total_amount', 12, 2);

            $table->enum('status', ['draft', 'sent', 'paid'])->default('draft');

            $table->date('issue_date')->useCurrent();
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
