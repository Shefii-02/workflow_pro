import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { LoadingScreen } from '../../shared/components/LoadingScreen'

export function AuthGuard() {
  const { isAuthenticated, isRefreshing } = useAppSelector((state) => state.auth)
  const location = useLocation()

  // Show loading screen while refreshing token
  if (isRefreshing) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default AuthGuard
