<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run migrations
     */
    public function up(): void
    {
        Schema::create('project_estimates', function (Blueprint $table) {

            $table->uuid('id')->primary();

            /*
            |--------------------------------------------------------------------------
            | RELATIONS
            |--------------------------------------------------------------------------
            */

            $table->uuid('company_id');

            $table->uuid('project_id');

            $table->uuid('client_id')->nullable();

            $table->uuid('created_by');

            /*
            |--------------------------------------------------------------------------
            | BASIC INFO
            |--------------------------------------------------------------------------
            */

            $table->string('estimate_number')
                ->unique();

            $table->string('title');

            $table->text('description')
                ->nullable();

            /*
            |--------------------------------------------------------------------------
            | COST
            |--------------------------------------------------------------------------
            */

            $table->decimal(
                'subtotal',
                12,
                2
            )->default(0);

            $table->decimal(
                'tax_percent',
                5,
                2
            )->default(0);

            $table->decimal(
                'tax_amount',
                12,
                2
            )->default(0);

            $table->decimal(
                'discount_amount',
                12,
                2
            )->default(0);

            $table->decimal(
                'total_amount',
                12,
                2
            )->default(0);

            /*
            |--------------------------------------------------------------------------
            | HOURS & TIMELINE
            |--------------------------------------------------------------------------
            */

            $table->integer('estimated_hours')
                ->default(0);

            $table->integer('estimated_days')
                ->default(0);

            $table->date('estimated_completion_date')
                ->nullable();

            /*
            |--------------------------------------------------------------------------
            | STATUS
            |--------------------------------------------------------------------------
            */

            $table->enum('status', [
                'draft',
                'sent',
                'approved',
                'rejected',
                'expired',
                'converted_to_invoice',
            ])->default('draft');

            /*
            |--------------------------------------------------------------------------
            | CONVERSION
            |--------------------------------------------------------------------------
            */

            $table->uuid('invoice_id')
                ->nullable();

            /*
            |--------------------------------------------------------------------------
            | DATES
            |--------------------------------------------------------------------------
            */

            $table->date('issue_date')
                ->nullable();

            $table->date('expiry_date')
                ->nullable();

            /*
            |--------------------------------------------------------------------------
            | EXTRA
            |--------------------------------------------------------------------------
            */

            $table->longText('terms_conditions')
                ->nullable();

            $table->longText('notes')
                ->nullable();

            $table->string('currency')
                ->default('USD');

            /*
            |--------------------------------------------------------------------------
            | FILES
            |--------------------------------------------------------------------------
            */

            $table->text('pdf_url')
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

            $table->foreign('client_id')
                ->references('id')
                ->on('users')
                ->nullOnDelete();

            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            /*
            |--------------------------------------------------------------------------
            | INDEXES
            |--------------------------------------------------------------------------
            */

            $table->index('company_id');

            $table->index('project_id');

            $table->index('status');

            $table->index('estimate_number');
        });
    }

    /**
     * Reverse migrations
     */
    public function down(): void
    {
        Schema::dropIfExists(
            'project_estimates'
        );
    }
};
