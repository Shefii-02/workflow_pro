import * as React from 'react'
import { EmptyState } from './Card'

export interface PermissionGateProps {
  children: React.ReactNode
  permissions?: string[]
  requireAll?: boolean
  fallback?: React.ReactNode
  userPermissions?: string[]
  userRole?: string
  allowedRoles?: string[]
}

export function PermissionGate({
  children,
  permissions = [],
  requireAll = false,
  fallback,
  userPermissions = [],
  userRole,
  allowedRoles = [],
}: PermissionGateProps) {
  // Check role-based access
  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    return fallback ? <>{fallback}</> : (
      <EmptyState
        icon="🔒"
        title="Access Denied"
        description="You don't have the required role to access this content."
      />
    )
  }

  // Check permission-based access
  if (permissions.length > 0) {
    const hasPermission = requireAll
      ? permissions.every(permission => userPermissions.includes(permission))
      : permissions.some(permission => userPermissions.includes(permission))

    if (!hasPermission) {
      return fallback ? <>{fallback}</> : (
        <EmptyState
          icon="🔒"
          title="Permission Required"
          description="You don't have the necessary permissions to access this content."
        />
      )
    }
  }

  return <>{children}</>
}

// Higher-order component version
export function withPermissionGate<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  permissionConfig: Omit<PermissionGateProps, 'children'>
) {
  return function PermissionGatedComponent(props: P) {
    return (
      <PermissionGate {...permissionConfig}>
        <WrappedComponent {...props} />
      </PermissionGate>
    )
  }
}

// Hook for checking permissions
export function usePermissions() {
  // This would typically come from a context or auth store
  const userPermissions = ['view_dashboard', 'manage_users'] // Mock data
  const userRole = 'admin' // Mock data

  const hasPermission = (permission: string) => userPermissions.includes(permission)
  const hasAllPermissions = (permissions: string[]) => permissions.every(hasPermission)
  const hasAnyPermission = (permissions: string[]) => permissions.some(hasPermission)
  const hasRole = (role: string) => userRole === role
  const hasAnyRole = (roles: string[]) => roles.includes(userRole)

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