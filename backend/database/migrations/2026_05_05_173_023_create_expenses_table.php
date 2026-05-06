<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
Schema::create('expenses', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->uuid('company_id');
    $table->uuid('user_id');

    $table->string('title');
    $table->decimal('amount', 10, 2);

    $table->date('expense_date')->useCurrent();

    $table->timestamps();

    $table->foreign('company_id')->references('id')->on('companies')->cascadeOnDelete();
});
    }
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
