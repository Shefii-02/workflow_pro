<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run migrations.
     */
    public function up(): void
    {
        Schema::create('company_users', function (Blueprint $table) {

            $table->uuid('id')->primary();

            /*
            |--------------------------------------------------------------------------
            | RELATIONS
            |--------------------------------------------------------------------------
            */

            $table->uuid('company_id');

            $table->uuid('user_id');

            /*
            |--------------------------------------------------------------------------
            | STAFF INFO
            |--------------------------------------------------------------------------
            */

            $table->string(
                'employee_code'
            )->nullable();

            $table->string(
                'designation'
            )->nullable();

            $table->uuid(
                'department_id'
            )->nullable();

            /*
            |--------------------------------------------------------------------------
            | ROLE
            |--------------------------------------------------------------------------
            */

            $table->uuid(
                'role_id'
            )->nullable();

            /*
            |--------------------------------------------------------------------------
            | EMPLOYMENT
            |--------------------------------------------------------------------------
            */

            $table->date(
                'joined_at'
            )->nullable();

            $table->date(
                'left_at'
            )->nullable();

            $table->enum(
                'employment_type',
                [
                    'full_time',
                    'part_time',
                    'contract',
                    'intern',
                    'freelancer',
                ]
            )->default('full_time');

            /*
            |--------------------------------------------------------------------------
            | SALARY
            |--------------------------------------------------------------------------
            */

            $table->decimal(
                'salary',
                15,
                2
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
                    'inactive',
                    'terminated',
                ]
            )->default('active');

            /*
            |--------------------------------------------------------------------------
            | EXTRA
            |--------------------------------------------------------------------------
            */

            $table->json(
                'meta'
            )->nullable();

            /*
            |--------------------------------------------------------------------------
            | SYSTEM
            |--------------------------------------------------------------------------
            */

            $table->timestamps();

            $table->softDeletes();

            /*
            |--------------------------------------------------------------------------
            | UNIQUE
            |--------------------------------------------------------------------------
            */

            $table->unique([
                'company_id',
                'user_id',
            ]);

            /*
            |--------------------------------------------------------------------------
            | INDEXES
            |--------------------------------------------------------------------------
            */

            $table->index('company_id');

            $table->index('user_id');

            $table->index('role_id');

            /*
            |--------------------------------------------------------------------------
            | FOREIGN KEYS
            |--------------------------------------------------------------------------
            */

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->cascadeOnDelete();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(
            'company_users'
        );
    }
};
