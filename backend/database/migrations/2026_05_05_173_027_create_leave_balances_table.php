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
        Schema::create(
            'leave_balances',
            function (Blueprint $table) {

                $table->uuid('id')
                    ->primary();

                /*
                |--------------------------------------------------------------------------
                | RELATIONS
                |--------------------------------------------------------------------------
                */

                $table->uuid(
                    'company_id'
                );

                $table->uuid(
                    'user_id'
                );

                $table->uuid(
                    'leave_type_id'
                );

                /*
                |--------------------------------------------------------------------------
                | YEAR
                |--------------------------------------------------------------------------
                */

                $table->year(
                    'year'
                );

                /*
                |--------------------------------------------------------------------------
                | LEAVE COUNTS
                |--------------------------------------------------------------------------
                */

                $table->decimal(
                    'allocated_days',
                    8,
                    2
                )->default(0);

                $table->decimal(
                    'used_days',
                    8,
                    2
                )->default(0);

                $table->decimal(
                    'remaining_days',
                    8,
                    2
                )->default(0);

                /*
                |--------------------------------------------------------------------------
                | CARRY FORWARD
                |--------------------------------------------------------------------------
                */

                $table->decimal(
                    'carry_forward_days',
                    8,
                    2
                )->default(0);

                /*
                |--------------------------------------------------------------------------
                | EXTRA
                |--------------------------------------------------------------------------
                */

                $table->decimal(
                    'manual_adjustment_days',
                    8,
                    2
                )->default(0);

                /*
                |--------------------------------------------------------------------------
                | STATUS
                |--------------------------------------------------------------------------
                */

                $table->boolean(
                    'is_active'
                )->default(true);

                $table->timestamps();

                $table->softDeletes();

                /*
                |--------------------------------------------------------------------------
                | FOREIGN KEYS
                |--------------------------------------------------------------------------
                */

                $table->foreign(
                    'company_id'
                )
                    ->references('id')
                    ->on('companies')
                    ->cascadeOnDelete();

                $table->foreign(
                    'user_id'
                )
                    ->references('id')
                    ->on('users')
                    ->cascadeOnDelete();

                $table->foreign(
                    'leave_type_id'
                )
                    ->references('id')
                    ->on('leave_types')
                    ->cascadeOnDelete();

                /*
                |--------------------------------------------------------------------------
                | UNIQUE
                |--------------------------------------------------------------------------
                */

                $table->unique([
                    'user_id',
                    'leave_type_id',
                    'year',
                ]);
            }
        );

        Schema::create(
            'leave_balance_transactions',
            function (Blueprint $table) {

                $table->uuid('id')
                    ->primary();

                /*
                |--------------------------------------------------------------------------
                | RELATIONS
                |--------------------------------------------------------------------------
                */

                $table->uuid(
                    'leave_balance_id'
                );

                $table->uuid(
                    'user_id'
                );

                $table->uuid(
                    'leave_application_id'
                )->nullable();

                /*
                |--------------------------------------------------------------------------
                | TRANSACTION
                |--------------------------------------------------------------------------
                */

                $table->enum(
                    'type',
                    [
                        'allocated',
                        'used',
                        'credited',
                        'debited',
                        'carry_forward',
                        'manual_adjustment',
                    ]
                );

                $table->decimal(
                    'days',
                    8,
                    2
                );

                /*
                |--------------------------------------------------------------------------
                | NOTES
                |--------------------------------------------------------------------------
                */

                $table->text(
                    'note'
                )->nullable();

                /*
                |--------------------------------------------------------------------------
                | ACTION USER
                |--------------------------------------------------------------------------
                */

                $table->uuid(
                    'created_by'
                )->nullable();

                $table->timestamps();

                /*
                |--------------------------------------------------------------------------
                | FOREIGN
                |--------------------------------------------------------------------------
                */

                $table->foreign(
                    'leave_balance_id'
                )
                    ->references('id')
                    ->on('leave_balances')
                    ->cascadeOnDelete();

                $table->foreign(
                    'user_id'
                )
                    ->references('id')
                    ->on('users')
                    ->cascadeOnDelete();
            }
        );
    }

    /**
     * Reverse migrations
     */
    public function down(): void
    {
        Schema::dropIfExists(
            'leave_balances'
        );
         Schema::dropIfExists(
            'leave_balance_transactions'
        );
    }
};
