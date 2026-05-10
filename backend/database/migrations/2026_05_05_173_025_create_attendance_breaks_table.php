<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('attendance_breaks', function (
            Blueprint $table
        ) {

            $table->uuid('id')->primary();

            $table->uuid('attendance_id');

            /*
    |--------------------------------------------------------------------------
    | BREAK
    |--------------------------------------------------------------------------
    */

            $table->timestamp(
                'break_start_at'
            )->nullable();

            $table->timestamp(
                'break_end_at'
            )->nullable();

            /*
    |--------------------------------------------------------------------------
    | VALIDATION
    |--------------------------------------------------------------------------
    */

            $table->decimal(
                'break_end_latitude',
                10,
                7
            )->nullable();

            $table->decimal(
                'break_end_longitude',
                10,
                7
            )->nullable();

            $table->string(
                'break_end_selfie'
            )->nullable();

            $table->boolean(
                'break_end_biometric_verified'
            )->default(false);

            $table->enum('break_type', ['lunch', 'meeting', 'short', 'custom'])->default('short');
            $table->string('break_label')->nullable();

            $table->integer('duration_minutes')->default(0);

            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('attendance_breaks');
    }
};
