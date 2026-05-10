<?php

namespace App\Services;

use App\Models\ActivityLog;

class ActivityLogService
{
    public function log(
        string $action,
        string $module,
        ?string $referenceId = null,
        ?array $oldValue = null,
        ?array $newValue = null
    ) {

        return ActivityLog::create([

            'user_id'
                => auth()->id(),

            'company_id'
                => auth()->user()?->company_id,

            'action'
                => $action,

            'module'
                => $module,

            'reference_id'
                => $referenceId,

            'old_value'
                => $oldValue,

            'new_value'
                => $newValue,

            'ip_address'
                => request()->ip(),

            'user_agent'
                => request()->userAgent(),
        ]);
    }
}
