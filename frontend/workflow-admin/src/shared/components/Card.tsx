import * as React from 'react'
import { cn } from '../../shared/utils/helpers'

// Card
export type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface p-4 shadow-card',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Badge
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary'
  size?: 'sm' | 'md'
}

export function Badge({ className, variant = 'default', size = 'sm', children, ...props }: BadgeProps) {
  const variantStyles = {
    default: 'border-slate-200 bg-slate-50 text-slate-700',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    warning: 'border-amber-200 bg-amber-50 text-amber-700',
    danger: 'border-rose-200 bg-rose-50 text-rose-700',
    info: 'border-sky-200 bg-sky-50 text-sky-700',
    primary: 'border-brand-200 bg-brand-50 text-brand-700',
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={cn('inline-flex items-center rounded-md border font-medium', variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </span>
  )
}

// Alert
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  onClose?: () => void
}

export function Alert({ className, variant = 'info', title, onClose, children, ...props }: AlertProps) {
  const variantStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    error: 'bg-red-50 border-red-200 text-red-900',
  }

  return (
    <div
      className={cn('rounded-lg border p-4 flex gap-3', variantStyles[variant], className)}
      {...props}
    >
      <div className="flex-1">
        {title && <h3 className="font-semibold mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      )}
    </div>
  )
}

// Divider
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'horizontal' | 'vertical'
  text?: string
}

export function Divider({ className, variant = 'horizontal', text, ...props }: DividerProps) {
  if (variant === 'vertical') {
    return <div className={cn('h-6 w-px bg-gray-300', className)} {...props} />
  }

  return (
    <div className={cn('relative my-6', className)} {...props}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      {text && (
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">{text}</span>
        </div>
      )}
    </div>
  )
}

// Skeleton
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number
}

export function Skeleton({ className, count = 1, ...props }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn('animate-pulse rounded-lg bg-gray-200 h-4 mb-2', className)}
          {...props}
        />
      ))}
    </>
  )
}

// Loading Spinner
export function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-brand-600 animate-spin"></div>
    </div>
  )
}

// Empty State
export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
      {icon && <div className="mb-3 text-3xl opacity-60">{icon}</div>}
      <h3 className="mb-1 text-sm font-semibold text-gray-900">{title}</h3>
      {description && <p className="mb-4 max-w-sm text-sm text-gray-600">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}
