import * as React from 'react'
import { cn } from '../../shared/utils/helpers'

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  centered?: boolean
}

const maxWidthStyles = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
}

const paddingStyles = {
  none: '',
  sm: 'px-4 py-4',
  md: 'px-5 py-5',
  lg: 'px-6 py-6',
  xl: 'px-6 py-8',
}

export function PageContainer({
  maxWidth = 'full',
  padding = 'md',
  centered = false,
  className,
  children,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto',
        maxWidthStyles[maxWidth],
        paddingStyles[padding],
        centered && 'flex flex-col items-center justify-center min-h-screen',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
