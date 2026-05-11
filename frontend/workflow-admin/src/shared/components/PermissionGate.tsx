import * as React from 'react'
import { hasAllowedAccess, hasRequiredAccess } from '../../auth/utils/access-control'
import { EmptyState } from './Card'

export interface PermissionGateProps {
  children?: React.ReactNode
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
  if (allowedRoles.length > 0 && !hasAllowedAccess(userRole, allowedRoles)) {
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
    if (!hasRequiredAccess(userPermissions, permissions, requireAll)) {
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
