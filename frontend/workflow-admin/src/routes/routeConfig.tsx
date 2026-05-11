import { lazy, useMemo } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../shared/constants'
import { AccountType } from '../shared/types'
import { AccountTypeRoute, PermissionRoute } from './RouteMiddleware'
import AuthGuard from '../auth/guards/AuthGuard'
import { Layout } from '../shared/components/Layout'
import { TopHeader } from '../shared/components/TopHeader'
import { getSidebarItems } from '../shared/config/sidebarConfig'

const LoginPage = lazy(() => import('../auth/pages/LoginPage'))
const UnauthorizedPage = lazy(() => import('../pages/Unauthorized'))
const SPDashboard = lazy(() => import('../modules/sp/pages/Dashboard'))
const SPCompanies = lazy(() => import('../modules/sp/pages/Companies'))
const SPFreelancers = lazy(() => import('../modules/sp/pages/Freelancers'))
const SPSubscriptions = lazy(() => import('../modules/sp/pages/Subscriptions'))
const SPAdminStaff = lazy(() => import('../modules/sp/pages/AdminStaff'))
const SPMonitoring = lazy(() => import('../modules/sp/pages/Monitoring'))
const SPAdvancedMonitoring = lazy(() => import('../modules/sp/pages/AdvancedMonitoring'))
const SPSupportTickets = lazy(() => import('../modules/sp/pages/SupportTickets'))
const SPSupportSystem = lazy(() => import('../modules/sp/pages/SupportSystem'))
const SPFinance = lazy(() => import('../modules/sp/pages/Finance'))
const SPAdvancedFinance = lazy(() => import('../modules/sp/pages/AdvancedFinance'))
const SPChatSystem = lazy(() => import('../modules/sp/pages/ChatSystem'))
const SPAnnouncements = lazy(() => import('../modules/sp/pages/Announcements'))
const SPGlobalActivities = lazy(() => import('../modules/sp/pages/GlobalActivities'))
const SPSettings = lazy(() => import('../modules/sp/pages/Settings'))
const SettingsPage = lazy(() => import('../pages/Settings'))
const CompanyDashboard = lazy(() => import('../modules/company/pages/Dashboard'))
const CompanyProjects = lazy(() => import('../modules/company/pages/Projects'))
const FreelancerDashboard = lazy(() => import('../modules/freelancer/pages/Dashboard'))
const FreelancerProjects = lazy(() => import('../modules/freelancer/pages/Projects'))
const ClientDashboard = lazy(() => import('../modules/client/pages/Dashboard'))

function SPLayout() {
  const sidebarItems = useMemo(() => getSidebarItems(AccountType.SP), [])

  return (
    <Layout
      sidebar={{ items: sidebarItems, branding: { logo: '⚡', name: 'Workflow', tagline: 'Super Platform' } }}
      header={<TopHeader />}
    >
      <Outlet />
    </Layout>
  )
}

function CompanyLayout() {
  const sidebarItems = useMemo(() => getSidebarItems(AccountType.COMPANY), [])

  return (
    <Layout
      sidebar={{ items: sidebarItems, branding: { logo: '🏢', name: 'Workflow', tagline: 'Company' } }}
      header={<TopHeader />}
    >
      <Outlet />
    </Layout>
  )
}

function FreelancerLayout() {
  const sidebarItems = useMemo(() => getSidebarItems(AccountType.FREELANCER), [])

  return (
    <Layout
      sidebar={{ items: sidebarItems, branding: { logo: '👨‍💼', name: 'Workflow', tagline: 'Freelancer' } }}
      header={<TopHeader />}
    >
      <Outlet />
    </Layout>
  )
}

function ClientLayout() {
  const sidebarItems = useMemo(() => getSidebarItems(AccountType.CLIENT), [])

  return (
    <Layout
      sidebar={{ items: sidebarItems, branding: { logo: '👤', name: 'Workflow', tagline: 'Client' } }}
      header={<TopHeader />}
    >
      <Outlet />
    </Layout>
  )
}

export const appRoutes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
    handle: {
      title: 'Sign in – Workflow',
      description: 'Login to your Workflow account for enterprise productivity.',
      layout: 'auth',
    },
  },
  {
    path: ROUTES.UNAUTHORIZED,
    element: <UnauthorizedPage />,
    handle: {
      title: 'Unauthorized – Workflow',
      description: 'You do not have permission to view this content.',
      layout: 'auth',
    },
  },
  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        path: 'sp',
        element: (
          <AccountTypeRoute allowedTypes={[AccountType.SP]}>
            <SPLayout />
          </AccountTypeRoute>
        ),
        handle: {
          title: 'Super Platform – Workflow',
          description: 'Super Platform workspace for administrators and partners.',
        },
        children: [
          {
            index: true,
            element: <SPDashboard />,
            handle: {
              title: 'SP Dashboard – Workflow',
              description: 'View enterprise analytics and platform operations.',
            },
          },
          {
            path: 'dashboard',
            element: <SPDashboard />,
            handle: {
              title: 'SP Dashboard – Workflow',
              description: 'View enterprise analytics and platform operations.',
            },
          },
          {
            path: 'companies',
            element: (
              <PermissionRoute requiredPermissions={['manage_companies']}>
                <SPCompanies />
              </PermissionRoute>
            ),
            handle: {
              title: 'Companies – Workflow',
              description: 'Manage company accounts, billing, and approvals.',
              requiredPermissions: ['manage_companies'],
            },
          },
          {
            path: 'freelancers',
            element: (
              <PermissionRoute requiredPermissions={['manage_freelancers']}>
                <SPFreelancers />
              </PermissionRoute>
            ),
            handle: {
              title: 'Freelancers – Workflow',
              description: 'Review freelancer accounts and assignments.',
              requiredPermissions: ['manage_freelancers'],
            },
          },
          {
            path: 'subscriptions',
            element: (
              <PermissionRoute requiredPermissions={['manage_subscriptions']}>
                <SPSubscriptions />
              </PermissionRoute>
            ),
            handle: {
              title: 'Subscriptions – Workflow',
              description: 'Manage platform plans, subscription health, and billing cycles.',
              requiredPermissions: ['manage_subscriptions'],
            },
          },
          {
            path: 'subscriptions/:view',
            element: (
              <PermissionRoute requiredPermissions={['manage_subscriptions']}>
                <SPSubscriptions />
              </PermissionRoute>
            ),
            handle: {
              title: 'Subscription Reports – Workflow',
              description: 'Review subscription plans, active accounts, and reports.',
              requiredPermissions: ['manage_subscriptions'],
            },
          },
          {
            path: 'staff',
            element: (
              <PermissionRoute requiredPermissions={['manage_staff']}>
                <SPAdminStaff />
              </PermissionRoute>
            ),
            handle: {
              title: 'Admin Staff – Workflow',
              description: 'Manage platform administrators, roles, and permissions.',
              requiredPermissions: ['manage_staff'],
            },
          },
          {
            path: 'staff/:view',
            element: (
              <PermissionRoute requiredPermissions={['manage_staff', 'manage_permissions']} requireAll={false}>
                <SPAdminStaff />
              </PermissionRoute>
            ),
            handle: {
              title: 'Admin Staff Permissions – Workflow',
              description: 'Manage staff access and permission groups.',
              requiredPermissions: ['manage_staff', 'manage_permissions'],
            },
          },
          {
            path: 'permissions',
            element: (
              <PermissionRoute requiredPermissions={['manage_permissions']}>
                <SPAdminStaff />
              </PermissionRoute>
            ),
            handle: {
              title: 'Permissions – Workflow',
              description: 'Manage platform staff permission groups.',
              requiredPermissions: ['manage_permissions'],
            },
          },
          {
            path: 'monitoring',
            element: (
              <PermissionRoute requiredPermissions={['view_monitoring']}>
                <SPMonitoring />
              </PermissionRoute>
            ),
            handle: {
              title: 'System Monitoring – Workflow',
              description: 'Monitor platform health, infrastructure, and live alerts.',
              requiredPermissions: ['view_monitoring'],
            },
          },
          {
            path: 'monitoring/:view',
            element: (
              <PermissionRoute requiredPermissions={['view_monitoring']}>
                <SPAdvancedMonitoring />
              </PermissionRoute>
            ),
            handle: {
              title: 'Advanced Monitoring – Workflow',
              description: 'Monitor detailed operational signals across the platform.',
              requiredPermissions: ['view_monitoring'],
            },
          },
          {
            path: 'support',
            element: (
              <PermissionRoute requiredPermissions={['manage_support']}>
                <SPSupportTickets />
              </PermissionRoute>
            ),
            handle: {
              title: 'Support Tickets – Workflow',
              description: 'Manage customer support queues and ticket resolution.',
              requiredPermissions: ['manage_support'],
            },
          },
          {
            path: 'support/tickets/:ticketId',
            element: (
              <PermissionRoute requiredPermissions={['manage_support']}>
                <SPSupportSystem />
              </PermissionRoute>
            ),
            handle: {
              title: 'Ticket Details – Workflow',
              description: 'Review support ticket details, ownership, SLA, and resolution plan.',
              requiredPermissions: ['manage_support'],
            },
          },
          {
            path: 'support/:view',
            element: (
              <PermissionRoute requiredPermissions={['manage_support']}>
                <SPSupportSystem />
              </PermissionRoute>
            ),
            handle: {
              title: 'Support System – Workflow',
              description: 'Manage support conversations, workflows, and analytics.',
              requiredPermissions: ['manage_support'],
            },
          },
          {
            path: 'finance',
            element: (
              <PermissionRoute requiredPermissions={['manage_finances']}>
                <SPFinance />
              </PermissionRoute>
            ),
            handle: {
              title: 'Finance – Workflow',
              description: 'Track platform revenue, invoices, refunds, and payouts.',
              requiredPermissions: ['manage_finances'],
            },
          },
          {
            path: 'finance/:view',
            element: (
              <PermissionRoute requiredPermissions={['manage_finances']}>
                <SPAdvancedFinance />
              </PermissionRoute>
            ),
            handle: {
              title: 'Finance Module – Workflow',
              description: 'Review revenue, invoices, subscriptions, payouts, transactions, and tax summaries.',
              requiredPermissions: ['manage_finances'],
            },
          },
          {
            path: 'chat',
            element: (
              <PermissionRoute requiredPermissions={['view_dashboard']}>
                <SPChatSystem />
              </PermissionRoute>
            ),
            handle: {
              title: 'Chat – Workflow',
              description: 'Realtime chat rooms, online presence, unread queues, and attachments.',
              requiredPermissions: ['view_dashboard'],
            },
          },
          {
            path: 'announcements',
            element: (
              <PermissionRoute requiredPermissions={['manage_announcements']}>
                <SPAnnouncements />
              </PermissionRoute>
            ),
            handle: {
              title: 'Announcements – Workflow',
              description: 'Create and manage platform-wide announcements.',
              requiredPermissions: ['manage_announcements'],
            },
          },
          {
            path: 'activities',
            element: (
              <PermissionRoute requiredPermissions={['view_analytics']}>
                <SPGlobalActivities />
              </PermissionRoute>
            ),
            handle: {
              title: 'Global Activities – Workflow',
              description: 'Audit user and system activity across the platform.',
              requiredPermissions: ['view_analytics'],
            },
          },
          {
            path: 'settings',
            element: (
              <PermissionRoute requiredPermissions={['edit_settings']}>
                <SPSettings />
              </PermissionRoute>
            ),
            handle: {
              title: 'SP Settings – Workflow',
              description: 'Manage global platform settings and permissions.',
              requiredPermissions: ['edit_settings'],
            },
          },
          {
            path: 'settings/:section',
            element: (
              <PermissionRoute requiredPermissions={['edit_settings']}>
                <SPSettings />
              </PermissionRoute>
            ),
            handle: {
              title: 'SP Settings – Workflow',
              description: 'Manage global platform settings and permissions.',
              requiredPermissions: ['edit_settings'],
            },
          },
        ],
      },
      {
        path: 'company',
        element: (
          <AccountTypeRoute allowedTypes={[AccountType.COMPANY]}>
            <CompanyLayout />
          </AccountTypeRoute>
        ),
        handle: {
          title: 'Company – Workflow',
          description: 'Company workspace for internal project management.',
        },
        children: [
          {
            index: true,
            element: <CompanyDashboard />,
            handle: {
              title: 'Company Dashboard – Workflow',
              description: 'Track company performance, finance, and operations.',
            },
          },
          {
            path: 'projects',
            element: (
              <PermissionRoute requiredPermissions={['manage_projects']}>
                <CompanyProjects />
              </PermissionRoute>
            ),
            handle: {
              title: 'Company Projects – Workflow',
              description: 'Manage projects, teams, and milestones within the company.',
              requiredPermissions: ['manage_projects'],
            },
          },
          {
            path: 'settings',
            element: (
              <PermissionRoute requiredPermissions={['edit_settings']}>
                <SettingsPage />
              </PermissionRoute>
            ),
            handle: {
              title: 'Company Settings – Workflow',
              description: 'Configure company preferences and team settings.',
              requiredPermissions: ['edit_settings'],
            },
          },
        ],
      },
      {
        path: 'freelancer',
        element: (
          <AccountTypeRoute allowedTypes={[AccountType.FREELANCER]}>
            <FreelancerLayout />
          </AccountTypeRoute>
        ),
        handle: {
          title: 'Freelancer – Workflow',
          description: 'Freelancer workspace for tasks, clients, and earnings.',
        },
        children: [
          {
            index: true,
            element: <FreelancerDashboard />,
            handle: {
              title: 'Freelancer Dashboard – Workflow',
              description: 'Monitor your projects, earnings, and client activity.',
            },
          },
          {
            path: 'projects',
            element: (
              <PermissionRoute requiredPermissions={['manage_projects']}>
                <FreelancerProjects />
              </PermissionRoute>
            ),
            handle: {
              title: 'Freelancer Projects – Workflow',
              description: 'Manage your freelance projects and deliverables.',
              requiredPermissions: ['manage_projects'],
            },
          },
          {
            path: 'settings',
            element: (
              <PermissionRoute requiredPermissions={['edit_settings']}>
                <SettingsPage />
              </PermissionRoute>
            ),
            handle: {
              title: 'Freelancer Settings – Workflow',
              description: 'Update your freelancer profile and workspace settings.',
              requiredPermissions: ['edit_settings'],
            },
          },
        ],
      },
      {
        path: 'client',
        element: (
          <AccountTypeRoute allowedTypes={[AccountType.CLIENT]}>
            <ClientLayout />
          </AccountTypeRoute>
        ),
        handle: {
          title: 'Client – Workflow',
          description: 'Client workspace for invoices, tasks, and collaboration.',
        },
        children: [
          {
            index: true,
            element: <ClientDashboard />,
            handle: {
              title: 'Client Dashboard – Workflow',
              description: 'View project status, invoices, and collaboration tools.',
            },
          },
          {
            path: 'settings',
            element: (
              <PermissionRoute requiredPermissions={['edit_settings']}>
                <SettingsPage />
              </PermissionRoute>
            ),
            handle: {
              title: 'Client Settings – Workflow',
              description: 'Manage your client account and application settings.',
              requiredPermissions: ['edit_settings'],
            },
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
]
