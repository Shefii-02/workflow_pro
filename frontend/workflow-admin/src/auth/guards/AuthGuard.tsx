import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../app/store/hooks'

export function AuthGuard() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default AuthGuard
