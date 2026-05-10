<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Company;


class DemoUsersSeeder extends Seeder
{
    public function run()
    {

        // Super Admin User (IMPORTANT)
        User::create([
            'id' => Str::uuid(),
            'name' => "Super Admin User",
            'email' => "admin@mail.com",
            'password' => Hash::make('123456'),
            'company_id' => Str::uuid(),
            'role' => 'super_admin'
        ]);

        // Freelancer User (IMPORTANT)
        User::create([
            'id' => Str::uuid(),
            'name' => "Freelancer User",
            'email' => "freelancer_user@mail.com",
            'password' => Hash::make('123456'),
            'company_id' => Str::uuid(),
            'role' => 'freelancer'
        ]);

        // Client User (IMPORTANT)
        User::create([
            'id' => Str::uuid(),
            'name' => " Client User",
            'email' => "client_user@mail.com",
            'password' => Hash::make('123456'),
            'company_id' => Str::uuid(),
            'role' => 'client'
        ]);

        // Create Company
        for ($i = 1; $i <= 3; $i++) {
            $company = Company::create([
                'id' => Str::uuid(),
                'name' => "Demo Company $i",
                'slug' => "demo-company-$i",
                'currency' => 'INR',
                'timezone' => 'UTC'
            ]);

            // Create Users
            for ($j = 1; $j <= 5; $j++) {
                $rand = Str::random(12);
                User::create([
                    'id' => Str::uuid(),
                    'name' => "User_" . $rand,
                    'email' => "user_$rand@mail.com",
                    'password' => Hash::make('123456'),
                    'company_id' => $company->id,
                    'role' => 'company_staff'
                ]);
            }

            // Admin User (IMPORTANT)
            User::create([
                'id' => Str::uuid(),
                'name' => "Company Admin User $i",
                'email' => "compmany_admin_user_$i@mail.com",
                'password' => Hash::make('123456'),
                'company_id' => $company->id,
                'role' => 'company'
            ]);
        }
    }
}
