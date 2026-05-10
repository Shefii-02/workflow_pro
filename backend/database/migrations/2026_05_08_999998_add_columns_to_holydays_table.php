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
        Schema::table(
            'holidays',
            function (Blueprint $table) {
                $table->boolean('is_paid')->default(true)->nullable()->after('is_recurring');
                $table->string('holiday_type')->nullable()->after('is_paid');
            }
        );
    }

    /**
     * Reverse migrations.
     */
    public function down(): void
    {
        Schema::table(
            'holidays',
            function (Blueprint $table) {
                $table->dropColumn('is_paid');
                $table->dropColumn('holyday_type');
            }
        );
    }
};
