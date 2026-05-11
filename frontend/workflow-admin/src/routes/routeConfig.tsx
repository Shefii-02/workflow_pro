import { lazy } from 'react'
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
const SettingsPage = lazy(() => import('../pages/Settings'))
const SPDashboard = lazy(() => import('../modules/sp/pages/Dashboard'))
const SPCompanies = lazy(() => import('../modules/sp/pages/Companies'))
const SPFreelancers = lazy(() => import('../modules/sp/pages/Freelancers'))
const CompanyDashboard = lazy(() => import('../modules/company/pages/Dashboard'))
const CompanyProjects = lazy(() => import('../modules/company/pages/Projects'))
const FreelancerDashboard = lazy(() => import('../modules/freelancer/pages/Dashboard'))
const FreelancerProjects = lazy(() => import('../modules/freelancer/pages/Projects'))
const ClientDashboard = lazy(() => import('../modules/client/pages/Dashboard'))

function SPLayout() {
  return (
    <Layout
      sidebar={{ items: getSidebarItems(AccountType.SP), branding: { logo: '⚡', name: 'Workflow', tagline: 'Super Platform' } }}
      header={<TopHeader />}
    >
      <Outlet />
    </Layout>
  )
}

function CompanyLayout() {
  return (
    <Layout
      sidebar={{ items: getSidebarItems(AccountType.COMPANY), branding: { logo: '🏢', name: 'Workflow', tagline: 'Company' } }}
      header={<TopHeader />}
    >
      <Outlet />
    </Layout>
  )
}

function FreelancerLayout() {
  return (
    <Layout
      sidebar={{ items: getSidebarItems(AccountType.FREELANCER), branding: { logo: '👨‍💼', name: 'Workflow', tagline: 'Freelancer' } }}
      header={<TopHeader />}
    >
      <Outlet />
    </Layout>
  )
}

function ClientLayout() {
  return (
    <Layout
      sidebar={{ items: getSidebarItems(AccountType.CLIENT), branding: { logo: '👤', name: 'Workflow', tagline: 'Client' } }}
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
            path: 'settings',
            element: (
              <PermissionRoute requiredPermissions={['edit_settings']}>
                <SettingsPage />
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
