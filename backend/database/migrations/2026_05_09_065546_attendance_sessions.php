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
        Schema::create(
            'attendance_sessions',
            function (Blueprint $table) {

                $table->uuid('id')->primary();

                $table->uuid('company_id');

                $table->uuid('attendance_id');

                $table->uuid(
                    'employee_shift_assignment_id'
                );

                /*
        |--------------------------------------------------------------------------
        | CLOCK IN
        |--------------------------------------------------------------------------
        */

                $table->timestamp(
                    'clock_in_at'
                )->nullable();

                $table->timestamp(
                    'clock_out_at'
                )->nullable();

                /*
        |--------------------------------------------------------------------------
        | STATUS
        |--------------------------------------------------------------------------
        */

                $table->enum(
                    'status',
                    [
                        'active',
                        'completed',
                        'missed',
                    ]
                )->default('active');

                /*
        |--------------------------------------------------------------------------
        | WORK
        |--------------------------------------------------------------------------
        */

                $table->integer(
                    'work_seconds'
                )->default(0);

                $table->integer(
                    'break_seconds'
                )->default(0);

                $table->timestamps();

                $table->softDeletes();
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
               Schema::dropIfExists('attendance_sessions');
    }
};
