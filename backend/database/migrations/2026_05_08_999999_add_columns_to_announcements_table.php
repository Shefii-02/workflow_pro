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
            'announcements',
            function (Blueprint $table) {
                /*
    |--------------------------------------------------------------------------
    | VISIBILITY
    |--------------------------------------------------------------------------
    */

                $table->enum(
                    'visibility',
                    [
                        'all',
                        'roles',
                        'departments',
                        'selected_users',
                        'company_only',
                        'company_staffs',
                        'freelancers',
                        'clients',
                        'admin_staffs'
                    ]
                )->default('all')->change();


                $table->json(
                    'target_departments'
                )->nullable();

                $table->json(
                    'target_users'
                )->nullable();

                /*
    |--------------------------------------------------------------------------
    | SETTINGS
    |--------------------------------------------------------------------------
    */


                $table->boolean(
                    'send_push'
                )->default(false);

                $table->boolean(
                    'send_email'
                )->default(false);

                /*
    |--------------------------------------------------------------------------
    | ATTACHMENT
    |--------------------------------------------------------------------------
    */

                $table->string(
                    'attachment'
                )->nullable();


                $table->softDeletes();
            }
        );
    }

    /**
     * Reverse migrations.
     */
    public function down(): void
    {
        Schema::table(
            'announcements',
            function (Blueprint $table) {
                $table->dropColumn(['target_departments','target_users','expires_at','send_push','send_email','attachment']);
                $table->dropSoftDeletes();
            }
        );
    }
};
