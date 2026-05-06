<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('attendance', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('company_id');

            $table->date('work_date');
            $table->timestamp('clock_in_at')->nullable();
            $table->timestamp('clock_out_at')->nullable();
            $table->decimal('total_hours', 5, 2)->default(0);

            $table->decimal('location_lat', 10, 7)->nullable();
            $table->decimal('location_lng', 10, 7)->nullable();
            $table->string('ip_address', 50)->nullable();

            $table->enum('status', ['present', 'absent', 'half_day', 'on_leave', 'holiday'])->default('present');
            $table->text('notes')->nullable();

            $table->timestamps();

            $table->unique(['user_id', 'work_date']);

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('attendance');
    }
};
