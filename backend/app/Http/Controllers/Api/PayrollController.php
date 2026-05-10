<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Payroll;
use Illuminate\Http\Request;
use App\Services\PayrollService;
use App\Http\Controllers\Controller;
use App\Repositories\PayrollRepository;

class PayrollController extends Controller
{
    public function __construct(
        protected PayrollRepository $repository,
        protected PayrollService $service,
    ) {}

    /*
    |--------------------------------------------------------------------------
    | LIST
    |--------------------------------------------------------------------------
    */

    public function index()
    {

        return response()->json([

            'success' => true,

            'data'
                => $this->repository
                    ->getAll(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show(
        Payroll $payroll
    )
    {

        return response()->json([

            'success' => true,

            'data'
                => $payroll->load([
                    'items',
                    'user',
                ]),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | GENERATE
    |--------------------------------------------------------------------------
    */

    public function generate(
        Request $request
    )
    {

        $request->validate([

            'user_id'
                => 'required|exists:users,id',

            'month'
                => 'required|string',
        ]);

        $user = User::findOrFail(
            $request->user_id
        );

        $payroll = $this->service
            ->generate(
                $user,
                $request->month
            );

        return response()->json([

            'success' => true,

            'message'
                => 'Payroll generated successfully',

            'data'
                => $payroll,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | MARK PAID
    |--------------------------------------------------------------------------
    */

    public function markPaid(
        Payroll $payroll
    )
    {

        $payroll = $this->service
            ->markPaid($payroll);

        return response()->json([

            'success' => true,

            'message'
                => 'Payroll marked paid',

            'data'
                => $payroll,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Payroll $payroll
    )
    {

        $this->service
            ->delete($payroll);

        return response()->json([

            'success' => true,

            'message'
                => 'Payroll deleted successfully',
        ]);
    }
}
