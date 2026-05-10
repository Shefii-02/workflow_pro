import { Navigate, Route, Routes } from 'react-router-dom'
import { AccountType } from './shared/types'

// Auth
import AuthGuard from './auth/guards/AuthGuard'
import AccountTypeGuard from './auth/guards/AccountTypeGuard'
import LoginPage from './auth/pages/LoginPage'

// Pages
import UnauthorizedPage from './pages/Unauthorized'

// Components
import { Layout } from './shared/components/Layout'
import { TopHeader } from './shared/components/TopHeader'

// SP Modules
import { spSidebarConfig } from './modules/sp/config/sidebar'
import SPDashboard from './modules/sp/pages/Dashboard'
import SPCompanies from './modules/sp/pages/Companies'
import SPFreelancers from './modules/sp/pages/Freelancers'

// Company Modules
import { companySidebarConfig } from './modules/sidebar.config'
import CompanyDashboard from './modules/company/pages/Dashboard'
import CompanyProjects from './modules/company/pages/Projects'

// Freelancer Modules
import { freelancerSidebarConfig } from './modules/sidebar.config'
import FreelancerDashboard from './modules/freelancer/pages/Dashboard'
import FreelancerProjects from './modules/freelancer/pages/Projects'

// Client Modules
import { clientSidebarConfig } from './modules/sidebar.config'
import ClientDashboard from './modules/client/pages/Dashboard'

function SPLayout() {
  return (
    <Layout
      sidebar={{ items: spSidebarConfig, branding: { logo: '⚡', name: 'Workflow', tagline: 'Super Platform' } }}
      header={<TopHeader />}
    >
      <Routes>
        <Route path="dashboard" element={<SPDashboard />} />
        <Route path="companies" element={<SPCompanies />} />
        <Route path="freelancers" element={<SPFreelancers />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Layout>
  )
}

function CompanyLayout() {
  return (
    <Layout
      sidebar={{ items: companySidebarConfig, branding: { logo: '🏢', name: 'Workflow', tagline: 'Company' } }}
      header={<TopHeader />}
    >
      <Routes>
        <Route path="dashboard" element={<CompanyDashboard />} />
        <Route path="projects" element={<CompanyProjects />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Layout>
  )
}

function FreelancerLayout() {
  return (
    <Layout
      sidebar={{ items: freelancerSidebarConfig, branding: { logo: '👨‍💼', name: 'Workflow', tagline: 'Freelancer' } }}
      header={<TopHeader />}
    >
      <Routes>
        <Route path="dashboard" element={<FreelancerDashboard />} />
        <Route path="projects" element={<FreelancerProjects />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Layout>
  )
}

function ClientLayout() {
  return (
    <Layout
      sidebar={{ items: clientSidebarConfig, branding: { logo: '👤', name: 'Workflow', tagline: 'Client' } }}
      header={<TopHeader />}
    >
      <Routes>
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected Routes */}
      <Route element={<AuthGuard />}>
        <Route element={<AccountTypeGuard allowedTypes={[AccountType.SP]} />}>
          <Route path="/sp/*" element={<SPLayout />} />
        </Route>

        <Route element={<AccountTypeGuard allowedTypes={[AccountType.COMPANY]} />}>
          <Route path="/company/*" element={<CompanyLayout />} />
        </Route>

        <Route element={<AccountTypeGuard allowedTypes={[AccountType.FREELANCER]} />}>
          <Route path="/freelancer/*" element={<FreelancerLayout />} />
        </Route>

        <Route element={<AccountTypeGuard allowedTypes={[AccountType.CLIENT]} />}>
          <Route path="/client/*" element={<ClientLayout />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
