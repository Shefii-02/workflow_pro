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

        Schema::create('leave_types', function (
            Blueprint $table
        ) {

            $table->uuid('id')->primary();

            $table->uuid('company_id');

            /*
    |--------------------------------------------------------------------------
    | BASIC
    |--------------------------------------------------------------------------
    */

            $table->string('name');

            $table->string('slug');

            $table->text('description')
                ->nullable();

            /*
    |--------------------------------------------------------------------------
    | LIMITS
    |--------------------------------------------------------------------------
    */

            $table->integer(
                'days_per_year'
            )->default(0);

            $table->integer(
                'max_days_per_month'
            )->nullable();

            $table->integer(
                'max_consecutive_days'
            )->nullable();

            /*
    |--------------------------------------------------------------------------
    | SETTINGS
    |--------------------------------------------------------------------------
    */

            $table->boolean(
                'is_paid'
            )->default(true);

            $table->boolean(
                'requires_approval'
            )->default(true);

            $table->boolean(
                'allow_half_day'
            )->default(true);

            $table->boolean(
                'carry_forward'
            )->default(false);

            $table->boolean(
                'requires_document'
            )->default(false);

            /*
    |--------------------------------------------------------------------------
    | APPLICABLE
    |--------------------------------------------------------------------------
    */

            $table->json(
                'applicable_roles'
            )->nullable();

            $table->json(
                'applicable_departments'
            )->nullable();

            /*
    |--------------------------------------------------------------------------
    | STATUS
    |--------------------------------------------------------------------------
    */

            $table->boolean(
                'status'
            )->default(true);

            $table->timestamps();

            $table->softDeletes();

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_types');
    }
};
