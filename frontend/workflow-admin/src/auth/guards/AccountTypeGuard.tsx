import { Navigate, Outlet } from 'react-router-dom'
import type { AccountType } from '../../shared/types'
import { useAppSelector } from '../../app/store/hooks'

interface AccountTypeGuardProps {
  allowedTypes: AccountType[]
}

export function AccountTypeGuard({ allowedTypes }: AccountTypeGuardProps) {
  const user = useAppSelector((state) => state.auth.user)

  if (!user || !allowedTypes.includes(user.accountType)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default AccountTypeGuard
