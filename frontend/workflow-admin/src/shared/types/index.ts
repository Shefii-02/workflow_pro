// Account Types
export const AccountType = {
  SP: 'sp',
  COMPANY: 'company',
  FREELANCER: 'freelancer',
  CLIENT: 'client',
} as const

export type AccountType = (typeof AccountType)[keyof typeof AccountType]

// User Roles
export const UserRole = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  EMPLOYEE: 'employee',
  FREELANCER: 'freelancer',
  CLIENT: 'client',
  VIEWER: 'viewer',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

// Permissions
export type Permission = 
  | 'view_dashboard'
  | 'manage_users'
  | 'manage_projects'
  | 'manage_tasks'
  | 'manage_finances'
  | 'view_analytics'
  | 'manage_permissions'
  | 'manage_subscriptions'
  | 'manage_support'
  | 'edit_settings'
  | 'delete_data'
  | 'export_data'
  | 'manage_staff'
  | 'manage_freelancers'
  | 'manage_companies'
  | 'view_monitoring'
  | 'manage_announcements'

// User
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  accountType: AccountType
  role: UserRole
  permissions: Permission[]
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
  updatedAt: string
}

// Auth
export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: User
  expiresIn: number
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  refreshToken: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Company
export interface Company {
  id: string
  name: string
  logo?: string
  email: string
  phone?: string
  website?: string
  industry?: string
  employeeCount?: number
  status: 'active' | 'inactive' | 'suspended'
  subscriptionPlan: 'free' | 'starter' | 'professional' | 'enterprise'
  createdAt: string
  updatedAt: string
}

// Project
export interface Project {
  id: string
  name: string
  description?: string
  slug: string
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'archived'
  visibility: 'private' | 'internal' | 'public'
  ownerId: string
  ownerType: AccountType
  teamMembers: TeamMember[]
  createdAt: string
  updatedAt: string
}

// Task
export interface Task {
  id: string
  title: string
  description?: string
  projectId: string
  status: 'todo' | 'in_progress' | 'in_review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assigneeId?: string
  dueDate?: string
  labels?: string[]
  createdAt: string
  updatedAt: string
}

// Team Member
export interface TeamMember {
  id: string
  userId: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  joinedAt: string
}

// Invoice
export interface Invoice {
  id: string
  number: string
  clientId: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
  createdAt: string
  updatedAt: string
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

// Pagination
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// API Response
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  timestamp: string
}

// Notification
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
  link?: string
}

// Analytics
export interface AnalyticsMetric {
  label: string
  value: number
  change?: number
  changeType?: 'increase' | 'decrease'
  unit?: string
}

export interface ChartData {
  name: string
  data: number[]
  labels: string[]
}

// Sidebar Item
export interface SidebarItem {
  id: string
  label: string
  path: string
  icon: string
  children?: SidebarItem[]
  permissions?: Permission[]
  badge?: string
}

// Form
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio'
  required?: boolean
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: RegExp
  }
  options?: { label: string; value: string }[]
}

// Table Column
export interface TableColumn<T> {
  accessorKey: keyof T | string
  header: string
  cell?: (value: any) => React.ReactNode
  sortable?: boolean
  filterable?: boolean
  width?: number
}

// Filter
export interface FilterOption {
  key: string
  label: string
  value: string | boolean | number
}
