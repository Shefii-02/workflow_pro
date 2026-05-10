<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('leaves', function (Blueprint $table) {
              $table->uuid('id')
                    ->primary();

                /*
                |--------------------------------------------------------------------------
                | COMPANY
                |--------------------------------------------------------------------------
                */

                $table->uuid('company_id');

                $table->uuid('user_id');

                $table->uuid('leave_type_id');

                /*
                |--------------------------------------------------------------------------
                | LEAVE DATES
                |--------------------------------------------------------------------------
                */

                $table->date(
                    'start_date'
                );

                $table->date(
                    'end_date'
                );

                $table->decimal(
                    'total_days',
                    5,
                    2
                )->default(1);

                /*
                |--------------------------------------------------------------------------
                | HALF DAY
                |--------------------------------------------------------------------------
                */

                $table->boolean(
                    'is_half_day'
                )->default(false);

                $table->enum(
                    'half_day_type',
                    [
                        'first_half',
                        'second_half',
                    ]
                )->nullable();

                /*
                |--------------------------------------------------------------------------
                | CONTENT
                |--------------------------------------------------------------------------
                */

                $table->longText(
                    'reason'
                )->nullable();

                /*
                |--------------------------------------------------------------------------
                | ATTACHMENT
                |--------------------------------------------------------------------------
                */

                $table->string(
                    'attachment'
                )->nullable();

                $table->string(
                    'attachment_original_name'
                )->nullable();

                $table->string(
                    'attachment_file_type'
                )->nullable();

                $table->string(
                    'attachment_file_size'
                )->nullable();

                /*
                |--------------------------------------------------------------------------
                | APPROVAL
                |--------------------------------------------------------------------------
                */

                $table->enum(
                    'status',
                    [
                        'pending',
                        'approved',
                        'rejected',
                        'cancelled',
                    ]
                )->default('pending');

                $table->uuid(
                    'approved_by'
                )->nullable();

                $table->timestamp(
                    'approved_at'
                )->nullable();

                $table->longText(
                    'rejection_reason'
                )->nullable();

                /*
                |--------------------------------------------------------------------------
                | PAYROLL
                |--------------------------------------------------------------------------
                */

                $table->boolean(
                    'salary_deducted'
                )->default(false);

                $table->boolean(
                    'is_paid_leave'
                )->default(true);

                /*
                |--------------------------------------------------------------------------
                | EMERGENCY
                |--------------------------------------------------------------------------
                */

                $table->boolean(
                    'is_emergency'
                )->default(false);

                /*
                |--------------------------------------------------------------------------
                | CONTACT
                |--------------------------------------------------------------------------
                */

                $table->string(
                    'emergency_contact'
                )->nullable();

                /*
                |--------------------------------------------------------------------------
                | ADMIN NOTES
                |--------------------------------------------------------------------------
                */

                $table->longText(
                    'admin_note'
                )->nullable();

                /*
                |--------------------------------------------------------------------------
                | AUDIT
                |--------------------------------------------------------------------------
                */

                $table->string(
                    'ip_address',
                    50
                )->nullable();

                $table->text(
                    'user_agent'
                )->nullable();

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

                $table->foreign(
                    'approved_by'
                )
                    ->references('id')
                    ->on('users')
                    ->nullOnDelete();

                /*
                |--------------------------------------------------------------------------
                | INDEXES
                |--------------------------------------------------------------------------
                */

                $table->index([
                    'company_id',
                    'user_id',
                ]);

                $table->index([
                    'status',
                ]);

                $table->index([
                    'start_date',
                    'end_date',
                ]);
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('leaves');
    }
};
