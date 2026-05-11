import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../app/store/hooks'
import type { AccountType, Permission, UserRole } from '../shared/types'

interface AccountTypeRouteProps {
  allowedTypes: AccountType[]
  fallback?: string
  children: ReactNode
}

export function AccountTypeRoute({ allowedTypes, fallback = '/unauthorized', children }: AccountTypeRouteProps) {
  const user = useAppSelector((state) => state.auth.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedTypes.includes(user.accountType)) {
    return <Navigate to={fallback} replace />
  }

  return <>{children}</>
}

interface RoleRouteProps {
  allowedRoles: UserRole[]
  fallback?: string
  children: ReactNode
}

export function RoleRoute({ allowedRoles, fallback = '/unauthorized', children }: RoleRouteProps) {
  const user = useAppSelector((state) => state.auth.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={fallback} replace />
  }

  return <>{children}</>
}

interface PermissionRouteProps {
  requiredPermissions: Permission | Permission[]
  requireAll?: boolean
  fallback?: string
  children: ReactNode
}

export function PermissionRoute({
  requiredPermissions,
  requireAll = true,
  fallback = '/unauthorized',
  children,
}: PermissionRouteProps) {
  const user = useAppSelector((state) => state.auth.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const permissions = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions]
  const hasPermission = requireAll
    ? permissions.every((permission) => user.permissions.includes(permission))
    : permissions.some((permission) => user.permissions.includes(permission))

  if (!hasPermission) {
    return <Navigate to={fallback} replace />
  }

  return <>{children}</>
}
