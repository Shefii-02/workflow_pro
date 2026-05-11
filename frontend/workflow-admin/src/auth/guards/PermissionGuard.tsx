import { Navigate, Outlet } from 'react-router-dom'
import { hasAllowedAccess, hasRequiredAccess, normalizeAccessList } from '../utils/access-control'
import type { UserRole, Permission } from '../../shared/types'
import { useAppSelector } from '../../app/store/hooks'

interface RoleGuardProps {
  allowedRoles: UserRole[]
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const user = useAppSelector((state) => state.auth.user)

  if (!hasAllowedAccess(user?.role, allowedRoles)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

interface PermissionGuardProps {
  requiredPermissions: Permission | Permission[]
  requireAll?: boolean
}

export function PermissionGuard({ requiredPermissions, requireAll = true }: PermissionGuardProps) {
  const user = useAppSelector((state) => state.auth.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const permissions = normalizeAccessList(requiredPermissions)

  if (!hasRequiredAccess(user.permissions, permissions, requireAll)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default RoleGuard
