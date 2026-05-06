<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('payment_transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('subscription_id');
            $table->uuid('company_id');

            $table->decimal('amount', 10, 2);
            $table->string('currency', 10)->default('USD');

            $table->enum('status', ['pending', 'success', 'failed', 'refunded'])->default('pending');
            $table->string('gateway_txn_id')->nullable();
            $table->text('invoice_pdf_url')->nullable();

            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->foreign('subscription_id')->references('id')->on('subscription_purchases');
            $table->foreign('company_id')->references('id')->on('companies');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};
