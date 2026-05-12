import * as React from 'react'
import { cn } from '../../shared/utils/helpers'
import { Card } from './Card'
import { SectionHeader } from './SectionHeader'
import { LoadingScreen } from './LoadingScreen'
import { EmptyState } from './Card'

export interface DashboardSectionProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  actions?: React.ReactNode
  children: React.ReactNode
  isLoading?: boolean
  isEmpty?: boolean
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: React.ReactNode
  variant?: 'default' | 'bordered' | 'minimal' | 'card'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function DashboardSection({
  title,
  description,
  icon,
  action,
  actions,
  children,
  isLoading = false,
  isEmpty = false,
  emptyTitle,
  emptyDescription,
  emptyAction,
  variant = 'default',
  size = 'md',
  className,
}: DashboardSectionProps) {
  const content = (
    <>
      <SectionHeader
        title={title}
        description={description}
        icon={icon}
        action={action}
        actions={actions}
        size={size}
        variant={variant === 'bordered' ? 'bordered' : 'default'}
      />

      <div className="mt-6">
        {isLoading ? (
          <LoadingScreen message="Loading section data..." size="md" />
        ) : isEmpty ? (
          <EmptyState
            icon="📭"
            title={emptyTitle || `No ${title.toLowerCase()} available`}
            description={emptyDescription}
            action={emptyAction}
          />
        ) : (
          children
        )}
      </div>
    </>
  )

  if (variant === 'card') {
    return (
      <Card className={cn('p-6', className)}>
        {content}
      </Card>
    )
  }

  return (
    <div className={cn(
      variant === 'minimal' ? 'space-y-4' : 'space-y-6',
      className
    )}>
      {content}
    </div>
  )
}