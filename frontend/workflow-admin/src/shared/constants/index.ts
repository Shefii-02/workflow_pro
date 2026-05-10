import { AccountType, UserRole } from '../types'
import type { Permission } from '../types'

// API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.workflow-pro.com/v1'
export const API_TIMEOUT = 30000

// Routes
export const ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '/404',

  // SP
  SP_DASHBOARD: '/sp/dashboard',
  SP_COMPANIES: '/sp/companies',
  SP_FREELANCERS: '/sp/freelancers',
  SP_SUBSCRIPTIONS: '/sp/subscriptions',
  SP_STAFF: '/sp/staff',
  SP_PERMISSIONS: '/sp/permissions',
  SP_SUPPORT: '/sp/support',
  SP_FINANCE: '/sp/finance',
  SP_ACTIVITIES: '/sp/activities',
  SP_MONITORING: '/sp/monitoring',
  SP_ANNOUNCEMENTS: '/sp/announcements',
  SP_SETTINGS: '/sp/settings',

  // Company
  COMPANY_DASHBOARD: '/company/dashboard',
  COMPANY_PROJECTS: '/company/projects',
  COMPANY_TASKS: '/company/tasks',
  COMPANY_HR: '/company/hr',
  COMPANY_EMPLOYEES: '/company/employees',
  COMPANY_PAYROLL: '/company/payroll',
  COMPANY_ATTENDANCE: '/company/attendance',
  COMPANY_FINANCE: '/company/finance',
  COMPANY_REPORTS: '/company/reports',
  COMPANY_CHAT: '/company/chat',
  COMPANY_SETTINGS: '/company/settings',

  // Freelancer
  FREELANCER_DASHBOARD: '/freelancer/dashboard',
  FREELANCER_PROJECTS: '/freelancer/projects',
  FREELANCER_CLIENTS: '/freelancer/clients',
  FREELANCER_EARNINGS: '/freelancer/earnings',
  FREELANCER_INVOICES: '/freelancer/invoices',
  FREELANCER_SUBSCRIPTIONS: '/freelancer/subscriptions',
  FREELANCER_CHAT: '/freelancer/chat',
  FREELANCER_SETTINGS: '/freelancer/settings',

  // Client
  CLIENT_DASHBOARD: '/client/dashboard',
  CLIENT_PROJECTS: '/client/projects',
  CLIENT_TASKS: '/client/tasks',
  CLIENT_FILES: '/client/files',
  CLIENT_INVOICES: '/client/invoices',
  CLIENT_CHAT: '/client/chat',
  CLIENT_SETTINGS: '/client/settings',

  // Common
  PROFILE: '/profile',
  SETTINGS: '/settings',
  HELP: '/help',
}

// Permissions per Role
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    'view_dashboard',
    'manage_users',
    'manage_projects',
    'manage_tasks',
    'manage_finances',
    'view_analytics',
    'manage_permissions',
    'manage_subscriptions',
    'manage_support',
    'edit_settings',
    'delete_data',
    'export_data',
    'manage_staff',
    'manage_freelancers',
    'manage_companies',
    'view_monitoring',
    'manage_announcements',
  ],
  [UserRole.MANAGER]: [
    'view_dashboard',
    'manage_users',
    'manage_projects',
    'manage_tasks',
    'view_analytics',
    'manage_support',
    'edit_settings',
    'export_data',
  ],
  [UserRole.STAFF]: [
    'view_dashboard',
    'manage_projects',
    'manage_tasks',
    'view_analytics',
  ],
  [UserRole.EMPLOYEE]: [
    'view_dashboard',
    'manage_tasks',
  ],
  [UserRole.FREELANCER]: [
    'view_dashboard',
    'manage_projects',
    'manage_tasks',
    'view_analytics',
  ],
  [UserRole.CLIENT]: [
    'view_dashboard',
    'view_analytics',
  ],
  [UserRole.VIEWER]: [
    'view_dashboard',
  ],
}

// Account Type Routes
export const ACCOUNT_TYPE_ROUTES: Record<AccountType, string> = {
  [AccountType.SP]: ROUTES.SP_DASHBOARD,
  [AccountType.COMPANY]: ROUTES.COMPANY_DASHBOARD,
  [AccountType.FREELANCER]: ROUTES.FREELANCER_DASHBOARD,
  [AccountType.CLIENT]: ROUTES.CLIENT_DASHBOARD,
}

// Sidebar Items per Account Type (will be expanded)
export const SIDEBAR_CONFIG = {
  [AccountType.SP]: [],
  [AccountType.COMPANY]: [],
  [AccountType.FREELANCER]: [],
  [AccountType.CLIENT]: [],
}

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
}

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebar_state',
  PREFERENCES: 'preferences',
}

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// Time
export const TOKEN_REFRESH_BEFORE = 5 * 60 * 1000 // Refresh 5 minutes before expiry
export const DEBOUNCE_DELAY = 300
