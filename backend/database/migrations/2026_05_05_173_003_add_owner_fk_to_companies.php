<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('companies', function (Blueprint $table) {
            $table->foreign('owner_id')->references('id')->on('users')->nullOnDelete();
        });

        Schema::table('users', function (Blueprint $table) {
            // $table->foreign('company_id')->references('id')->on('companies')->nullOnDelete();
        });
    }

    public function down(): void {
        Schema::table('companies', fn(Blueprint $t) => $t->dropForeign(['owner_id']));
        Schema::table('users', fn(Blueprint $t) => $t->dropForeign(['company_id']));
    }
};
