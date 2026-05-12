import {
  AccountType,
  ADMIN_ACCOUNT_TYPES,
  CLIENT_ACCOUNT_TYPES,
  COMPANY_ACCOUNT_TYPES,
  UserRole,
} from '../types'
import type { Permission } from '../types'
import { ROUTES } from './routes'
export { API_ROUTES, ROUTES } from './routes'

// API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.workflow-pro.com/v1'
export const API_TIMEOUT = 30000

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
  [AccountType.SUPER_ADMIN]: ROUTES.SP_DASHBOARD,
  [AccountType.ADMIN]: ROUTES.SP_DASHBOARD,
  [AccountType.ADMIN_STAFF]: ROUTES.SP_DASHBOARD,
  [AccountType.COMPANY]: ROUTES.COMPANY_DASHBOARD,
  [AccountType.COMPANY_STAFF]: ROUTES.COMPANY_DASHBOARD,
  [AccountType.FREELANCER]: ROUTES.FREELANCER_DASHBOARD,
  [AccountType.CLIENT]: ROUTES.CLIENT_DASHBOARD,
  [AccountType.CLIENT_STAFF]: ROUTES.CLIENT_DASHBOARD,
}

// Sidebar Items per Account Type (will be expanded)
export const SIDEBAR_CONFIG = {
  [AccountType.SUPER_ADMIN]: [],
  [AccountType.ADMIN]: [],
  [AccountType.ADMIN_STAFF]: [],
  [AccountType.COMPANY]: [],
  [AccountType.COMPANY_STAFF]: [],
  [AccountType.FREELANCER]: [],
  [AccountType.CLIENT]: [],
  [AccountType.CLIENT_STAFF]: [],
}

export { ADMIN_ACCOUNT_TYPES, CLIENT_ACCOUNT_TYPES, COMPANY_ACCOUNT_TYPES }

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
