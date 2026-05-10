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
            'employee_salary_structures',
            function (Blueprint $table) {

                $table->uuid('id')->primary();

                $table->uuid('company_id');

                $table->uuid('user_id');

                /*
        |--------------------------------------------------------------------------
        | BASIC
        |--------------------------------------------------------------------------
        */

                $table->decimal(
                    'basic_salary',
                    15,
                    2
                );

                $table->decimal(
                    'hra',
                    15,
                    2
                )->default(0);

                $table->decimal(
                    'allowance',
                    15,
                    2
                )->default(0);

                $table->decimal(
                    'bonus',
                    15,
                    2
                )->default(0);

                /*
        |--------------------------------------------------------------------------
        | DEDUCTIONS
        |--------------------------------------------------------------------------
        */

                $table->decimal(
                    'tax',
                    15,
                    2
                )->default(0);

                $table->decimal(
                    'pf',
                    15,
                    2
                )->default(0);

                $table->decimal(
                    'esi',
                    15,
                    2
                )->default(0);

                /*
        |--------------------------------------------------------------------------
        | OVERTIME
        |--------------------------------------------------------------------------
        */

                $table->decimal(
                    'overtime_per_hour',
                    15,
                    2
                )->default(0);

                /*
        |--------------------------------------------------------------------------
        | WORKING DAYS
        |--------------------------------------------------------------------------
        */

                $table->integer(
                    'monthly_working_days'
                )->default(26);

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
        Schema::dropIfExists('employee_salary_structures');
    }
};
