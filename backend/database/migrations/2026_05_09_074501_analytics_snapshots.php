<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(
            'analytics_snapshots',
            function (Blueprint $table) {

                $table->uuid('id')
                    ->primary();

                $table->uuid(
                    'company_id'
                );

                $table->string(
                    'type'
                );

                $table->json(
                    'data'
                )->nullable();

                $table->date(
                    'snapshot_date'
                );

                $table->timestamps();

                $table->softDeletes();
            }
        );
    }

    public function down(): void
    {
        Schema::dropIfExists(
            'analytics_snapshots'
        );
    }
};
