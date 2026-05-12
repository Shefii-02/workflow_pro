import { createElement, type ComponentType } from 'react'
import { PermissionGate, type PermissionGateProps } from './PermissionGate'

export function withPermissionGate<P extends object>(
  WrappedComponent: ComponentType<P>,
  permissionConfig: Omit<PermissionGateProps, 'children'>,
) {
  return function PermissionGatedComponent(props: P) {
    return createElement(
      PermissionGate,
      permissionConfig,
      createElement(WrappedComponent, props),
    )
  }
}
