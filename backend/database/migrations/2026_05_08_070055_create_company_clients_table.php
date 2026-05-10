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
        Schema::create('company_clients', function (
            Blueprint $table
        ) {

            $table->uuid('id')->primary();

            /*
            |--------------------------------------------------------------------------
            | RELATIONS
            |--------------------------------------------------------------------------
            */

            $table->uuid('company_id');

            $table->uuid('client_id');

            /*
            |--------------------------------------------------------------------------
            | WORK TYPE
            |--------------------------------------------------------------------------
            */

            $table->string(
                'service_type'
            )->nullable();

            /*
            |--------------------------------------------------------------------------
            | COMPANY SIDE NOTES
            |--------------------------------------------------------------------------
            */

            $table->text(
                'notes'
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
                ]
            )->default('active');

            /*
            |--------------------------------------------------------------------------
            | ASSIGNED
            |--------------------------------------------------------------------------
            */

            $table->uuid(
                'created_by'
            )->nullable();

            /*
            |--------------------------------------------------------------------------
            | DATES
            |--------------------------------------------------------------------------
            */

            $table->timestamp(
                'joined_at'
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

                'client_id',

                'service_type',
            ]);

            /*
            |--------------------------------------------------------------------------
            | FOREIGN KEYS
            |--------------------------------------------------------------------------
            */

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->cascadeOnDelete();

            $table->foreign('client_id')
                ->references('id')
                ->on('clients')
                ->cascadeOnDelete();

            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(
            'company_clients'
        );
    }
};
