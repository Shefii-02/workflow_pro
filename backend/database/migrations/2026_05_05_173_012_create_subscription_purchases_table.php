<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('subscription_purchases', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('company_id');
            $table->uuid('plan_id');
            $table->uuid('purchased_by');

            $table->enum('billing_cycle', ['monthly', 'yearly'])->default('monthly');
            $table->decimal('amount_paid', 10, 2);
            $table->string('currency', 10)->default('USD');

            $table->enum('status', ['trial', 'active', 'past_due', 'cancelled', 'expired'])->default('trial');
            $table->string('payment_gateway')->nullable();

            $table->timestamp('trial_ends_at')->nullable();
            $table->timestamp('current_period_start')->nullable();
            $table->timestamp('current_period_end')->nullable();

            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
            $table->foreign('plan_id')->references('id')->on('subscription_plans');
            $table->foreign('purchased_by')->references('id')->on('users');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('subscription_purchases');
    }
};
