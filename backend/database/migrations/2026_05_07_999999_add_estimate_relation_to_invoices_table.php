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
        Schema::table(
            'invoices',
            function (Blueprint $table) {

                $table->uuid('estimate_id')
                    ->nullable()
                    ->after('project_id');

                $table->foreign('estimate_id')
                    ->references('id')
                    ->on('project_estimates')
                    ->nullOnDelete();
            }
        );
    }

    /**
     * Reverse migrations
     */
    public function down(): void
    {
        Schema::table(
            'invoices',
            function (Blueprint $table) {

                $table->dropForeign([
                    'estimate_id'
                ]);

                $table->dropColumn(
                    'estimate_id'
                );
            }
        );
    }
};
