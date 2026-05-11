import { memo, useMemo, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../app/store/hooks'
import { hasAllowedAccess, hasRequiredAccess, normalizeAccessList } from '../auth/utils/access-control'
import { ROUTES } from '../shared/constants'
import type { AccountType, Permission, UserRole } from '../shared/types'

const DEFAULT_AUTH_FALLBACK = ROUTES.LOGIN
const DEFAULT_ACCESS_FALLBACK = ROUTES.UNAUTHORIZED

function useCurrentUser() {
  return useAppSelector((state) => state.auth.user)
}

function redirectTo(path: string) {
  return <Navigate to={path} replace />
}

interface AccountTypeRouteProps {
  allowedTypes: readonly AccountType[]
  fallback?: string
  children: ReactNode
}

export const AccountTypeRoute = memo(function AccountTypeRoute({
  allowedTypes,
  fallback = DEFAULT_ACCESS_FALLBACK,
  children,
}: AccountTypeRouteProps) {
  const user = useCurrentUser()

  if (!user) {
    return redirectTo(DEFAULT_AUTH_FALLBACK)
  }

  if (!hasAllowedAccess(user.accountType, allowedTypes)) {
    return redirectTo(fallback)
  }

  return <>{children}</>
})

interface RoleRouteProps {
  allowedRoles: readonly UserRole[]
  fallback?: string
  children: ReactNode
}

export const RoleRoute = memo(function RoleRoute({
  allowedRoles,
  fallback = DEFAULT_ACCESS_FALLBACK,
  children,
}: RoleRouteProps) {
  const user = useCurrentUser()

  if (!user) {
    return redirectTo(DEFAULT_AUTH_FALLBACK)
  }

  if (!hasAllowedAccess(user.role, allowedRoles)) {
    return redirectTo(fallback)
  }

  return <>{children}</>
})

interface PermissionRouteProps {
  requiredPermissions: Permission | Permission[]
  requireAll?: boolean
  fallback?: string
  children: ReactNode
}

export const PermissionRoute = memo(function PermissionRoute({
  requiredPermissions,
  requireAll = true,
  fallback = DEFAULT_ACCESS_FALLBACK,
  children,
}: PermissionRouteProps) {
  const user = useCurrentUser()
  const permissions = useMemo(
    () => normalizeAccessList(requiredPermissions),
    [requiredPermissions],
  )

  if (!user) {
    return redirectTo(DEFAULT_AUTH_FALLBACK)
  }

  if (!hasRequiredAccess(user.permissions, permissions, requireAll)) {
    return redirectTo(fallback)
  }

  return <>{children}</>
})
