import type { User, Company, Project, Task, Invoice, Notification } from '../../shared/types'
import { AccountType, UserRole } from '../../shared/types'

export interface FinanceRecord {
  id: string
  type: 'invoice' | 'payment' | 'refund' | 'subscription'
  description: string
  company: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  date: string
}

export interface SubscriptionRecord {
  id: string
  plan: string
  company: string
  status: 'active' | 'cancelled' | 'expired' | 'paused'
  price: number
  billingCycle: 'monthly' | 'yearly'
  startDate: string
  endDate: string
  users: number
  revenue: number
}

export interface SupportTicketRecord {
  id: string
  title: string
  submitter: string
  email: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed'
  category: string
  createdAt: string
  updatedAt: string
  messages: number
}

const spAdminPermissions = [
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
] as User['permissions']

export const mockUsers: User[] = [
  {
    id: 'usr-sp-001',
    email: 'admin@sp.com',
    name: 'Alex Johnson',
    avatar: 'AJ',
    accountType: AccountType.SP,
    role: UserRole.ADMIN,
    permissions: spAdminPermissions,
    status: 'active',
    createdAt: '2025-01-06T09:00:00Z',
    updatedAt: '2026-05-09T12:15:00Z',
  },
  {
    id: 'usr-sp-002',
    email: 'ops.lead@workflow.pro',
    name: 'Priya Nair',
    avatar: 'PN',
    accountType: AccountType.SP,
    role: UserRole.MANAGER,
    permissions: ['view_dashboard', 'view_analytics', 'manage_support', 'view_monitoring', 'export_data'],
    status: 'active',
    createdAt: '2025-03-12T10:30:00Z',
    updatedAt: '2026-05-10T07:45:00Z',
  },
  {
    id: 'usr-company-001',
    email: 'admin@company.com',
    name: 'Sarah Smith',
    avatar: 'SS',
    accountType: AccountType.COMPANY,
    role: UserRole.ADMIN,
    permissions: ['view_dashboard', 'manage_projects', 'manage_tasks', 'manage_users', 'view_analytics', 'edit_settings'],
    status: 'active',
    createdAt: '2025-02-14T08:00:00Z',
    updatedAt: '2026-05-08T14:20:00Z',
  },
  {
    id: 'usr-company-002',
    email: 'it.admin@novabank.com',
    name: 'Marcus Lee',
    avatar: 'ML',
    accountType: AccountType.COMPANY,
    role: UserRole.ADMIN,
    permissions: ['view_dashboard', 'manage_projects', 'manage_tasks', 'manage_users', 'manage_finances', 'view_analytics'],
    status: 'active',
    createdAt: '2025-06-02T11:00:00Z',
    updatedAt: '2026-05-07T10:10:00Z',
  },
  {
    id: 'usr-company-003',
    email: 'workspace.owner@greenforge.io',
    name: 'Elena Costa',
    avatar: 'EC',
    accountType: AccountType.COMPANY,
    role: UserRole.MANAGER,
    permissions: ['view_dashboard', 'manage_projects', 'manage_tasks', 'view_analytics'],
    status: 'inactive',
    createdAt: '2025-08-18T09:30:00Z',
    updatedAt: '2026-03-16T16:00:00Z',
  },
  {
    id: 'usr-freelancer-001',
    email: 'freelancer@email.com',
    name: 'Mike Davis',
    avatar: 'MD',
    accountType: AccountType.FREELANCER,
    role: UserRole.FREELANCER,
    permissions: ['view_dashboard', 'manage_projects', 'manage_tasks', 'view_analytics'],
    status: 'active',
    createdAt: '2025-04-10T12:00:00Z',
    updatedAt: '2026-05-10T08:05:00Z',
  },
  {
    id: 'usr-freelancer-002',
    email: 'jane.dev@email.com',
    name: 'Jane Developer',
    avatar: 'JD',
    accountType: AccountType.FREELANCER,
    role: UserRole.FREELANCER,
    permissions: ['view_dashboard', 'manage_projects', 'manage_tasks'],
    status: 'active',
    createdAt: '2025-07-21T14:40:00Z',
    updatedAt: '2026-05-08T09:30:00Z',
  },
  {
    id: 'usr-client-001',
    email: 'client@acme.com',
    name: 'Olivia Chen',
    avatar: 'OC',
    accountType: AccountType.CLIENT,
    role: UserRole.CLIENT,
    permissions: ['view_dashboard', 'view_analytics'],
    status: 'active',
    createdAt: '2025-09-04T15:45:00Z',
    updatedAt: '2026-05-06T13:55:00Z',
  },
]

export const mockCompanies: Company[] = [
  {
    id: 'cmp-001',
    name: 'Acme Corp',
    email: 'admin@acme.com',
    phone: '+1 (415) 555-0134',
    website: 'https://acme.com',
    industry: 'Enterprise Software',
    employeeCount: 850,
    status: 'active',
    subscriptionPlan: 'enterprise',
    createdAt: '2025-01-14T08:00:00Z',
    updatedAt: '2026-05-10T11:24:00Z',
  },
  {
    id: 'cmp-002',
    name: 'NovaBank Financial',
    email: 'platform@novabank.com',
    phone: '+1 (212) 555-0188',
    website: 'https://novabank.com',
    industry: 'Financial Services',
    employeeCount: 4200,
    status: 'active',
    subscriptionPlan: 'enterprise',
    createdAt: '2025-02-02T10:10:00Z',
    updatedAt: '2026-05-09T19:12:00Z',
  },
  {
    id: 'cmp-003',
    name: 'GreenForge Energy',
    email: 'ops@greenforge.io',
    phone: '+44 20 7946 0315',
    website: 'https://greenforge.io',
    industry: 'Renewable Energy',
    employeeCount: 640,
    status: 'inactive',
    subscriptionPlan: 'professional',
    createdAt: '2025-03-18T13:20:00Z',
    updatedAt: '2026-04-21T08:40:00Z',
  },
  {
    id: 'cmp-004',
    name: 'Helio Health Group',
    email: 'admin@heliohealth.example',
    phone: '+1 (617) 555-0199',
    website: 'https://heliohealth.example',
    industry: 'Healthcare',
    employeeCount: 2300,
    status: 'active',
    subscriptionPlan: 'enterprise',
    createdAt: '2025-04-05T15:30:00Z',
    updatedAt: '2026-05-08T05:45:00Z',
  },
  {
    id: 'cmp-005',
    name: 'Atlas Logistics',
    email: 'workflow@atlaslogistics.example',
    phone: '+971 4 555 0140',
    website: 'https://atlaslogistics.example',
    industry: 'Logistics',
    employeeCount: 1180,
    status: 'active',
    subscriptionPlan: 'professional',
    createdAt: '2025-05-23T07:45:00Z',
    updatedAt: '2026-05-05T17:35:00Z',
  },
  {
    id: 'cmp-006',
    name: 'Quantum Retail Labs',
    email: 'admin@quantumretail.example',
    phone: '+61 2 5550 0194',
    website: 'https://quantumretail.example',
    industry: 'Retail Analytics',
    employeeCount: 320,
    status: 'active',
    subscriptionPlan: 'professional',
    createdAt: '2025-07-11T09:25:00Z',
    updatedAt: '2026-05-02T21:18:00Z',
  },
  {
    id: 'cmp-007',
    name: 'BluePeak Manufacturing',
    email: 'systems@bluepeak.example',
    phone: '+49 30 5550 0182',
    website: 'https://bluepeak.example',
    industry: 'Manufacturing',
    employeeCount: 760,
    status: 'suspended',
    subscriptionPlan: 'starter',
    createdAt: '2025-08-01T11:00:00Z',
    updatedAt: '2026-04-30T10:22:00Z',
  },
  {
    id: 'cmp-008',
    name: 'Northstar Media',
    email: 'team@northstarmedia.example',
    phone: '+1 (310) 555-0117',
    website: 'https://northstarmedia.example',
    industry: 'Media',
    employeeCount: 95,
    status: 'active',
    subscriptionPlan: 'starter',
    createdAt: '2025-10-19T16:10:00Z',
    updatedAt: '2026-05-04T06:50:00Z',
  },
]

export const mockProjects: Project[] = [
  {
    id: 'prj-001',
    name: 'Global Workflow Migration',
    description: 'Migrate Acme Corp business units into a shared Workflow Pro workspace.',
    slug: 'global-workflow-migration',
    status: 'active',
    visibility: 'internal',
    ownerId: 'cmp-001',
    ownerType: AccountType.COMPANY,
    teamMembers: [
      { id: 'tm-001', userId: 'usr-company-001', name: 'Sarah Smith', email: 'admin@company.com', role: UserRole.ADMIN, joinedAt: '2025-02-01T00:00:00Z' },
      { id: 'tm-002', userId: 'usr-freelancer-002', name: 'Jane Developer', email: 'jane.dev@email.com', role: UserRole.FREELANCER, joinedAt: '2025-02-05T00:00:00Z' },
    ],
    createdAt: '2025-02-01T00:00:00Z',
    updatedAt: '2026-05-09T00:00:00Z',
  },
  {
    id: 'prj-002',
    name: 'Treasury Controls Automation',
    description: 'Automate approval workflows for treasury operations and audit trails.',
    slug: 'treasury-controls-automation',
    status: 'active',
    visibility: 'private',
    ownerId: 'cmp-002',
    ownerType: AccountType.COMPANY,
    teamMembers: [
      { id: 'tm-003', userId: 'usr-company-002', name: 'Marcus Lee', email: 'it.admin@novabank.com', role: UserRole.ADMIN, joinedAt: '2025-06-04T00:00:00Z' },
    ],
    createdAt: '2025-06-04T00:00:00Z',
    updatedAt: '2026-05-07T00:00:00Z',
  },
  {
    id: 'prj-003',
    name: 'Field Service Mobile Rollout',
    description: 'Launch mobile collaboration for renewable energy maintenance crews.',
    slug: 'field-service-mobile-rollout',
    status: 'on_hold',
    visibility: 'internal',
    ownerId: 'cmp-003',
    ownerType: AccountType.COMPANY,
    teamMembers: [],
    createdAt: '2025-08-18T00:00:00Z',
    updatedAt: '2026-04-15T00:00:00Z',
  },
  {
    id: 'prj-004',
    name: 'Patient Intake Redesign',
    description: 'Redesign intake work queues and escalation paths for Helio Health.',
    slug: 'patient-intake-redesign',
    status: 'planning',
    visibility: 'internal',
    ownerId: 'cmp-004',
    ownerType: AccountType.COMPANY,
    teamMembers: [
      { id: 'tm-004', userId: 'usr-freelancer-001', name: 'Mike Davis', email: 'freelancer@email.com', role: UserRole.FREELANCER, joinedAt: '2026-01-14T00:00:00Z' },
    ],
    createdAt: '2026-01-14T00:00:00Z',
    updatedAt: '2026-05-06T00:00:00Z',
  },
]

export const mockTasks: Task[] = [
  {
    id: 'tsk-001',
    title: 'Complete SSO rollout checklist',
    description: 'Validate SAML metadata, SCIM sync, and admin recovery access for Acme Corp.',
    projectId: 'prj-001',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'usr-company-001',
    dueDate: '2026-05-18T00:00:00Z',
    labels: ['security', 'enterprise'],
    createdAt: '2026-04-21T00:00:00Z',
    updatedAt: '2026-05-09T00:00:00Z',
  },
  {
    id: 'tsk-002',
    title: 'Map treasury approval matrix',
    description: 'Document maker-checker controls and exception approvals.',
    projectId: 'prj-002',
    status: 'in_review',
    priority: 'urgent',
    assigneeId: 'usr-company-002',
    dueDate: '2026-05-14T00:00:00Z',
    labels: ['finance', 'audit'],
    createdAt: '2026-04-10T00:00:00Z',
    updatedAt: '2026-05-08T00:00:00Z',
  },
  {
    id: 'tsk-003',
    title: 'Prototype offline mobile sync',
    description: 'Create sync conflict handling for field technician notes.',
    projectId: 'prj-003',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'usr-freelancer-002',
    dueDate: '2026-06-02T00:00:00Z',
    labels: ['mobile', 'sync'],
    createdAt: '2026-03-28T00:00:00Z',
    updatedAt: '2026-04-30T00:00:00Z',
  },
]

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-001',
    number: 'INV-2026-0418',
    clientId: 'cmp-001',
    amount: 48000,
    status: 'paid',
    issueDate: '2026-04-01T00:00:00Z',
    dueDate: '2026-04-30T00:00:00Z',
    items: [
      { id: 'inv-item-001', description: 'Enterprise workspace subscription', quantity: 1, rate: 42000, amount: 42000 },
      { id: 'inv-item-002', description: 'Premium support add-on', quantity: 1, rate: 6000, amount: 6000 },
    ],
    createdAt: '2026-04-01T00:00:00Z',
    updatedAt: '2026-04-18T00:00:00Z',
  },
  {
    id: 'inv-002',
    number: 'INV-2026-0431',
    clientId: 'cmp-002',
    amount: 72000,
    status: 'sent',
    issueDate: '2026-05-01T00:00:00Z',
    dueDate: '2026-05-31T00:00:00Z',
    items: [
      { id: 'inv-item-003', description: 'Enterprise annual renewal', quantity: 1, rate: 72000, amount: 72000 },
    ],
    createdAt: '2026-05-01T00:00:00Z',
    updatedAt: '2026-05-05T00:00:00Z',
  },
  {
    id: 'inv-003',
    number: 'INV-2026-0439',
    clientId: 'cmp-007',
    amount: 2990,
    status: 'overdue',
    issueDate: '2026-03-15T00:00:00Z',
    dueDate: '2026-04-14T00:00:00Z',
    items: [
      { id: 'inv-item-004', description: 'Starter plan monthly subscription', quantity: 10, rate: 299, amount: 2990 },
    ],
    createdAt: '2026-03-15T00:00:00Z',
    updatedAt: '2026-05-01T00:00:00Z',
  },
]

export const mockFinanceRecords: FinanceRecord[] = [
  { id: 'FIN-9001', type: 'invoice', description: 'Enterprise annual renewal', company: 'NovaBank Financial', amount: 72000, status: 'pending', date: '2026-05-01' },
  { id: 'FIN-9002', type: 'payment', description: 'Card payment settled', company: 'Acme Corp', amount: 48000, status: 'completed', date: '2026-04-18' },
  { id: 'FIN-9003', type: 'subscription', description: 'Professional monthly plan', company: 'Atlas Logistics', amount: 4200, status: 'completed', date: '2026-05-03' },
  { id: 'FIN-9004', type: 'refund', description: 'SLA credit for gateway incident', company: 'Quantum Retail Labs', amount: -850, status: 'completed', date: '2026-05-05' },
  { id: 'FIN-9005', type: 'payment', description: 'ACH transfer pending reconciliation', company: 'Helio Health Group', amount: 36000, status: 'pending', date: '2026-05-07' },
  { id: 'FIN-9006', type: 'invoice', description: 'Starter plan overdue balance', company: 'BluePeak Manufacturing', amount: 2990, status: 'failed', date: '2026-04-14' },
  { id: 'FIN-9007', type: 'subscription', description: 'Media workspace subscription', company: 'Northstar Media', amount: 1290, status: 'completed', date: '2026-05-08' },
]

export const mockSubscriptions: SubscriptionRecord[] = [
  { id: 'sub-001', plan: 'Enterprise', company: 'Acme Corp', status: 'active', price: 48000, billingCycle: 'yearly', startDate: '2026-01-14', endDate: '2027-01-13', users: 850, revenue: 48000 },
  { id: 'sub-002', plan: 'Enterprise', company: 'NovaBank Financial', status: 'active', price: 72000, billingCycle: 'yearly', startDate: '2026-02-02', endDate: '2027-02-01', users: 4200, revenue: 72000 },
  { id: 'sub-003', plan: 'Professional', company: 'GreenForge Energy', status: 'paused', price: 4200, billingCycle: 'monthly', startDate: '2025-03-18', endDate: '2026-06-18', users: 640, revenue: 50400 },
  { id: 'sub-004', plan: 'Enterprise', company: 'Helio Health Group', status: 'active', price: 36000, billingCycle: 'yearly', startDate: '2025-04-05', endDate: '2026-06-04', users: 2300, revenue: 36000 },
  { id: 'sub-005', plan: 'Professional', company: 'Atlas Logistics', status: 'active', price: 4200, billingCycle: 'monthly', startDate: '2025-05-23', endDate: '2026-05-23', users: 1180, revenue: 50400 },
  { id: 'sub-006', plan: 'Professional', company: 'Quantum Retail Labs', status: 'active', price: 2800, billingCycle: 'monthly', startDate: '2025-07-11', endDate: '2026-06-11', users: 320, revenue: 33600 },
  { id: 'sub-007', plan: 'Starter', company: 'BluePeak Manufacturing', status: 'cancelled', price: 299, billingCycle: 'monthly', startDate: '2025-08-01', endDate: '2026-04-30', users: 76, revenue: 2691 },
  { id: 'sub-008', plan: 'Starter', company: 'Northstar Media', status: 'active', price: 1290, billingCycle: 'monthly', startDate: '2025-10-19', endDate: '2026-06-19', users: 95, revenue: 15480 },
]

export const mockSupportTickets: SupportTicketRecord[] = [
  { id: 'TKT-1001', title: 'API burst limiter blocking normal traffic', submitter: 'John Acme', email: 'john@acme.com', priority: 'critical', status: 'in_progress', category: 'Technical', createdAt: '2026-05-08', updatedAt: '2026-05-10', messages: 18 },
  { id: 'TKT-1002', title: 'Enterprise invoice missing tax exemption', submitter: 'Priya Finance', email: 'finance@novabank.com', priority: 'high', status: 'waiting', category: 'Billing', createdAt: '2026-05-09', updatedAt: '2026-05-10', messages: 7 },
  { id: 'TKT-1003', title: 'SCIM deprovisioning delay for inactive users', submitter: 'Marcus Lee', email: 'it.admin@novabank.com', priority: 'high', status: 'open', category: 'Identity', createdAt: '2026-05-10', updatedAt: '2026-05-10', messages: 4 },
  { id: 'TKT-1004', title: 'Workspace export stuck in queue', submitter: 'Elena Costa', email: 'workspace.owner@greenforge.io', priority: 'medium', status: 'resolved', category: 'Data Export', createdAt: '2026-05-04', updatedAt: '2026-05-07', messages: 11 },
  { id: 'TKT-1005', title: 'Webhook retries generating duplicate events', submitter: 'Ops Atlas', email: 'workflow@atlaslogistics.example', priority: 'critical', status: 'in_progress', category: 'Integration', createdAt: '2026-05-07', updatedAt: '2026-05-10', messages: 22 },
  { id: 'TKT-1006', title: 'Need custom retention policy for audit logs', submitter: 'Compliance Helio', email: 'admin@heliohealth.example', priority: 'medium', status: 'open', category: 'Compliance', createdAt: '2026-05-06', updatedAt: '2026-05-09', messages: 5 },
  { id: 'TKT-1007', title: 'Payment method failed after card update', submitter: 'Northstar Media', email: 'team@northstarmedia.example', priority: 'low', status: 'closed', category: 'Billing', createdAt: '2026-04-28', updatedAt: '2026-05-02', messages: 6 },
]

export const mockNotifications: Notification[] = [
  {
    id: 'ntf-001',
    type: 'warning',
    title: 'Gateway incident active',
    message: 'API burst limiter mitigation is active for Acme Corp and Atlas Logistics.',
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: 'ntf-002',
    type: 'success',
    title: 'Payment settled',
    message: 'Acme Corp payment FIN-9002 settled successfully.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
  },
  {
    id: 'ntf-003',
    type: 'info',
    title: 'Subscription renewal due',
    message: 'Helio Health Group enterprise renewal enters the 30 day window.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true,
  },
]

export const mockAnalytics = {
  revenue: 412850,
  revenueChange: 14.8,
  totalRequests: 8429134,
  apiRequestsHourly: [18420, 22110, 23840, 21980, 26410, 30150, 28720],
  activeUsers: 18472,
  registrations: 1648,
  failedRequests: 95,
  deadAccounts: 2197,
  storageUsage: 7800,
  totalStorage: 14200,
  websocketConnections: 12140,
  activeSessions: 4254,
  memoryUsage: 64,
  queueJobs: 488,
  subscriptions: {
    active: 1254,
    trials: 158,
    churnRate: 2.4,
    total: 1412,
  },
  projectBreakdown: [
    { label: 'Active', value: 58 },
    { label: 'Planning', value: 16 },
    { label: 'Delayed', value: 9 },
    { label: 'Completed', value: 17 },
  ],
  taskActivity: [
    { date: 'Mon', completed: 142, pending: 74 },
    { date: 'Tue', completed: 168, pending: 63 },
    { date: 'Wed', completed: 151, pending: 81 },
    { date: 'Thu', completed: 194, pending: 68 },
    { date: 'Fri', completed: 221, pending: 55 },
    { date: 'Sat', completed: 98, pending: 32 },
    { date: 'Sun', completed: 76, pending: 29 },
  ],
}
