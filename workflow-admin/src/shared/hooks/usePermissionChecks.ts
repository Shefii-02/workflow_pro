import { hasAllowedAccess, hasRequiredAccess } from '../../auth/utils/access-control'

export function usePermissions() {
  // This would typically come from a context or auth store.
  const userPermissions = ['view_dashboard', 'manage_users']
  const userRole = 'admin'

  const hasPermission = (permission: string) => userPermissions.includes(permission)
  const hasAllPermissions = (permissions: string[]) => hasRequiredAccess(userPermissions, permissions)
  const hasAnyPermission = (permissions: string[]) => hasRequiredAccess(userPermissions, permissions, false)
  const hasRole = (role: string) => hasAllowedAccess(userRole, [role])
  const hasAnyRole = (roles: string[]) => hasAllowedAccess(userRole, roles)

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    hasRole,
    hasAnyRole,
    permissions: userPermissions,
    role: userRole,
  }
}
