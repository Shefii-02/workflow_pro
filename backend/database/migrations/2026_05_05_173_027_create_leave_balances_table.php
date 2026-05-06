<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('leave_balances', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('company_id');

            $table->enum('leave_type', ['annual', 'sick', 'casual', 'maternity', 'paternity', 'unpaid', 'compensatory']);
            $table->integer('year');

            $table->integer('total_days')->default(0);
            $table->integer('used_days')->default(0);

            $table->integer('remaining_days')->storedAs('total_days - used_days');

            $table->timestamps();

            $table->unique(['user_id', 'leave_type', 'year']);

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_balances');
    }
};
