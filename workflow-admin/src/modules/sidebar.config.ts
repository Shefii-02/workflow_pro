import type { SidebarItem } from '../shared/types'
import { ROUTES } from '../shared/constants'

export const companySidebarConfig: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.COMPANY_DASHBOARD,
    icon: '📊',
  },
  {
    id: 'projects',
    label: 'Projects',
    path: ROUTES.COMPANY_PROJECTS,
    icon: '📂',
    children: [
      { id: 'all', label: 'All Projects', path: ROUTES.COMPANY_PROJECTS, icon: '📋' },
      { id: 'active', label: 'Active', path: `${ROUTES.COMPANY_PROJECTS}?status=active`, icon: '⚡' },
      { id: 'archived', label: 'Archived', path: `${ROUTES.COMPANY_PROJECTS}?status=archived`, icon: '📦' },
    ],
  },
  {
    id: 'tasks',
    label: 'Tasks',
    path: ROUTES.COMPANY_TASKS,
    icon: '✅',
    badge: '5',
  },
  {
    id: 'hr',
    label: 'HR',
    path: ROUTES.COMPANY_HR,
    icon: '👥',
    children: [
      { id: 'employees', label: 'Employees', path: ROUTES.COMPANY_EMPLOYEES, icon: '👨‍💼' },
      { id: 'attendance', label: 'Attendance', path: ROUTES.COMPANY_ATTENDANCE, icon: '📅' },
    ],
  },
  {
    id: 'payroll',
    label: 'Payroll',
    path: ROUTES.COMPANY_PAYROLL,
    icon: '💰',
  },
  {
    id: 'finance',
    label: 'Finance',
    path: ROUTES.COMPANY_FINANCE,
    icon: '📊',
    children: [
      { id: 'expenses', label: 'Expenses', path: `${ROUTES.COMPANY_FINANCE}/expenses`, icon: '📉' },
      { id: 'invoices', label: 'Invoices', path: `${ROUTES.COMPANY_FINANCE}/invoices`, icon: '📄' },
      { id: 'reports', label: 'Reports', path: `${ROUTES.COMPANY_FINANCE}/reports`, icon: '📈' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    path: ROUTES.COMPANY_REPORTS,
    icon: '📈',
  },
  {
    id: 'chat',
    label: 'Chat',
    path: ROUTES.COMPANY_CHAT,
    icon: '💬',
    badge: '3',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.COMPANY_SETTINGS,
    icon: '⚙️',
  },
]

export const freelancerSidebarConfig: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.FREELANCER_DASHBOARD,
    icon: '📊',
  },
  {
    id: 'projects',
    label: 'Projects',
    path: ROUTES.FREELANCER_PROJECTS,
    icon: '📂',
  },
  {
    id: 'clients',
    label: 'Clients',
    path: ROUTES.FREELANCER_CLIENTS,
    icon: '🤝',
  },
  {
    id: 'earnings',
    label: 'Earnings',
    path: ROUTES.FREELANCER_EARNINGS,
    icon: '💰',
  },
  {
    id: 'invoices',
    label: 'Invoices',
    path: ROUTES.FREELANCER_INVOICES,
    icon: '📄',
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    path: ROUTES.FREELANCER_SUBSCRIPTIONS,
    icon: '💳',
  },
  {
    id: 'chat',
    label: 'Chat',
    path: ROUTES.FREELANCER_CHAT,
    icon: '💬',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.FREELANCER_SETTINGS,
    icon: '⚙️',
  },
]

export const clientSidebarConfig: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.CLIENT_DASHBOARD,
    icon: '📊',
  },
  {
    id: 'projects',
    label: 'Projects',
    path: ROUTES.CLIENT_PROJECTS,
    icon: '📂',
  },
  {
    id: 'tasks',
    label: 'Tasks',
    path: ROUTES.CLIENT_TASKS,
    icon: '✅',
  },
  {
    id: 'files',
    label: 'Files',
    path: ROUTES.CLIENT_FILES,
    icon: '📁',
  },
  {
    id: 'invoices',
    label: 'Invoices',
    path: ROUTES.CLIENT_INVOICES,
    icon: '📄',
  },
  {
    id: 'chat',
    label: 'Chat',
    path: ROUTES.CLIENT_CHAT,
    icon: '💬',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.CLIENT_SETTINGS,
    icon: '⚙️',
  },
]
