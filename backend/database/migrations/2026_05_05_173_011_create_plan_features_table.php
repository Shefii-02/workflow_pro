<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('plan_features', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('plan_id');
            $table->string('feature_key');
            $table->string('feature_label');
            $table->string('module');
            $table->boolean('is_enabled')->default(false);
            $table->string('limit_value')->nullable();
            $table->enum('limit_type', ['count', 'boolean', 'storage', 'unlimited'])->nullable();
            $table->timestamps();

            $table->unique(['plan_id', 'feature_key']);
            $table->foreign('plan_id')->references('id')->on('subscription_plans')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plan_features');
    }
};
