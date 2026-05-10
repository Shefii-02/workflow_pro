import type { ReactNode } from 'react'

export type AccountType = 'service_provider' | 'company' | 'freelancer'
export type UserRole = 'admin' | 'manager' | 'staff' | 'freelancer'

export type UserPermission =
  | 'view_dashboard'
  | 'manage_users'
  | 'manage_projects'
  | 'manage_tasks'
  | 'manage_subscriptions'
  | 'manage_staff'
  | 'manage_companies'
  | 'view_monitoring'
  | 'manage_users'
  | 'manage_projects'
  | 'manage_tasks'
  | 'manage_subscriptions'
  | 'manage_staff'
  | 'manage_companies'
  | 'view_monitoring'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  accountType: AccountType
  role: UserRole
  permissions: UserPermission[]
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: User
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  refreshToken: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

export interface SidebarItem {
  id: string
  label: string
  path: string
  icon?: ReactNode
  badge?: string | number
  children?: SidebarItem[]
}

export interface Company {
  id: string
  name: string
  email: string
  phone: string
  website: string
  industry: string
  employeeCount: number
  status: 'active' | 'inactive'
  subscriptionPlan: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  description: string
  slug: string
  status: string
  visibility: string
  ownerId: string
  ownerType: AccountType
  teamMembers: Array<{ id: string; userId: string; name: string; email: string; role: UserRole; joinedAt: string }>
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  title: string
  description: string
  projectId: string
  status: string
  priority: string
  assigneeId: string
  dueDate: string
  labels: string[]
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

export interface Invoice {
  id: string
  number: string
  clientId: string
  amount: number
  status: string
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
}
