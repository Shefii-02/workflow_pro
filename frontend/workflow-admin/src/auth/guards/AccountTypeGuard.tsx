import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { ROUTES } from '../../shared/constants/routes'

interface AccountTypeGuardProps {
  allowedTypes: string[]
  redirectTo?: string
}

export function AccountTypeGuard({ allowedTypes, redirectTo = ROUTES.UNAUTHORIZED }: AccountTypeGuardProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (!user || !allowedTypes.includes(user.account_type)) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}

export default AccountTypeGuard
