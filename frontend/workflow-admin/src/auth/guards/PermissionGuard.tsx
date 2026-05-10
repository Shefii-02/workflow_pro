import { Navigate, Outlet } from 'react-router-dom'
import type { UserRole, Permission } from '../../shared/types'
import { useAppSelector } from '../../app/store/hooks'

interface RoleGuardProps {
  allowedRoles: UserRole[]
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const user = useAppSelector((state) => state.auth.user)

  if (!user || !allowedRoles.includes(user.role)) {
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

  const permissions = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions]

  const hasPermission = requireAll
    ? permissions.every((p) => user.permissions.includes(p))
    : permissions.some((p) => user.permissions.includes(p))

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default RoleGuard
