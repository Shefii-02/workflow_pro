import * as React from 'react'
import { cn } from '../../shared/utils/helpers'

export interface LoadingScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'spinner' | 'pulse' | 'dots'
  overlay?: boolean
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

const Spinner = ({ className }: { className?: string }) => (
  <div className={cn('rounded-full border-4 border-slate-200 border-t-brand-600 animate-spin', className)} />
)

const Pulse = ({ className }: { className?: string }) => (
  <div className={cn('rounded-full bg-slate-300 animate-pulse', className)} />
)

const Dots = ({ className }: { className?: string }) => (
  <div className={cn('flex space-x-1', className)}>
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
)

const variants = {
  spinner: Spinner,
  pulse: Pulse,
  dots: Dots,
}

export function LoadingScreen({
  message = 'Loading...',
  size = 'md',
  variant = 'spinner',
  overlay = false,
  className,
  children,
  ...props
}: LoadingScreenProps) {
  const Component = variants[variant]

  const content = (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Component className={sizeStyles[size]} />
      {message && <p className="text-sm text-slate-600 font-medium">{message}</p>}
      {children}
    </div>
  )

  if (overlay) {
    return (
      <div
        className={cn(
          'fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center',
          className,
        )}
        {...props}
      >
        {content}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center min-h-[200px]',
        className,
      )}
      {...props}
    >
      {content}
    </div>
  )
}