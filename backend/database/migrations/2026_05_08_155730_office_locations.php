<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('office_locations', function (
            Blueprint $table
        ) {

            $table->uuid('id')->primary();

            $table->uuid('company_id');

            $table->string('branch_name');

            $table->decimal(
                'latitude',
                10,
                7
            );

            $table->decimal(
                'longitude',
                10,
                7
            );

            $table->integer(
                'allowed_radius_meter'
            )->default(60);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('office_locations');
    }
};
