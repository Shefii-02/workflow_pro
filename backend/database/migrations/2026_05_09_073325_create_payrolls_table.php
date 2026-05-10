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
        Schema::create('payrolls', function (
            Blueprint $table
        ) {

            $table->uuid('id')->primary();

            $table->uuid('company_id');

            $table->uuid('user_id');

            /*
    |--------------------------------------------------------------------------
    | PERIOD
    |--------------------------------------------------------------------------
    */

            $table->string(
                'payroll_month'
            );

            $table->date(
                'salary_date'
            );

            /*
    |--------------------------------------------------------------------------
    | ATTENDANCE
    |--------------------------------------------------------------------------
    */

            $table->integer(
                'working_days'
            )->default(0);

            $table->integer(
                'present_days'
            )->default(0);

            $table->integer(
                'leave_days'
            )->default(0);

            $table->integer(
                'absent_days'
            )->default(0);

            /*
    |--------------------------------------------------------------------------
    | OVERTIME
    |--------------------------------------------------------------------------
    */

            $table->integer(
                'overtime_hours'
            )->default(0);

            /*
    |--------------------------------------------------------------------------
    | AMOUNTS
    |--------------------------------------------------------------------------
    */

            $table->decimal(
                'gross_salary',
                15,
                2
            )->default(0);

            $table->decimal(
                'total_bonus',
                15,
                2
            )->default(0);

            $table->decimal(
                'total_deduction',
                15,
                2
            )->default(0);

            $table->decimal(
                'net_salary',
                15,
                2
            )->default(0);

            /*
    |--------------------------------------------------------------------------
    | STATUS
    |--------------------------------------------------------------------------
    */

            $table->enum(
                'status',
                [
                    'draft',
                    'generated',
                    'paid',
                ]
            )->default('draft');

            $table->timestamp(
                'paid_at'
            )->nullable();

            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payrolls');
    }
};
