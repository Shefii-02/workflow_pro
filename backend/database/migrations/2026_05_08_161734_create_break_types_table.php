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
        Schema::create('break_types', function (
            Blueprint $table
        ) {

            $table->uuid('id')->primary();

            $table->uuid('company_id');

            $table->string('label');

            $table->string('slug');

            /*
    |--------------------------------------------------------------------------
    | SETTINGS
    |--------------------------------------------------------------------------
    */

            $table->integer(
                'allowed_minutes'
            )->default(15);

            $table->boolean(
                'is_paid'
            )->default(true);

            $table->boolean(
                'requires_approval'
            )->default(false);

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
        Schema::dropIfExists('break_types');
    }
};
