import * as React from 'react'
import { cn } from '../../shared/utils/helpers'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const variantStyles = {
  primary: 'border border-slate-950 bg-slate-950 text-white hover:bg-slate-800 active:bg-slate-900 disabled:bg-gray-400',
  secondary: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-100',
  danger: 'border border-red-600 bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-400',
  ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-400',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:border-gray-200',
}

const sizeStyles = {
  xs: 'h-7 px-2 text-xs',
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-3 text-sm',
  lg: 'h-10 px-4 text-sm',
  xl: 'h-10 px-4 text-sm',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {isLoading && iconPosition === 'left' && <span className="animate-spin">⏳</span>}
        {!isLoading && icon && iconPosition === 'left' && icon}
        {children}
        {!isLoading && icon && iconPosition === 'right' && icon}
        {isLoading && iconPosition === 'right' && <span className="animate-spin">⏳</span>}
      </button>
    )
  },
)

Button.displayName = 'Button'
