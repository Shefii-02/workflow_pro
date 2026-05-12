<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Role;
use App\Models\Permission;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Create permissions
        $permissions = [
            // Dashboard
            ['name' => 'View Dashboard', 'slug' => 'view_dashboard', 'module' => 'dashboard', 'action' => 'view'],

            // Companies
            ['name' => 'Manage Companies', 'slug' => 'manage_companies', 'module' => 'companies', 'action' => 'manage'],
            ['name' => 'View Companies', 'slug' => 'view_companies', 'module' => 'companies', 'action' => 'view'],

            // Freelancers
            ['name' => 'Manage Freelancers', 'slug' => 'manage_freelancers', 'module' => 'freelancers', 'action' => 'manage'],
            ['name' => 'View Freelancers', 'slug' => 'view_freelancers', 'module' => 'freelancers', 'action' => 'view'],

            // Subscriptions
            ['name' => 'Manage Subscriptions', 'slug' => 'manage_subscriptions', 'module' => 'subscriptions', 'action' => 'manage'],
            ['name' => 'View Subscriptions', 'slug' => 'view_subscriptions', 'module' => 'subscriptions', 'action' => 'view'],

            // Staff
            ['name' => 'Manage Staff', 'slug' => 'manage_staff', 'module' => 'staff', 'action' => 'manage'],
            ['name' => 'View Staff', 'slug' => 'view_staff', 'module' => 'staff', 'action' => 'view'],

            // Permissions
            ['name' => 'Manage Permissions', 'slug' => 'manage_permissions', 'module' => 'permissions', 'action' => 'manage'],
            ['name' => 'View Permissions', 'slug' => 'view_permissions', 'module' => 'permissions', 'action' => 'view'],

            // Support
            ['name' => 'Manage Support', 'slug' => 'manage_support', 'module' => 'support', 'action' => 'manage'],
            ['name' => 'View Support', 'slug' => 'view_support', 'module' => 'support', 'action' => 'view'],

            // Finance
            ['name' => 'Manage Finances', 'slug' => 'manage_finances', 'module' => 'finance', 'action' => 'manage'],
            ['name' => 'View Finances', 'slug' => 'view_finances', 'module' => 'finance', 'action' => 'view'],

            // Monitoring
            ['name' => 'View Monitoring', 'slug' => 'view_monitoring', 'module' => 'monitoring', 'action' => 'view'],

            // Announcements
            ['name' => 'Manage Announcements', 'slug' => 'manage_announcements', 'module' => 'announcements', 'action' => 'manage'],
            ['name' => 'View Announcements', 'slug' => 'view_announcements', 'module' => 'announcements', 'action' => 'view'],

            // Analytics
            ['name' => 'View Analytics', 'slug' => 'view_analytics', 'module' => 'analytics', 'action' => 'view'],

            // Settings
            ['name' => 'Edit Settings', 'slug' => 'edit_settings', 'module' => 'settings', 'action' => 'edit'],
            ['name' => 'View Settings', 'slug' => 'view_settings', 'module' => 'settings', 'action' => 'view'],

            // Projects
            ['name' => 'Manage Projects', 'slug' => 'manage_projects', 'module' => 'projects', 'action' => 'manage'],
            ['name' => 'View Projects', 'slug' => 'view_projects', 'module' => 'projects', 'action' => 'view'],

            // Tasks
            ['name' => 'Manage Tasks', 'slug' => 'manage_tasks', 'module' => 'tasks', 'action' => 'manage'],
            ['name' => 'View Tasks', 'slug' => 'view_tasks', 'module' => 'tasks', 'action' => 'view'],

            // Data operations
            ['name' => 'Export Data', 'slug' => 'export_data', 'module' => 'data', 'action' => 'export'],
            ['name' => 'Delete Data', 'slug' => 'delete_data', 'module' => 'data', 'action' => 'delete'],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }

        // Create roles
        $superAdminRole = Role::create([
            'id' => Str::uuid(),
            'name' => 'Super Admin',
            'slug' => 'super_admin',
            'description' => 'Full system access',
            'is_system' => true,
        ]);

        $companyAdminRole = Role::create([
            'id' => Str::uuid(),
            'name' => 'Company Admin',
            'slug' => 'company_admin',
            'description' => 'Company administration access',
            'is_system' => false,
        ]);

        $freelancerRole = Role::create([
            'id' => Str::uuid(),
            'name' => 'Freelancer',
            'slug' => 'freelancer',
            'description' => 'Freelancer access',
            'is_system' => false,
        ]);

        $clientRole = Role::create([
            'id' => Str::uuid(),
            'name' => 'Client',
            'slug' => 'client',
            'description' => 'Client access',
            'is_system' => false,
        ]);

        // Assign all permissions to super admin
        $superAdminRole->permissions()->attach(Permission::all()->pluck('id'));

        // Assign company permissions to company admin
        $companyPermissions = Permission::whereIn('module', [
            'dashboard', 'projects', 'tasks', 'finance', 'analytics', 'settings', 'data'
        ])->pluck('id');
        $companyAdminRole->permissions()->attach($companyPermissions);

        // Assign freelancer permissions
        $freelancerPermissions = Permission::whereIn('slug', [
            'view_dashboard', 'manage_projects', 'view_analytics', 'export_data'
        ])->pluck('id');
        $freelancerRole->permissions()->attach($freelancerPermissions);

        // Assign client permissions
        $clientPermissions = Permission::whereIn('slug', [
            'view_dashboard', 'view_projects', 'view_tasks', 'view_analytics'
        ])->pluck('id');
        $clientRole->permissions()->attach($clientPermissions);

        // Assign roles to demo users
        $superAdminUser = User::where('email', 'admin@mail.com')->first();
        if ($superAdminUser) {
            $superAdminUser->roles()->attach($superAdminRole->id);
        }

        $freelancerUser = User::where('email', 'freelancer_user@mail.com')->first();
        if ($freelancerUser) {
            $freelancerUser->roles()->attach($freelancerRole->id);
        }

        $clientUser = User::where('email', 'client_user@mail.com')->first();
        if ($clientUser) {
            $clientUser->roles()->attach($clientRole->id);
        }

        // Assign company admin role to company admin users
        $companyAdmins = User::where('role', 'company')->get();
        foreach ($companyAdmins as $admin) {
            $admin->roles()->attach($companyAdminRole->id);
        }
    }
}
