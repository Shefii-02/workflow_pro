<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('departments', function (
            Blueprint $table
        ) {

            $table->uuid('id')->primary();

            /*
            |--------------------------------------------------------------------------
            | COMPANY
            |--------------------------------------------------------------------------
            */

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
            | HEAD
            |--------------------------------------------------------------------------
            */

            $table->uuid(
                'department_head_id'
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
            | EXTRA
            |--------------------------------------------------------------------------
            */

            $table->json('meta')
                ->nullable();

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
                'slug',
            ]);

            /*
            |--------------------------------------------------------------------------
            | FOREIGN
            |--------------------------------------------------------------------------
            */

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->cascadeOnDelete();

            $table->foreign(
                'department_head_id'
            )
            ->references('id')
            ->on('users')
            ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(
            'departments'
        );
    }
};
