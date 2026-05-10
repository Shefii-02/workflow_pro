<?php

namespace App\Http\Controllers\Api;

use App\Services\AnalyticsService;
use App\Http\Controllers\Controller;

class AnalyticsController extends Controller
{
    public function __construct(
        protected AnalyticsService $service
    ) {}

    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */

    public function dashboard()
    {

        return response()->json([

            'success' => true,

            'message'
                => 'Analytics dashboard fetched successfully',

            'data'
                => $this->service
                    ->dashboard(),
        ]);
    }
}
