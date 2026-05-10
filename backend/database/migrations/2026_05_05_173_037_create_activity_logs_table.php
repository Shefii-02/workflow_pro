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
        Schema::create('activity_logs', function (Blueprint $table) {

            $table->uuid('id')->primary();

            /*
            |--------------------------------------------------------------------------
            | USER
            |--------------------------------------------------------------------------
            */

            $table->uuid('user_id')->nullable();

            $table->uuid('company_id')->nullable();

            /*
            |--------------------------------------------------------------------------
            | ACTIVITY
            |--------------------------------------------------------------------------
            */

            $table->string('action');

            /*
            |--------------------------------------------------------------------------
            | MODULE
            |--------------------------------------------------------------------------
            */

            $table->string('module');

            /*
            |--------------------------------------------------------------------------
            | REFERENCE
            |--------------------------------------------------------------------------
            */

            $table->uuid('reference_id')->nullable();

            /*
            |--------------------------------------------------------------------------
            | DATA CHANGES
            |--------------------------------------------------------------------------
            */

            $table->json('old_value')->nullable();

            $table->json('new_value')->nullable();

            /*
            |--------------------------------------------------------------------------
            | REQUEST INFO
            |--------------------------------------------------------------------------
            */

            $table->ipAddress('ip_address')->nullable();

            $table->text('user_agent')->nullable();

            /*
            |--------------------------------------------------------------------------
            | SYSTEM
            |--------------------------------------------------------------------------
            */

            $table->timestamps();

            /*
            |--------------------------------------------------------------------------
            | INDEXES
            |--------------------------------------------------------------------------
            */

            $table->index('user_id');

            $table->index('company_id');

            $table->index('module');

            $table->index('action');

            $table->index('reference_id');

            /*
            |--------------------------------------------------------------------------
            | FOREIGN KEYS
            |--------------------------------------------------------------------------
            */

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->nullOnDelete();

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
