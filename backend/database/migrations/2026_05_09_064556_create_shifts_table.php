<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shifts', function (Blueprint $table) {

            $table->uuid('id')->primary();

            $table->uuid('company_id');

            $table->string('name');

            $table->string('code')->nullable();

            $table->time('start_time');

            $table->time('end_time');

            $table->integer('working_hours')->default(8);

            $table->integer('break_duration_minutes')->default(60);

            $table->integer('late_mark_after_minutes')->default(15);

            $table->integer('half_day_after_minutes')->default(240);

            $table->integer('grace_minutes')->default(10);

            $table->boolean('is_night_shift')->default(false);

            $table->boolean('allow_overtime')->default(false);

            $table->integer('overtime_after_minutes')->nullable();

            $table->json('weekly_off_days')->nullable();

            $table->text('description')->nullable();

            $table->boolean('status')->default(true);

            $table->timestamps();

            $table->softDeletes();

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shifts');
    }
};
