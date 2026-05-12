import * as React from 'react'
import { cn } from '../../shared/utils/helpers'
import { Card } from './Card'
import { StatusBadge } from './StatusBadge'

export interface TimelineItem {
  id: string
  title: string
  description?: string
  timestamp: string | Date
  type?: 'info' | 'success' | 'warning' | 'error' | 'neutral'
  icon?: React.ReactNode
  user?: {
    name: string
    avatar?: string
  }
  metadata?: Record<string, any>
  actions?: React.ReactNode
}

export interface ActivityTimelineProps {
  items: TimelineItem[]
  isLoading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: React.ReactNode
  maxItems?: number
  showConnector?: boolean
  variant?: 'default' | 'compact' | 'detailed'
  className?: string
}

const typeColors = {
  info: 'text-sky-600 bg-sky-50 border-sky-200',
  success: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  warning: 'text-amber-600 bg-amber-50 border-amber-200',
  error: 'text-rose-600 bg-rose-50 border-rose-200',
  neutral: 'text-slate-600 bg-slate-50 border-slate-200',
}

const formatTimestamp = (timestamp: string | Date): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInDays < 7) return `${diffInDays}d ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

export function ActivityTimeline({
  items,
  isLoading = false,
  emptyTitle = 'No activity yet',
  emptyDescription = 'Activity will appear here as actions are performed.',
  emptyAction,
  maxItems,
  showConnector = true,
  variant = 'default',
  className,
}: ActivityTimelineProps) {
  const displayItems = maxItems ? items.slice(0, maxItems) : items

  if (isLoading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (displayItems.length === 0) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="text-center py-5">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{emptyTitle}</h3>
          <p className="text-slate-600 mb-4">{emptyDescription}</p>
          {emptyAction}
        </div>
      </Card>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {displayItems.map((item, index) => (
        <div key={item.id} className="flex gap-4">
          {/* Timeline connector */}
          {showConnector && (
            <div className="flex flex-col items-center">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2',
                typeColors[item.type || 'neutral']
              )}>
                {item.icon || '●'}
              </div>
              {index < displayItems.length - 1 && (
                <div className="w-px h-8 bg-slate-200 mt-2" />
              )}
            </div>
          )}

          {/* Content */}
          <div className={cn(
            'flex-1 pb-4',
            showConnector && 'border-l border-slate-200 pl-4'
          )}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-slate-900">{item.title}</h4>
                  {item.type && (
                    <StatusBadge status={item.type} size="sm" />
                  )}
                </div>

                {item.description && (
                  <p className="text-sm text-slate-600 mb-2">{item.description}</p>
                )}

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{formatTimestamp(item.timestamp)}</span>
                  {item.user && (
                    <div className="flex items-center gap-2">
                      {item.user.avatar ? (
                        <img
                          src={item.user.avatar}
                          alt={item.user.name}
                          className="w-4 h-4 rounded-full"
                        />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-xs">
                          {item.user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span>{item.user.name}</span>
                    </div>
                  )}
                </div>

                {item.metadata && variant === 'detailed' && (
                  <div className="mt-3 grid gap-2">
                    {Object.entries(item.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-slate-700 font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              {item.actions && (
                <div className="flex-shrink-0">
                  {item.actions}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Compact timeline for sidebar or small spaces
export function CompactTimeline({ items, maxItems = 5, className }: Pick<ActivityTimelineProps, 'items' | 'maxItems' | 'className'>) {
  const displayItems = items.slice(0, maxItems)

  return (
    <div className={cn('space-y-3', className)}>
      {displayItems.map((item) => (
        <div key={item.id} className="flex items-start gap-3">
          <div className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center text-xs border',
            typeColors[item.type || 'neutral']
          )}>
            {item.icon || '●'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-slate-900 truncate">{item.title}</p>
            <p className="text-xs text-slate-500">{formatTimestamp(item.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}