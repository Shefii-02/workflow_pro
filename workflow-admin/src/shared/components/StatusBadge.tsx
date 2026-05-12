import * as React from 'react'
import { cn } from '../../shared/utils/helpers'

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'active' | 'inactive' | 'pending' | 'success' | 'warning' | 'error' | 'info' | 'draft' | 'published' | 'archived' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'filled' | 'outlined' | 'soft'
}

const statusConfig = {
  active: { label: 'Active', color: 'emerald' },
  inactive: { label: 'Inactive', color: 'slate' },
  pending: { label: 'Pending', color: 'amber' },
  success: { label: 'Success', color: 'emerald' },
  warning: { label: 'Warning', color: 'amber' },
  error: { label: 'Error', color: 'rose' },
  info: { label: 'Info', color: 'sky' },
  draft: { label: 'Draft', color: 'slate' },
  published: { label: 'Published', color: 'emerald' },
  archived: { label: 'Archived', color: 'slate' },
  neutral: { label: 'Neutral', color: 'slate' },
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
}

const variantStyles = {
  filled: (color: string) => `bg-${color}-600 text-white`,
  outlined: (color: string) => `border border-${color}-300 text-${color}-700 bg-transparent`,
  soft: (color: string) => `bg-${color}-50 text-${color}-700 border border-${color}-200`,
}

export function StatusBadge({
  status,
  size = 'md',
  variant = 'soft',
  className,
  children,
  ...props
}: StatusBadgeProps) {
  const config = statusConfig[status]
  const label = children || config.label

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full transition-colors',
        sizeStyles[size],
        variantStyles[variant](config.color),
        className,
      )}
      {...props}
    >
      {label}
    </span>
  )
}