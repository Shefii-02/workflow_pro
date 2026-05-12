export const ROUTES = {
  ROOT: '/',
  WILDCARD: '*',

  // Auth
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '/404',

  // Legacy/common pages
  ANALYTICS: '/analytics',
  TEAM: '/team',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  HELP: '/help',

  // SP
  SP_DASHBOARD: '/sp/dashboard',
  SP_COMPANIES: '/sp/companies',
  SP_COMPANIES_NEW: '/sp/companies/new',
  SP_FREELANCERS: '/sp/freelancers',
  SP_FREELANCERS_NEW: '/sp/freelancers/new',
  SP_SUBSCRIPTIONS: '/sp/subscriptions',
  SP_STAFF: '/sp/staff',
  SP_PERMISSIONS: '/sp/permissions',
  SP_SUPPORT: '/sp/support',
  SP_FINANCE: '/sp/finance',
  SP_CHAT: '/sp/chat',
  SP_ACTIVITIES: '/sp/activities',
  SP_MONITORING: '/sp/monitoring',
  SP_ANNOUNCEMENTS: '/sp/announcements',
  SP_SETTINGS: '/sp/settings',

  // Company
  COMPANY_DASHBOARD: '/company/dashboard',
  COMPANY_PROJECTS: '/company/projects',
  COMPANY_PROJECTS_NEW: '/company/projects/new',
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
  FREELANCER_PROJECTS_NEW: '/freelancer/projects/new',
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
} as const

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    ACCOUNT: '/users/account',
  },
  COMPANIES: '/companies',
  PROJECTS: '/projects',
  TASKS: '/tasks',
} as const
