<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('leaves', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('company_id');
            $table->uuid('approved_by')->nullable();

            $table->enum('leave_type', ['annual', 'sick', 'casual', 'maternity', 'paternity', 'unpaid', 'compensatory'])->default('casual');

            $table->date('start_date');
            $table->date('end_date');
            $table->integer('total_days')->default(1);

            $table->text('reason')->nullable();

            $table->enum('status', ['pending', 'approved', 'rejected', 'cancelled'])->default('pending');
            $table->text('rejection_reason')->nullable();

            $table->timestamp('applied_at')->useCurrent();
            $table->timestamp('decided_at')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
            $table->foreign('approved_by')->references('id')->on('users')->nullOnDelete();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('leaves');
    }
};
