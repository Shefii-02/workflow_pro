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
        Schema::create('attendances', function (
            Blueprint $table
        ) {

            $table->uuid('id')->primary();

            $table->uuid('company_id');

            $table->uuid('user_id');

            /*
    |--------------------------------------------------------------------------
    | DATE
    |--------------------------------------------------------------------------
    */

            $table->date('attendance_date');

            /*
    |--------------------------------------------------------------------------
    | CLOCK IN
    |--------------------------------------------------------------------------
    */

            $table->timestamp('clock_in_at')
                ->nullable();

            $table->decimal(
                'clock_in_latitude',
                10,
                7
            )->nullable();

            $table->decimal(
                'clock_in_longitude',
                10,
                7
            )->nullable();

            $table->string(
                'clock_in_selfie'
            )->nullable();

            /*
    |--------------------------------------------------------------------------
    | CLOCK OUT
    |--------------------------------------------------------------------------
    */

            $table->timestamp('clock_out_at')
                ->nullable();

            $table->decimal(
                'clock_out_latitude',
                10,
                7
            )->nullable();

            $table->decimal(
                'clock_out_longitude',
                10,
                7
            )->nullable();

            $table->string(
                'clock_out_selfie'
            )->nullable();

            /*
    |--------------------------------------------------------------------------
    | VALIDATION
    |--------------------------------------------------------------------------
    */

            $table->boolean(
                'biometric_verified'
            )->default(false);

            $table->boolean(
                'face_verified'
            )->default(false);

            $table->decimal(
                'face_match_score',
                5,
                2
            )->nullable();

            /*
    |--------------------------------------------------------------------------
    | GEOFENCE
    |--------------------------------------------------------------------------
    */

            $table->boolean(
                'inside_office'
            )->default(false);

            $table->decimal(
                'distance_meter',
                10,
                2
            )->nullable();

            $table->text(
                'outside_reason'
            )->nullable();

            /*
    |--------------------------------------------------------------------------
    | DEVICE
    |--------------------------------------------------------------------------
    */

            $table->string(
                'device_id'
            )->nullable();

            /*
    |--------------------------------------------------------------------------
    | STATUS
    |--------------------------------------------------------------------------
    */

            $table->enum(
                'status',
                [
                    'present',
                    'late',
                    'half_day',
                    'absent',
                ]
            )->default('present');

            /*
    |--------------------------------------------------------------------------
    | WORKING TIME
    |--------------------------------------------------------------------------
    */

            $table->integer(
                'total_work_seconds'
            )->default(0);

            $table->integer(
                'total_break_seconds'
            )->default(0);

            $table->string('ip_address', 50)->nullable();

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
        Schema::dropIfExists('attendance');
    }
};
