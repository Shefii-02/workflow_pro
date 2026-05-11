import * as React from 'react'
import { cn } from '../../shared/utils/helpers'

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
  actions?: React.ReactNode
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'bordered' | 'minimal'
}

const sizeStyles = {
  sm: {
    title: 'text-lg font-semibold',
    description: 'text-sm',
    spacing: 'space-y-2',
  },
  md: {
    title: 'text-xl font-semibold',
    description: 'text-sm',
    spacing: 'space-y-3',
  },
  lg: {
    title: 'text-2xl font-bold',
    description: 'text-base',
    spacing: 'space-y-4',
  },
}

const variantStyles = {
  default: '',
  bordered: 'border-b border-border pb-6',
  minimal: 'pb-2',
}

export function SectionHeader({
  title,
  description,
  action,
  actions,
  icon,
  size = 'md',
  variant = 'default',
  className,
  children,
  ...props
}: SectionHeaderProps) {
  const styles = sizeStyles[size]

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4',
        styles.spacing,
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-3 min-w-0">
        {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
        <div className="min-w-0">
          <h2 className={cn('text-slate-950', styles.title)}>{title}</h2>
          {description && (
            <p className={cn('text-slate-600 mt-1', styles.description)}>{description}</p>
          )}
          {children}
        </div>
      </div>
      {(action || actions) && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {action || actions}
        </div>
      )}
    </div>
  )
}