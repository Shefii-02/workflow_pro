import type { User, Company, Project, Task, Invoice, Notification } from '../../shared/types'
import { AccountType, UserRole } from '../../shared/types'

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@sp.com',
    name: 'Alex Johnson',
    avatar: 'AJ',
    accountType: AccountType.SP,
    role: UserRole.ADMIN,
    permissions: [
      'view_dashboard',
      'manage_users',
      'manage_projects',
      'manage_subscriptions',
      'manage_staff',
      'manage_companies',
      'view_monitoring',
    ],
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'admin@company.com',
    name: 'Sarah Smith',
    avatar: 'SS',
    accountType: AccountType.COMPANY,
    role: UserRole.ADMIN,
    permissions: ['view_dashboard', 'manage_projects', 'manage_tasks', 'manage_users'],
    status: 'active',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: '3',
    email: 'freelancer@email.com',
    name: 'Mike Davis',
    avatar: 'MD',
    accountType: AccountType.FREELANCER,
    role: UserRole.FREELANCER,
    permissions: ['view_dashboard', 'manage_projects', 'manage_tasks'],
    status: 'active',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
]

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Acme Corp',
    email: 'admin@acme.com',
    phone: '+1 (555) 123-4567',
    website: 'https://acme.com',
    industry: 'Technology',
    employeeCount: 150,
    status: 'active',
    subscriptionPlan: 'professional',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'TechStart Inc',
    email: 'admin@techstart.com',
    phone: '+1 (555) 234-5678',
    website: 'https://techstart.io',
    industry: 'SaaS',
    employeeCount: 45,
    status: 'active',
    subscriptionPlan: 'starter',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
]

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of the company website',
    slug: 'website-redesign',
    status: 'active',
    visibility: 'internal',
    ownerId: '1',
    ownerType: AccountType.COMPANY,
    teamMembers: [
      { id: '1', userId: '1', name: 'Sarah Smith', email: 'sarah@company.com', role: UserRole.MANAGER, joinedAt: '2024-01-01T00:00:00Z' },
      { id: '2', userId: '2', name: 'John Developer', email: 'john@company.com', role: UserRole.STAFF, joinedAt: '2024-01-05T00:00:00Z' },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native iOS and Android app',
    slug: 'mobile-app-dev',
    status: 'on_hold',
    visibility: 'internal',
    ownerId: '1',
    ownerType: AccountType.COMPANY,
    teamMembers: [],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
]

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design homepage mockups',
    description: 'Create high-fidelity mockups for the homepage',
    projectId: '1',
    status: 'in_progress',
    priority: 'high',
    assigneeId: '1',
    dueDate: '2024-02-15T00:00:00Z',
    labels: ['design', 'frontend'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    projectId: '1',
    status: 'todo',
    priority: 'medium',
    assigneeId: '2',
    dueDate: '2024-02-20T00:00:00Z',
    labels: ['devops', 'backend'],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
]

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-001',
    clientId: '1',
    amount: 5000,
    status: 'paid',
    issueDate: '2024-01-01T00:00:00Z',
    dueDate: '2024-01-31T00:00:00Z',
    items: [
      { id: '1', description: 'Web Development - 40 hours', quantity: 40, rate: 100, amount: 4000 },
      { id: '2', description: 'Design - 5 hours', quantity: 5, rate: 200, amount: 1000 },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    title: 'New message',
    message: 'You have a new message from Sarah Smith',
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'Payment received',
    message: 'Invoice INV-001 has been paid successfully',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
  },
]

// Analytics data
export const mockAnalytics = {
  revenue: 182500,
  revenueChange: 7.4,
  totalRequests: 245123,
  apiRequestsHourly: [1200, 1450, 1310, 1560, 1490, 1580, 1625],
  activeUsers: 1234,
  registrations: 56,
  failedRequests: 12,
  deadAccounts: 4,
  storageUsage: 856,
  totalStorage: 1024,
  websocketConnections: 234,
  activeSessions: 567,
  memoryUsage: 4.2,
  queueJobs: 89,
  subscriptions: {
    active: 987,
    trials: 143,
    churnRate: 1.8,
    total: 1248,
  },
  projectBreakdown: [
    { label: 'Active', value: 62 },
    { label: 'Planning', value: 18 },
    { label: 'Delayed', value: 10 },
    { label: 'Completed', value: 10 },
  ],
  taskActivity: [
    { date: 'Mon', completed: 12, pending: 8 },
    { date: 'Tue', completed: 14, pending: 6 },
    { date: 'Wed', completed: 10, pending: 10 },
    { date: 'Thu', completed: 15, pending: 5 },
    { date: 'Fri', completed: 18, pending: 4 },
    { date: 'Sat', completed: 8, pending: 3 },
    { date: 'Sun', completed: 5, pending: 2 },
  ],
}
