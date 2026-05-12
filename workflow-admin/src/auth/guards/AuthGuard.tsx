import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { LoadingScreen } from '../../shared/components/LoadingScreen'
import { ROUTES } from '../../shared/constants/routes'

export function AuthGuard() {
  const { isAuthenticated, isRefreshing } = useAppSelector((state) => state.auth)
  const location = useLocation()

  // Show loading screen while refreshing token
  if (isRefreshing) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <Outlet />
}

export default AuthGuard
