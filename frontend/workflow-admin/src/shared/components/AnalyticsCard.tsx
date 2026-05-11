import * as React from 'react'
import { cn } from '../../shared/utils/helpers'
import { Card, EmptyState, Skeleton } from './Card'
import { StatusBadge } from './StatusBadge'

export interface AnalyticsMetric {
  label: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
    period?: string
  }
  format?: 'number' | 'currency' | 'percentage' | 'duration'
  icon?: React.ReactNode
  color?: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}

export interface AnalyticsCardProps {
  title: string
  description?: string
  metrics: AnalyticsMetric[]
  chart?: React.ReactNode
  footer?: React.ReactNode
  isLoading?: boolean
  isEmpty?: boolean
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: React.ReactNode
  variant?: 'default' | 'compact' | 'detailed'
  className?: string
}

const formatValue = (value: string | number, format?: AnalyticsMetric['format']): string => {
  if (typeof value === 'string') return value

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    case 'percentage':
      return `${value}%`
    case 'duration':
      // Simple duration formatting - could be enhanced
      return `${value}m`
    default:
      return new Intl.NumberFormat('en-US').format(value)
  }
}

const metricColors = {
  brand: 'text-brand-700 bg-brand-50 ring-brand-100',
  success: 'text-emerald-700 bg-emerald-50 ring-emerald-100',
  warning: 'text-amber-700 bg-amber-50 ring-amber-100',
  danger: 'text-rose-700 bg-rose-50 ring-rose-100',
  info: 'text-sky-700 bg-sky-50 ring-sky-100',
  neutral: 'text-slate-700 bg-slate-50 ring-slate-100',
}

export function AnalyticsCard({
  title,
  description,
  metrics,
  chart,
  footer,
  isLoading = false,
  isEmpty = false,
  emptyTitle = 'No analytics available',
  emptyDescription,
  emptyAction,
  variant = 'default',
  className,
}: AnalyticsCardProps) {
  if (isLoading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-20 rounded-3xl" />
            <Skeleton className="h-20 rounded-3xl" />
          </div>
          {chart && <Skeleton className="h-64 rounded-3xl" />}
        </div>
      </Card>
    )
  }

  if (isEmpty) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
        </div>
        <EmptyState
          icon="📊"
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
        />
      </Card>
    )
  }

  return (
    <Card className={cn('p-6', className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
        {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
      </div>

      <div className="space-y-6">
        {/* Metrics Grid */}
        <div className={cn(
          'grid gap-4',
          variant === 'compact' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'
        )}>
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={cn(
                'rounded-3xl p-4 border border-slate-200 bg-slate-50/50',
                variant === 'detailed' && 'p-6'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-[0.15em]">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">
                    {formatValue(metric.value, metric.format)}
                  </p>
                  {metric.change && (
                    <div className="mt-3">
                      <StatusBadge
                        status={metric.change.type === 'increase' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {metric.change.type === 'increase' ? '▲' : '▼'} {Math.abs(metric.change.value)}%
                        {metric.change.period && ` ${metric.change.period}`}
                      </StatusBadge>
                    </div>
                  )}
                </div>
                {metric.icon && (
                  <div className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-3xl text-lg shadow-sm ring-1',
                    metric.color ? metricColors[metric.color] : metricColors.neutral
                  )}>
                    {metric.icon}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        {chart && (
          <div className="mt-6">
            {chart}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            {footer}
          </div>
        )}
      </div>
    </Card>
  )
}