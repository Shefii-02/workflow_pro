import { Suspense, useEffect } from 'react'
import { matchRoutes, useLocation, useRoutes } from 'react-router-dom'
import { useTokenRefresh, useSessionExpiry } from './hooks/useAuth'
import { useSessionTracker } from './hooks/useSessionTracker'
import { AuthErrorBoundary } from './auth/components/AuthErrorBoundary'
import { LoadingScreen, useConfirmDialog } from './shared/components'
import { appRoutes } from './routes/routeConfig'
import { ROUTES } from './shared/constants/routes'

function AppContent() {
  useTokenRefresh()
  useSessionExpiry()

  const { confirm } = useConfirmDialog()
  const location = useLocation()
  const { pathname } = location

  useSessionTracker({
    timeoutMinutes: 60,
    warningMinutes: 5,
    onWarning: () => {
      const warningShown = localStorage.getItem('sessionWarningShown')
      if (!warningShown) {
        confirm({
          title: 'Session Expiring Soon',
          description: 'Your session will expire in 5 minutes due to inactivity. Would you like to extend your session?',
          confirmText: 'Stay Logged In',
          cancelText: 'Logout Now',
          variant: 'warning',
          onConfirm: () => {
            localStorage.setItem('sessionWarningShown', 'true')
          },
          onCancel: () => {
            window.location.href = ROUTES.LOGIN
          },
        })
      }
    },
    onTimeout: () => {
      localStorage.removeItem('sessionWarningShown')
    },
  })

  useEffect(() => {
    const title = matchRoutes(appRoutes, location)
      ?.map((match) => (match.route.handle as { title?: string } | undefined)?.title)
      .filter((value): value is string => Boolean(value))
      .reverse()[0]

    if (title) {
      document.title = title
    }
  }, [location, pathname])

  const routing = useRoutes(appRoutes)

  return <Suspense fallback={<LoadingScreen message="Loading workspace..." />}>{routing}</Suspense>
}

export default function App() {
  return (
    <AuthErrorBoundary>
      <AppContent />
    </AuthErrorBoundary>
  )
}
