import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

interface AccountTypeGuardProps {
  allowedTypes: string[]
  redirectTo?: string
}

export function AccountTypeGuard({ allowedTypes, redirectTo = '/unauthorized' }: AccountTypeGuardProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user || !allowedTypes.includes(user.account_type)) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}

export default AccountTypeGuard
