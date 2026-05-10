<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employee_shifts', function (Blueprint $table) {

            $table->uuid('id')->primary();

            $table->uuid('company_id');

            $table->uuid('user_id');

            $table->uuid('shift_id');

            $table->date('effective_from');

            $table->date('effective_to')->nullable();

            $table->timestamps();

            $table->softDeletes();

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->cascadeOnDelete();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            $table->foreign('shift_id')
                ->references('id')
                ->on('shifts')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employee_shifts');
    }
};
