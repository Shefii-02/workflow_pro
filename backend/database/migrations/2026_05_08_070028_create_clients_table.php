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
        Schema::create('clients', function (
            Blueprint $table
        ) {

            $table->uuid('id')->primary();

            /*
            |--------------------------------------------------------------------------
            | BASIC
            |--------------------------------------------------------------------------
            */

            $table->string('name');

            $table->string('email')
                ->unique();

            $table->string('phone')
                ->nullable();

            $table->string('password')
                ->nullable();

            /*
            |--------------------------------------------------------------------------
            | COMPANY
            |--------------------------------------------------------------------------
            */

            $table->string('company_name')
                ->nullable();

            $table->string('website')
                ->nullable();

            /*
            |--------------------------------------------------------------------------
            | ADDRESS
            |--------------------------------------------------------------------------
            */

            $table->string('country')
                ->nullable();

            $table->string('state')
                ->nullable();

            $table->string('city')
                ->nullable();

            $table->text('address')
                ->nullable();

            /*
            |--------------------------------------------------------------------------
            | PROFILE
            |--------------------------------------------------------------------------
            */

            $table->text('avatar')
                ->nullable();

            $table->text('notes')
                ->nullable();

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
                    'blocked',
                ]
            )->default('active');

            /*
            |--------------------------------------------------------------------------
            | EMAIL VERIFY
            |--------------------------------------------------------------------------
            */

            $table->timestamp(
                'email_verified_at'
            )->nullable();

            /*
            |--------------------------------------------------------------------------
            | SYSTEM
            |--------------------------------------------------------------------------
            */

            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(
            'clients'
        );
    }
};
