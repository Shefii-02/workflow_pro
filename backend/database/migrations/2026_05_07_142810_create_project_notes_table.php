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
        Schema::create('project_notes', function (Blueprint $table) {

            $table->uuid('id')->primary();

            $table->uuid('company_id');

            $table->uuid('project_id');

            $table->uuid('created_by');

            $table->string('title');

            $table->longText('content');

            $table->boolean('is_pinned')
                ->default(false);

            $table->boolean('is_private')
                ->default(false);

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

            $table->index('created_by');

            $table->index('is_pinned');
        });
    }

    /**
     * Reverse migrations
     */
    public function down(): void
    {
        Schema::dropIfExists('project_notes');
    }
};
