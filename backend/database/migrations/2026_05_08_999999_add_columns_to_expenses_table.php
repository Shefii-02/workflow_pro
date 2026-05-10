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
        Schema::dropIfExists('expenses');
        Schema::create('expenses', function (Blueprint $table) {

            $table->uuid('id')->primary();

            /*
            |--------------------------------------------------------------------------
            | RELATIONS
            |--------------------------------------------------------------------------
            */

            $table->uuid('company_id');

            $table->uuid('project_id');

            $table->uuid('user_id');

            /*
            |--------------------------------------------------------------------------
            | BASIC INFO
            |--------------------------------------------------------------------------
            */

            $table->string('title');

            $table->longText('description')->nullable();

            /*
            |--------------------------------------------------------------------------
            | FINANCIAL
            |--------------------------------------------------------------------------
            */

            $table->decimal(
                'amount',
                15,
                2
            );

            $table->string(
                'currency',
                10
            )->default('INR');

            $table->string(
                'category'
            )->nullable();

            /*
            |--------------------------------------------------------------------------
            | RECEIPT
            |--------------------------------------------------------------------------
            */

            $table->text(
                'receipt_url'
            )->nullable();

            $table->string(
                'receipt_original_name'
            )->nullable();


            $table->unsignedBigInteger(
                'receipt_file_size'
            )->nullable();

            $table->string(
                'receipt_file_type'
            )->nullable();

            /*
            |--------------------------------------------------------------------------
            | FLAGS
            |--------------------------------------------------------------------------
            */

            $table->boolean(
                'is_billable'
            )->default(false);

            /*
            |--------------------------------------------------------------------------
            | STATUS
            |--------------------------------------------------------------------------
            */

            $table->enum(
                'status',
                [
                    'pending',
                    'approved',
                    'rejected',
                    'reimbursed',
                ]
            )->default('pending');

            /*
            |--------------------------------------------------------------------------
            | DATES
            |--------------------------------------------------------------------------
            */

            $table->date(
                'expense_date'
            );

            $table->timestamp(
                'approved_at'
            )->nullable();

            $table->timestamp(
                'reimbursed_at'
            )->nullable();

            /*
            |--------------------------------------------------------------------------
            | APPROVAL
            |--------------------------------------------------------------------------
            */

            $table->uuid(
                'approved_by'
            )->nullable();

            $table->longText(
                'rejection_reason'
            )->nullable();

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
            | INDEXES
            |--------------------------------------------------------------------------
            */

            $table->index('company_id');

            $table->index('project_id');

            $table->index('user_id');

            $table->index('status');

            $table->index('expense_date');

            /*
            |--------------------------------------------------------------------------
            | FOREIGN KEYS
            |--------------------------------------------------------------------------
            */

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->cascadeOnDelete();

            $table->foreign('project_id')
                ->references('id')
                ->on('projects')
                ->cascadeOnDelete();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            $table->foreign('approved_by')
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
        Schema::dropIfExists('expenses');
    }
};
