<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('attendance_breaks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('attendance_id');

            $table->enum('break_type', ['lunch', 'meeting', 'short', 'custom'])->default('short');
            $table->string('break_label')->nullable();

            $table->timestamp('started_at');
            $table->timestamp('ended_at')->nullable();
            $table->integer('duration_minutes')->default(0);

            $table->timestamps();

            $table->foreign('attendance_id')->references('id')->on('attendance')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendance_breaks');
    }
};
