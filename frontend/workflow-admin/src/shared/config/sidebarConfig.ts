import { AccountType } from '../types'
import type { SidebarItem } from '../types'
import { ROUTES } from '../constants'

const spSidebarConfig: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.SP_DASHBOARD,
    icon: '📊',
    permissions: ['view_dashboard'],
  },
  {
    id: 'companies',
    label: 'Companies',
    path: ROUTES.SP_COMPANIES,
    icon: '🏢',
    permissions: ['manage_companies'],
    children: [
      { id: 'all-companies', label: 'All Companies', path: ROUTES.SP_COMPANIES, icon: '📋', permissions: ['manage_companies'] },
      { id: 'active-companies', label: 'Active', path: `${ROUTES.SP_COMPANIES}?status=active`, icon: '✅', permissions: ['manage_companies'] },
      { id: 'suspended-companies', label: 'Suspended', path: `${ROUTES.SP_COMPANIES}?status=suspended`, icon: '🚫', permissions: ['manage_companies'] },
    ],
  },
  {
    id: 'freelancers',
    label: 'Freelancers',
    path: ROUTES.SP_FREELANCERS,
    icon: '👨‍💼',
    permissions: ['manage_freelancers'],
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    path: ROUTES.SP_SUBSCRIPTIONS,
    icon: '💳',
    permissions: ['manage_subscriptions'],
    children: [
      { id: 'subscription-plans', label: 'Plans', path: `${ROUTES.SP_SUBSCRIPTIONS}/plans`, icon: '📋', permissions: ['manage_subscriptions'] },
      { id: 'active-subscriptions', label: 'Active', path: `${ROUTES.SP_SUBSCRIPTIONS}?status=active`, icon: '✅', permissions: ['manage_subscriptions'] },
      { id: 'subscription-reports', label: 'Reports', path: `${ROUTES.SP_SUBSCRIPTIONS}/reports`, icon: '📊', permissions: ['manage_subscriptions'] },
    ],
  },
  {
    id: 'staff',
    label: 'Admin Staff',
    path: ROUTES.SP_STAFF,
    icon: '👥',
    permissions: ['manage_staff'],
    children: [
      { id: 'all-staff', label: 'All Staff', path: ROUTES.SP_STAFF, icon: '👨‍💼', permissions: ['manage_staff'] },
      { id: 'staff-permissions', label: 'Permissions', path: `${ROUTES.SP_STAFF}/permissions`, icon: '🔒', permissions: ['manage_permissions'] },
    ],
  },
  {
    id: 'support',
    label: 'Support Tickets',
    path: ROUTES.SP_SUPPORT,
    icon: '🎫',
    badge: '12',
    badgeVariant: 'warning',
    permissions: ['manage_support'],
  },
  {
    id: 'finance',
    label: 'Finance',
    path: ROUTES.SP_FINANCE,
    icon: '💰',
    permissions: ['manage_finances'],
    children: [
      { id: 'revenue', label: 'Revenue', path: `${ROUTES.SP_FINANCE}/revenue`, icon: '📈', permissions: ['manage_finances'] },
      { id: 'payments', label: 'Payments', path: `${ROUTES.SP_FINANCE}/payments`, icon: '💳', permissions: ['manage_finances'] },
      { id: 'invoices', label: 'Invoices', path: `${ROUTES.SP_FINANCE}/invoices`, icon: '📄', permissions: ['manage_finances'] },
    ],
  },
  {
    id: 'monitoring',
    label: 'System Monitoring',
    path: ROUTES.SP_MONITORING,
    icon: '🔍',
    permissions: ['view_monitoring'],
    children: [
      { id: 'analytics', label: 'Analytics', path: ROUTES.SP_MONITORING, icon: '📊', permissions: ['view_monitoring'] },
      { id: 'performance', label: 'Performance', path: `${ROUTES.SP_MONITORING}/performance`, icon: '⚡', permissions: ['view_monitoring'] },
      { id: 'logs', label: 'System Logs', path: `${ROUTES.SP_MONITORING}/logs`, icon: '📋', permissions: ['view_monitoring'] },
    ],
  },
  {
    id: 'announcements',
    label: 'Announcements',
    path: ROUTES.SP_ANNOUNCEMENTS,
    icon: '📢',
    permissions: ['manage_announcements'],
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.SP_SETTINGS,
    icon: '⚙️',
    permissions: ['edit_settings'],
    children: [
      { id: 'settings-general', label: 'General', path: `${ROUTES.SP_SETTINGS}/general`, icon: '📋', permissions: ['edit_settings'] },
      { id: 'settings-integrations', label: 'Integrations', path: `${ROUTES.SP_SETTINGS}/integrations`, icon: '🔗', permissions: ['edit_settings'] },
      { id: 'settings-security', label: 'Security', path: `${ROUTES.SP_SETTINGS}/security`, icon: '🔐', permissions: ['edit_settings'] },
    ],
  },
]

const companySidebarConfig: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.COMPANY_DASHBOARD,
    icon: '📊',
    permissions: ['view_dashboard'],
  },
  {
    id: 'projects',
    label: 'Projects',
    path: ROUTES.COMPANY_PROJECTS,
    icon: '📂',
    permissions: ['manage_projects'],
    children: [
      { id: 'all-projects', label: 'All Projects', path: ROUTES.COMPANY_PROJECTS, icon: '📋', permissions: ['manage_projects'] },
      { id: 'active-projects', label: 'Active', path: `${ROUTES.COMPANY_PROJECTS}?status=active`, icon: '⚡', permissions: ['manage_projects'] },
      { id: 'archived-projects', label: 'Archived', path: `${ROUTES.COMPANY_PROJECTS}?status=archived`, icon: '📦', permissions: ['manage_projects'] },
    ],
  },
  {
    id: 'tasks',
    label: 'Tasks',
    path: ROUTES.COMPANY_TASKS,
    icon: '✅',
    badge: '5',
    badgeVariant: 'info',
    permissions: ['manage_tasks'],
  },
  {
    id: 'hr',
    label: 'HR',
    path: ROUTES.COMPANY_HR,
    icon: '👥',
    permissions: ['view_dashboard'],
    children: [
      { id: 'employees', label: 'Employees', path: ROUTES.COMPANY_EMPLOYEES, icon: '👨‍💼', permissions: ['view_dashboard'] },
      { id: 'attendance', label: 'Attendance', path: ROUTES.COMPANY_ATTENDANCE, icon: '📅', permissions: ['view_dashboard'] },
    ],
  },
  {
    id: 'payroll',
    label: 'Payroll',
    path: ROUTES.COMPANY_PAYROLL,
    icon: '💰',
    permissions: ['manage_finances'],
  },
  {
    id: 'finance',
    label: 'Finance',
    path: ROUTES.COMPANY_FINANCE,
    icon: '📊',
    permissions: ['manage_finances'],
    children: [
      { id: 'expenses', label: 'Expenses', path: `${ROUTES.COMPANY_FINANCE}/expenses`, icon: '📉', permissions: ['manage_finances'] },
      { id: 'invoices', label: 'Invoices', path: `${ROUTES.COMPANY_FINANCE}/invoices`, icon: '📄', permissions: ['manage_finances'] },
      { id: 'reports', label: 'Reports', path: `${ROUTES.COMPANY_FINANCE}/reports`, icon: '📈', permissions: ['view_analytics'] },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    path: ROUTES.COMPANY_REPORTS,
    icon: '📈',
    permissions: ['view_analytics'],
  },
  {
    id: 'chat',
    label: 'Chat',
    path: ROUTES.COMPANY_CHAT,
    icon: '💬',
    badge: '3',
    badgeVariant: 'warning',
    permissions: ['manage_support'],
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.COMPANY_SETTINGS,
    icon: '⚙️',
    permissions: ['edit_settings'],
  },
]

const freelancerSidebarConfig: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.FREELANCER_DASHBOARD,
    icon: '📊',
    permissions: ['view_dashboard'],
  },
  {
    id: 'projects',
    label: 'Projects',
    path: ROUTES.FREELANCER_PROJECTS,
    icon: '📂',
    permissions: ['manage_projects'],
  },
  {
    id: 'clients',
    label: 'Clients',
    path: ROUTES.FREELANCER_CLIENTS,
    icon: '🤝',
    permissions: ['view_dashboard'],
  },
  {
    id: 'earnings',
    label: 'Earnings',
    path: ROUTES.FREELANCER_EARNINGS,
    icon: '💰',
    permissions: ['view_analytics'],
  },
  {
    id: 'invoices',
    label: 'Invoices',
    path: ROUTES.FREELANCER_INVOICES,
    icon: '📄',
    permissions: ['view_dashboard'],
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    path: ROUTES.FREELANCER_SUBSCRIPTIONS,
    icon: '💳',
    permissions: ['manage_subscriptions'],
  },
  {
    id: 'chat',
    label: 'Chat',
    path: ROUTES.FREELANCER_CHAT,
    icon: '💬',
    permissions: ['view_dashboard'],
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.FREELANCER_SETTINGS,
    icon: '⚙️',
    permissions: ['edit_settings'],
  },
]

const clientSidebarConfig: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.CLIENT_DASHBOARD,
    icon: '📊',
    permissions: ['view_dashboard'],
  },
  {
    id: 'projects',
    label: 'Projects',
    path: ROUTES.CLIENT_PROJECTS,
    icon: '📂',
    permissions: ['view_dashboard'],
  },
  {
    id: 'tasks',
    label: 'Tasks',
    path: ROUTES.CLIENT_TASKS,
    icon: '✅',
    permissions: ['manage_tasks'],
  },
  {
    id: 'files',
    label: 'Files',
    path: ROUTES.CLIENT_FILES,
    icon: '📁',
    permissions: ['view_dashboard'],
  },
  {
    id: 'invoices',
    label: 'Invoices',
    path: ROUTES.CLIENT_INVOICES,
    icon: '📄',
    permissions: ['view_dashboard'],
  },
  {
    id: 'chat',
    label: 'Chat',
    path: ROUTES.CLIENT_CHAT,
    icon: '💬',
    permissions: ['view_dashboard'],
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.CLIENT_SETTINGS,
    icon: '⚙️',
    permissions: ['edit_settings'],
  },
]

export const SIDEBAR_CONFIG: Record<AccountType, SidebarItem[]> = {
  [AccountType.SP]: spSidebarConfig,
  [AccountType.COMPANY]: companySidebarConfig,
  [AccountType.FREELANCER]: freelancerSidebarConfig,
  [AccountType.CLIENT]: clientSidebarConfig,
}

export function getSidebarItems(accountType: AccountType): SidebarItem[] {
  return SIDEBAR_CONFIG[accountType] ?? []
}
