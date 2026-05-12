<?php

namespace Database\Seeders;

use App\Models\Company;
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
        // Create comprehensive permissions list
        //       $permissions = [

        //     /*
        //     |--------------------------------------------------------------------------
        //     | ================= SHARED (ALL TYPES) =================
        //     |--------------------------------------------------------------------------
        //     */

        //     ['name' => 'View Dashboard', 'slug' => 'view_dashboard', 'module' => 'dashboard', 'action' => 'view', 'acc_type' => 'all'],

        //     /*
        //     |--------------------------------------------------------------------------
        //     | ================= COMPANY + COMPANY STAFF =================
        //     |--------------------------------------------------------------------------
        //     */

        //     // Projects
        //     ['name' => 'Manage Projects', 'slug' => 'manage_projects', 'module' => 'projects', 'action' => 'manage', 'acc_type' => 'company'],
        //     ['name' => 'View Projects', 'slug' => 'view_projects', 'module' => 'projects', 'action' => 'view', 'acc_type' => 'company'],

        //     // Tasks
        //     ['name' => 'Manage Tasks', 'slug' => 'manage_tasks', 'module' => 'tasks', 'action' => 'manage', 'acc_type' => 'company'],
        //     ['name' => 'View Tasks', 'slug' => 'view_tasks', 'module' => 'tasks', 'action' => 'view', 'acc_type' => 'company'],

        //     // Timelog
        //     ['name' => 'Manage Timelog', 'slug' => 'manage_timelog', 'module' => 'timelog', 'action' => 'manage', 'acc_type' => 'company'],
        //     ['name' => 'View Timelog', 'slug' => 'view_timelog', 'module' => 'timelog', 'action' => 'view', 'acc_type' => 'company'],

        //     // Comments
        //     ['name' => 'Manage Comments', 'slug' => 'manage_comments', 'module' => 'comments', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Project Members
        //     ['name' => 'Manage Project Members', 'slug' => 'manage_project_members', 'module' => 'project_members', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Attendance
        //     ['name' => 'Manage Attendance', 'slug' => 'manage_attendance', 'module' => 'attendance', 'action' => 'manage', 'acc_type' => 'company'],
        //     ['name' => 'View Attendance', 'slug' => 'view_attendance', 'module' => 'attendance', 'action' => 'view', 'acc_type' => 'company'],

        //     // Meetings
        //     ['name' => 'Manage Meetings', 'slug' => 'manage_meetings', 'module' => 'meetings', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Notes
        //     ['name' => 'Manage Notes', 'slug' => 'manage_notes', 'module' => 'notes', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Estimates
        //     ['name' => 'Manage Estimates', 'slug' => 'manage_estimates', 'module' => 'estimates', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Invoices
        //     ['name' => 'Manage Invoices', 'slug' => 'manage_invoices', 'module' => 'invoices', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Expenses
        //     ['name' => 'Manage Expenses', 'slug' => 'manage_expenses', 'module' => 'expenses', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Staff
        //     ['name' => 'Manage Staff', 'slug' => 'manage_staff', 'module' => 'staff', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Clients
        //     ['name' => 'Manage Clients', 'slug' => 'manage_clients', 'module' => 'clients', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Roles
        //     ['name' => 'Manage Roles', 'slug' => 'manage_roles', 'module' => 'roles', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Departments
        //     ['name' => 'Manage Departments', 'slug' => 'manage_departments', 'module' => 'departments', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Break Types
        //     ['name' => 'Manage Break Types', 'slug' => 'manage_break_types', 'module' => 'break_types', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Holidays
        //     ['name' => 'Manage Holidays', 'slug' => 'manage_holidays', 'module' => 'holidays', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Leave Types
        //     ['name' => 'Manage Leave Types', 'slug' => 'manage_leave_types', 'module' => 'leave_types', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Leaves
        //     ['name' => 'Manage Leaves', 'slug' => 'manage_leaves', 'module' => 'leaves', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Shifts
        //     ['name' => 'Manage Shifts', 'slug' => 'manage_shifts', 'module' => 'shifts', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Payroll
        //     ['name' => 'Manage Payroll', 'slug' => 'manage_payroll', 'module' => 'payroll', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Reports
        //     ['name' => 'View Reports', 'slug' => 'view_reports', 'module' => 'reports', 'action' => 'view', 'acc_type' => 'company'],

        //     // Support
        //     ['name' => 'Manage Support Tickets', 'slug' => 'manage_support_tickets', 'module' => 'support_tickets', 'action' => 'manage', 'acc_type' => 'company'],

        //     // Chat
        //     ['name' => 'View Chat', 'slug' => 'view_chat', 'module' => 'chat', 'action' => 'view', 'acc_type' => 'company'],

        //     // Announcements
        //     ['name' => 'Manage Announcements', 'slug' => 'manage_announcements', 'module' => 'announcements', 'action' => 'manage', 'acc_type' => 'company'],

        //     /*
        //     |--------------------------------------------------------------------------
        //     | ================= SUPER ADMIN / ADMIN / ADMIN STAFF =================
        //     |--------------------------------------------------------------------------
        //     */

        //     ['name' => 'Manage Companies', 'slug' => 'manage_companies', 'module' => 'companies', 'action' => 'manage', 'acc_type' => 'super_admin'],
        //     ['name' => 'Manage Freelancers', 'slug' => 'manage_freelancers', 'module' => 'freelancers', 'action' => 'manage', 'acc_type' => 'super_admin'],
        //     ['name' => 'Manage Subscriptions', 'slug' => 'manage_subscriptions', 'module' => 'subscriptions', 'action' => 'manage', 'acc_type' => 'super_admin'],
        //     ['name' => 'Manage Permissions', 'slug' => 'manage_permissions', 'module' => 'permissions', 'action' => 'manage', 'acc_type' => 'super_admin,admin'],
        //     ['name' => 'Manage Finance', 'slug' => 'manage_finance', 'module' => 'finance', 'action' => 'manage', 'acc_type' => 'super_admin,admin'],
        //     ['name' => 'View Monitoring', 'slug' => 'view_monitoring', 'module' => 'monitoring', 'action' => 'view', 'acc_type' => 'super_admin,admin'],
        //     ['name' => 'View Activities', 'slug' => 'view_activities', 'module' => 'activities', 'action' => 'view', 'acc_type' => 'super_admin'],

        //     /*
        //     |--------------------------------------------------------------------------
        //     | ================= FREELANCER =================
        //     |--------------------------------------------------------------------------
        //     */

        //     ['name' => 'View Projects', 'slug' => 'freelancer_projects', 'module' => 'projects', 'action' => 'view', 'acc_type' => 'freelancer'],
        //     ['name' => 'View Tasks', 'slug' => 'freelancer_tasks', 'module' => 'tasks', 'action' => 'view', 'acc_type' => 'freelancer'],
        //     ['name' => 'View Files', 'slug' => 'freelancer_files', 'module' => 'files', 'action' => 'view', 'acc_type' => 'freelancer'],
        //     ['name' => 'View Invoices', 'slug' => 'freelancer_invoices', 'module' => 'invoices', 'action' => 'view', 'acc_type' => 'freelancer'],
        //     ['name' => 'View Estimates', 'slug' => 'freelancer_estimates', 'module' => 'estimates', 'action' => 'view', 'acc_type' => 'freelancer'],
        //     ['name' => 'View Expenses', 'slug' => 'freelancer_expenses', 'module' => 'expenses', 'action' => 'view', 'acc_type' => 'freelancer'],
        //     ['name' => 'Chat Access', 'slug' => 'freelancer_chat', 'module' => 'chat', 'action' => 'view', 'acc_type' => 'freelancer'],

        //     /*
        //     |--------------------------------------------------------------------------
        //     | ================= CLIENT =================
        //     |--------------------------------------------------------------------------
        //     */

        //     ['name' => 'View Projects', 'slug' => 'client_projects', 'module' => 'projects', 'action' => 'view', 'acc_type' => 'client'],
        //     ['name' => 'View Earnings', 'slug' => 'client_earnings', 'module' => 'earnings', 'action' => 'view', 'acc_type' => 'client'],
        //     ['name' => 'View Invoices', 'slug' => 'client_invoices', 'module' => 'invoices', 'action' => 'view', 'acc_type' => 'client'],
        //     ['name' => 'View Estimates', 'slug' => 'client_estimates', 'module' => 'estimates', 'action' => 'view', 'acc_type' => 'client'],
        //     ['name' => 'View Subscriptions', 'slug' => 'client_subscriptions', 'module' => 'subscriptions', 'action' => 'view', 'acc_type' => 'client'],
        //     ['name' => 'Chat Access', 'slug' => 'client_chat', 'module' => 'chat', 'action' => 'view', 'acc_type' => 'client'],
        //     ['name' => 'Files Access', 'slug' => 'client_files', 'module' => 'files', 'action' => 'view', 'acc_type' => 'client'],
        //     ['name' => 'Settings Access', 'slug' => 'client_settings', 'module' => 'settings', 'action' => 'view', 'acc_type' => 'client'],
        // ];

        $permissions = [

            /*
    |--------------------------------------------------------------------------
    | ================= SHARED (ALL TYPES) =================
    |--------------------------------------------------------------------------
    */

            ['name' => 'View Dashboard', 'slug' => 'view_dashboard', 'module' => 'dashboard', 'action' => 'view', 'acc_type' => 'all'],

            /*
    |--------------------------------------------------------------------------
    | ================= COMPANY + COMPANY STAFF =================
    |--------------------------------------------------------------------------
    */

            // Projects
            ['name' => 'Manage Projects', 'slug' => 'manage_projects', 'module' => 'projects', 'action' => 'manage', 'acc_type' => 'company'],
            ['name' => 'View Projects', 'slug' => 'view_projects', 'module' => 'projects', 'action' => 'view', 'acc_type' => 'company'],

            // Tasks
            ['name' => 'Manage Tasks', 'slug' => 'manage_tasks', 'module' => 'tasks', 'action' => 'manage', 'acc_type' => 'company'],
            ['name' => 'View Tasks', 'slug' => 'view_tasks', 'module' => 'tasks', 'action' => 'view', 'acc_type' => 'company'],

            // Timelog
            ['name' => 'Manage Timelog', 'slug' => 'manage_timelog', 'module' => 'timelog', 'action' => 'manage', 'acc_type' => 'company'],
            ['name' => 'View Timelog', 'slug' => 'view_timelog', 'module' => 'timelog', 'action' => 'view', 'acc_type' => 'company'],

            // Comments
            ['name' => 'Manage Comments', 'slug' => 'manage_comments', 'module' => 'comments', 'action' => 'manage', 'acc_type' => 'company'],

            // Project Members
            ['name' => 'Manage Project Members', 'slug' => 'manage_project_members', 'module' => 'project_members', 'action' => 'manage', 'acc_type' => 'company'],

            // Attendance
            ['name' => 'Manage Attendance', 'slug' => 'manage_attendance', 'module' => 'attendance', 'action' => 'manage', 'acc_type' => 'company'],
            ['name' => 'View Attendance', 'slug' => 'view_attendance', 'module' => 'attendance', 'action' => 'view', 'acc_type' => 'company'],

            // Meetings
            ['name' => 'Manage Meetings', 'slug' => 'manage_meetings', 'module' => 'meetings', 'action' => 'manage', 'acc_type' => 'company'],

            // Notes
            ['name' => 'Manage Notes', 'slug' => 'manage_notes', 'module' => 'notes', 'action' => 'manage', 'acc_type' => 'company'],

            // Estimates
            ['name' => 'Manage Estimates', 'slug' => 'manage_estimates', 'module' => 'estimates', 'action' => 'manage', 'acc_type' => 'company'],

            // Invoices
            ['name' => 'Manage Invoices', 'slug' => 'manage_invoices', 'module' => 'invoices', 'action' => 'manage', 'acc_type' => 'company'],

            // Expenses
            ['name' => 'Manage Expenses', 'slug' => 'manage_expenses', 'module' => 'expenses', 'action' => 'manage', 'acc_type' => 'company'],

            // Staff
            ['name' => 'Manage Staff', 'slug' => 'manage_staff', 'module' => 'staff', 'action' => 'manage', 'acc_type' => 'company'],

            // Clients
            ['name' => 'Manage Clients', 'slug' => 'manage_clients', 'module' => 'clients', 'action' => 'manage', 'acc_type' => 'company'],

            // Roles
            ['name' => 'Manage Roles', 'slug' => 'manage_roles', 'module' => 'roles', 'action' => 'manage', 'acc_type' => 'company'],

            // Departments
            ['name' => 'Manage Departments', 'slug' => 'manage_departments', 'module' => 'departments', 'action' => 'manage', 'acc_type' => 'company'],

            // Break Types
            ['name' => 'Manage Break Types', 'slug' => 'manage_break_types', 'module' => 'break_types', 'action' => 'manage', 'acc_type' => 'company'],

            // Holidays
            ['name' => 'Manage Holidays', 'slug' => 'manage_holidays', 'module' => 'holidays', 'action' => 'manage', 'acc_type' => 'company'],

            // Leave Types
            ['name' => 'Manage Leave Types', 'slug' => 'manage_leave_types', 'module' => 'leave_types', 'action' => 'manage', 'acc_type' => 'company'],

            // Leaves
            ['name' => 'Manage Leaves', 'slug' => 'manage_leaves', 'module' => 'leaves', 'action' => 'manage', 'acc_type' => 'company'],

            // Shifts
            ['name' => 'Manage Shifts', 'slug' => 'manage_shifts', 'module' => 'shifts', 'action' => 'manage', 'acc_type' => 'company'],

            // Payroll
            ['name' => 'Manage Payroll', 'slug' => 'manage_payroll', 'module' => 'payroll', 'action' => 'manage', 'acc_type' => 'company'],

            // Reports
            ['name' => 'View Reports', 'slug' => 'view_reports', 'module' => 'reports', 'action' => 'view', 'acc_type' => 'company'],

            // Support
            ['name' => 'Manage Support Tickets', 'slug' => 'manage_support_tickets', 'module' => 'support_tickets', 'action' => 'manage', 'acc_type' => 'company'],

            // Chat
            ['name' => 'View Chat', 'slug' => 'view_chat', 'module' => 'chat', 'action' => 'view', 'acc_type' => 'company'],

            // Announcements
            ['name' => 'Manage Announcements', 'slug' => 'manage_announcements', 'module' => 'announcements', 'action' => 'manage', 'acc_type' => 'company'],

            /*
    |--------------------------------------------------------------------------
    | ================= SUPER ADMIN / ADMIN / ADMIN STAFF =================
    |--------------------------------------------------------------------------
    */

            ['name' => 'Manage Companies', 'slug' => 'manage_companies', 'module' => 'companies', 'action' => 'manage', 'acc_type' => 'super_admin'],
            ['name' => 'Manage Freelancers', 'slug' => 'manage_freelancers', 'module' => 'freelancers', 'action' => 'manage', 'acc_type' => 'super_admin'],
            ['name' => 'Manage Subscriptions', 'slug' => 'manage_subscriptions', 'module' => 'subscriptions', 'action' => 'manage', 'acc_type' => 'super_admin'],
            ['name' => 'Manage Permissions', 'slug' => 'manage_permissions', 'module' => 'permissions', 'action' => 'manage', 'acc_type' => 'super_admin,admin'],
            ['name' => 'Manage Finance', 'slug' => 'manage_finance', 'module' => 'finance', 'action' => 'manage', 'acc_type' => 'super_admin,admin'],
            ['name' => 'View Monitoring', 'slug' => 'view_monitoring', 'module' => 'monitoring', 'action' => 'view', 'acc_type' => 'super_admin,admin'],
            ['name' => 'View Activities', 'slug' => 'view_activities', 'module' => 'activities', 'action' => 'view', 'acc_type' => 'super_admin'],

            /*
    |--------------------------------------------------------------------------
    | ================= FREELANCER =================
    |--------------------------------------------------------------------------
    */

            ['name' => 'View Projects', 'slug' => 'freelancer_projects', 'module' => 'projects', 'action' => 'view', 'acc_type' => 'freelancer'],
            ['name' => 'View Tasks', 'slug' => 'freelancer_tasks', 'module' => 'tasks', 'action' => 'view', 'acc_type' => 'freelancer'],
            ['name' => 'View Files', 'slug' => 'freelancer_files', 'module' => 'files', 'action' => 'view', 'acc_type' => 'freelancer'],
            ['name' => 'View Invoices', 'slug' => 'freelancer_invoices', 'module' => 'invoices', 'action' => 'view', 'acc_type' => 'freelancer'],
            ['name' => 'View Estimates', 'slug' => 'freelancer_estimates', 'module' => 'estimates', 'action' => 'view', 'acc_type' => 'freelancer'],
            ['name' => 'View Expenses', 'slug' => 'freelancer_expenses', 'module' => 'expenses', 'action' => 'view', 'acc_type' => 'freelancer'],
            ['name' => 'Chat Access', 'slug' => 'freelancer_chat', 'module' => 'chat', 'action' => 'view', 'acc_type' => 'freelancer'],

            /*
    |--------------------------------------------------------------------------
    | ================= CLIENT =================
    |--------------------------------------------------------------------------
    */

            ['name' => 'View Projects', 'slug' => 'client_projects', 'module' => 'projects', 'action' => 'view', 'acc_type' => 'client'],
            ['name' => 'View Earnings', 'slug' => 'client_earnings', 'module' => 'earnings', 'action' => 'view', 'acc_type' => 'client'],
            ['name' => 'View Invoices', 'slug' => 'client_invoices', 'module' => 'invoices', 'action' => 'view', 'acc_type' => 'client'],
            ['name' => 'View Estimates', 'slug' => 'client_estimates', 'module' => 'estimates', 'action' => 'view', 'acc_type' => 'client'],
            ['name' => 'View Subscriptions', 'slug' => 'client_subscriptions', 'module' => 'subscriptions', 'action' => 'view', 'acc_type' => 'client'],
            ['name' => 'Chat Access', 'slug' => 'client_chat', 'module' => 'chat', 'action' => 'view', 'acc_type' => 'client'],
            ['name' => 'Files Access', 'slug' => 'client_files', 'module' => 'files', 'action' => 'view', 'acc_type' => 'client'],
            ['name' => 'Settings Access', 'slug' => 'client_settings', 'module' => 'settings', 'action' => 'view', 'acc_type' => 'client'],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }


        $wf_company = Company::where('slug', 'workflow')->first();
        if (!$wf_company) {
            Company::create([
                'id' => Str::uuid(),
                'name' => "Workflow",
                'slug' => "workflow",
                'currency' => 'INR',
                'timezone' => 'UTC'
            ]);
        }

        // Create roles
        $superAdminRole = Role::create([
            'id' => Str::uuid(),
            'name' => 'Super Admin',
            'slug' => 'super_admin',
            'description' => 'Full system access',
            'is_system' => true,
            'company_id' => $wf_company->id
        ]);

        $user = User::where('acc_type', 'super_admin')->fitst();

        $superAdminRole = Role::where('slug', 'super_admin')->first();

        $user->roles()->syncWithoutDetaching([$superAdminRole->id]);

        $adminRole = Role::create([
            'id' => Str::uuid(),
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'Admin access',
            'is_system' => true,
            'company_id' => $wf_company->id
        ]);

        $adminStaffRole = Role::create([
            'id' => Str::uuid(),
            'name' => 'Admin Staff',
            'slug' => 'admin_staff',
            'description' => 'Admin staff access',
            'is_system' => true,
            'company_id' => $wf_company->id
        ]);

        $companyRole = Role::create([
            'id' => Str::uuid(),
            'name' => 'Company',
            'slug' => 'company',
            'description' => 'Company access',
            'is_system' => false,
            'company_id' => $wf_company->id
        ]);

        $companyStaffRole = Role::create([
            'id' => Str::uuid(),
            'name' => 'Company Staff',
            'slug' => 'company_staff',
            'description' => 'Company staff access',
            'is_system' => false,
            'company_id' => $wf_company->id
        ]);

        $freelancerRole = Role::create([
            'id' => Str::uuid(),
            'name' => 'Freelancer',
            'slug' => 'freelancer',
            'description' => 'Freelancer access',
            'is_system' => false,
            'company_id' => $wf_company->id
        ]);

        $clientRole = Role::create([
            'id' => Str::uuid(),
            'name' => 'Client',
            'slug' => 'client',
            'description' => 'Client access',
            'is_system' => false,
            'company_id' => $wf_company->id
        ]);

        // Assign all permissions to super admin (ALL PERMISSIONS BY DEFAULT)
        $superAdminRole->permissions()->attach(Permission::all()->pluck('id'));

        // // Admin role gets same as super admin
        // $adminRole->permissions()->attach(Permission::all()->pluck('id'));

        // // Admin Staff gets system-wide management permissions
        // $adminStaffPermissions = Permission::whereIn('slug', [
        //     'view_dashboard',
        //     'manage_companies', 'view_companies',
        //     'manage_freelancers', 'view_freelancers',
        //     'manage_subscriptions', 'view_subscriptions',
        //     'manage_staff', 'view_staff',
        //     'manage_roles', 'view_roles',
        //     'manage_permissions', 'view_permissions',
        //     'manage_support_tickets', 'view_support_tickets',
        //     'manage_finance', 'view_finance',
        //     'view_monitoring',
        //     'view_chat',
        //     'view_activities',
        //     'manage_announcements', 'view_announcements',
        //     'edit_settings', 'view_settings',
        // ])->pluck('id');
        // $adminStaffRole->permissions()->attach($adminStaffPermissions);

        // // Company role gets all company-level permissions
        // $companyPermissions = Permission::whereIn('slug', [
        //     'view_dashboard',
        //     'manage_projects', 'view_projects',
        //     'manage_tasks', 'view_tasks',
        //     'manage_timelog', 'view_timelog',
        //     'manage_comments', 'view_comments',
        //     'manage_project_members', 'view_project_members',
        //     'manage_attendance', 'view_attendance',
        //     'manage_meetings', 'view_meetings',
        //     'manage_notes', 'view_notes',
        //     'manage_estimates', 'view_estimates',
        //     'manage_invoices', 'view_invoices',
        //     'manage_expenses', 'view_expenses',
        //     'manage_staff', 'view_staff',
        //     'manage_clients', 'view_clients',
        //     'manage_roles', 'view_roles',
        //     'manage_departments', 'view_departments',
        //     'manage_break_types', 'view_break_types',
        //     'manage_holidays', 'view_holidays',
        //     'manage_leave_types', 'view_leave_types',
        //     'manage_sticky_notes', 'view_sticky_notes',
        //     'manage_announcements', 'view_announcements',
        //     'manage_leaves', 'view_leaves',
        //     'manage_shifts', 'view_shifts',
        //     'manage_payroll', 'view_payroll',
        //     'view_reports',
        //     'manage_support_tickets', 'view_support_tickets',
        //     'view_chat',
        //     'edit_settings', 'view_settings',
        // ])->pluck('id');
        // $companyRole->permissions()->attach($companyPermissions);
        // $companyStaffRole->permissions()->attach($companyPermissions);

        // // Freelancer role permissions
        // $freelancerPermissions = Permission::whereIn('slug', [
        //     'view_dashboard',
        //     'view_projects',
        //     'view_tasks',
        //     'view_files',
        //     'view_invoices',
        //     'view_estimates',
        //     'view_expenses',
        //     'view_chat',
        //     'view_settings',
        // ])->pluck('id');
        // $freelancerRole->permissions()->attach($freelancerPermissions);

        // // Client role permissions
        // $clientPermissions = Permission::whereIn('slug', [
        //     'view_dashboard',
        //     'view_projects',
        //     'view_clients',
        //     'view_earnings',
        //     'view_invoices',
        //     'view_estimates',
        //     'view_subscriptions',
        //     'view_chat',
        //     'view_files',
        //     'view_settings',
        // ])->pluck('id');
        // $clientRole->permissions()->attach($clientPermissions);

        // // Assign roles to demo users
        // $superAdminUser = User::where('email', 'admin@mail.com')->first();
        // if ($superAdminUser) {
        //     $superAdminUser->roles()->attach($superAdminRole->id);
        // }

        // $freelancerUser = User::where('email', 'freelancer_user@mail.com')->first();
        // if ($freelancerUser) {
        //     $freelancerUser->roles()->attach($freelancerRole->id);
        // }

        // $clientUser = User::where('email', 'client_user@mail.com')->first();
        // if ($clientUser) {
        //     $clientUser->roles()->attach($clientRole->id);
        // }

        // // Assign company role to company users
        // $companyUsers = User::where('account_type', 'company')->get();
        // foreach ($companyUsers as $user) {
        //     $user->roles()->attach($companyRole->id);
        // }

        // // Assign company staff role to company staff users
        // $companyStaffUsers = User::where('account_type', 'company_staff')->get();
        // foreach ($companyStaffUsers as $user) {
        //     $user->roles()->attach($companyStaffRole->id);
        // }
    }
}
