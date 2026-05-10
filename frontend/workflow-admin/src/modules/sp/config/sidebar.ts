import type { SidebarItem } from '../../../shared/types'
import { ROUTES } from '../../../shared/constants'

export const spSidebarConfig: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.SP_DASHBOARD,
    icon: '📊',
  },
  {
    id: 'companies',
    label: 'Companies',
    path: ROUTES.SP_COMPANIES,
    icon: '🏢',
    children: [
      { id: 'all', label: 'All Companies', path: ROUTES.SP_COMPANIES, icon: '📋' },
      { id: 'active', label: 'Active', path: `${ROUTES.SP_COMPANIES}?status=active`, icon: '✅' },
      { id: 'suspended', label: 'Suspended', path: `${ROUTES.SP_COMPANIES}?status=suspended`, icon: '🚫' },
    ],
  },
  {
    id: 'freelancers',
    label: 'Freelancers',
    path: ROUTES.SP_FREELANCERS,
    icon: '👨‍💼',
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    path: ROUTES.SP_SUBSCRIPTIONS,
    icon: '💳',
    children: [
      { id: 'plans', label: 'Plans', path: `${ROUTES.SP_SUBSCRIPTIONS}/plans`, icon: '📋' },
      { id: 'active-subs', label: 'Active', path: `${ROUTES.SP_SUBSCRIPTIONS}?status=active`, icon: '✅' },
      { id: 'reports', label: 'Reports', path: `${ROUTES.SP_SUBSCRIPTIONS}/reports`, icon: '📊' },
    ],
  },
  {
    id: 'staff',
    label: 'Admin Staff',
    path: ROUTES.SP_STAFF,
    icon: '👨‍💼',
    children: [
      { id: 'all-staff', label: 'All Staff', path: ROUTES.SP_STAFF, icon: '👥' },
      { id: 'permissions', label: 'Permissions', path: `${ROUTES.SP_STAFF}/permissions`, icon: '🔒' },
    ],
  },
  {
    id: 'permissions',
    label: 'Permissions',
    path: ROUTES.SP_PERMISSIONS,
    icon: '🔐',
  },
  {
    id: 'support',
    label: 'Support Tickets',
    path: ROUTES.SP_SUPPORT,
    icon: '🎫',
    badge: '12',
  },
  {
    id: 'finance',
    label: 'Finance',
    path: ROUTES.SP_FINANCE,
    icon: '💰',
    children: [
      { id: 'revenue', label: 'Revenue', path: `${ROUTES.SP_FINANCE}/revenue`, icon: '📈' },
      { id: 'payments', label: 'Payments', path: `${ROUTES.SP_FINANCE}/payments`, icon: '💳' },
      { id: 'invoices', label: 'Invoices', path: `${ROUTES.SP_FINANCE}/invoices`, icon: '📄' },
    ],
  },
  {
    id: 'monitoring',
    label: 'System Monitoring',
    path: ROUTES.SP_MONITORING,
    icon: '🔍',
    children: [
      { id: 'analytics', label: 'Analytics', path: ROUTES.SP_MONITORING, icon: '📊' },
      { id: 'performance', label: 'Performance', path: `${ROUTES.SP_MONITORING}/performance`, icon: '⚡' },
      { id: 'logs', label: 'System Logs', path: `${ROUTES.SP_MONITORING}/logs`, icon: '📋' },
    ],
  },
  {
    id: 'announcements',
    label: 'Announcements',
    path: ROUTES.SP_ANNOUNCEMENTS,
    icon: '📢',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.SP_SETTINGS,
    icon: '⚙️',
    children: [
      { id: 'general', label: 'General', path: `${ROUTES.SP_SETTINGS}/general`, icon: '📋' },
      { id: 'integration', label: 'Integrations', path: `${ROUTES.SP_SETTINGS}/integrations`, icon: '🔗' },
      { id: 'security', label: 'Security', path: `${ROUTES.SP_SETTINGS}/security`, icon: '🔐' },
    ],
  },
]
