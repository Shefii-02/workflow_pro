import React from 'react'
import { cn } from '../../shared/utils/helpers'
import { Card, EmptyState, Skeleton } from './Card'

// Page Header
export interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
  actions?: React.ReactNode
  breadcrumb?: { label: string; href?: string }[]
  children?: React.ReactNode
}

export function PageHeader({ title, description, action, actions, breadcrumb, children }: PageHeaderProps) {
  return (
    <div className="mb-8 space-y-4">
      {breadcrumb && (
        <div className="flex gap-2 text-sm text-gray-600">
          {breadcrumb.map((item, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span>/</span>}
              {item.href ? (
                <a href={item.href} className="text-brand-600 hover:text-brand-700">
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && <p className="mt-2 text-gray-600">{description}</p>}
        </div>
        {(action || actions) && <div>{action || actions}</div>}
      </div>
      {children}
    </div>
  )
}

// Stat Card
export interface StatCardProps {
  label: string
  value: string | number
  change?: { value: number; type: 'increase' | 'decrease' }
  unit?: string
  icon?: React.ReactNode
  description?: string
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}

const statVariantClasses: Record<NonNullable<StatCardProps['variant']>, string> = {
  brand: 'text-brand-700 bg-brand-50 ring-brand-100',
  success: 'text-emerald-700 bg-emerald-50 ring-emerald-100',
  warning: 'text-amber-700 bg-amber-50 ring-amber-100',
  danger: 'text-rose-700 bg-rose-50 ring-rose-100',
  info: 'text-sky-700 bg-sky-50 ring-sky-100',
  neutral: 'text-slate-700 bg-slate-50 ring-slate-100',
}

export function StatCard({ label, value, change, unit, icon, description, variant = 'neutral' }: StatCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow border border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-[0.15em]">{label}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-slate-950">{value}</p>
            {unit && <span className="text-sm text-slate-500">{unit}</span>}
          </div>
          {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
          {change && (
            <p className={cn(
              'mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium',
              change.type === 'increase' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700',
            )}
          >
            {change.type === 'increase' ? '▲' : '▼'} {Math.abs(change.value)}% from last month
          </p>
          )}
        </div>
        {icon && (
          <div className={cn(
            'inline-flex h-12 w-12 items-center justify-center rounded-3xl text-xl shadow-sm ring-1',
            statVariantClasses[variant],
          )}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}

export interface ProgressWidgetCardProps {
  title: string
  value: string | number
  progress: number
  description?: string
  label?: string
  accent?: 'brand' | 'success' | 'warning' | 'danger' | 'info'
}

const progressAccentClasses: Record<NonNullable<ProgressWidgetCardProps['accent']>, string> = {
  brand: 'bg-brand-600',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
  info: 'bg-sky-500',
}

export function ProgressWidgetCard({ title, value, progress, description, label, accent = 'brand' }: ProgressWidgetCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow border border-border">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-[0.15em]">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
          {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
        </div>
        {label && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">{label}</span>}
      </div>
      <div className="mt-5 grid gap-3">
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className={cn('h-full rounded-full transition-all duration-300', progressAccentClasses[accent])} style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Used</span>
          <span>{progress}%</span>
        </div>
      </div>
    </Card>
  )
}

// Analytics Chart Card
export interface AnalyticsChartCardProps {
  title: string
  description?: string
  chart?: React.ReactNode
  footer?: React.ReactNode
  isLoading?: boolean
  isEmpty?: boolean
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: React.ReactNode
}

export function AnalyticsChartCard({
  title,
  description,
  chart,
  footer,
  isLoading = false,
  isEmpty = false,
  emptyTitle = 'No analytics available',
  emptyDescription,
  emptyAction,
}: AnalyticsChartCardProps) {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      </div>
      <div className="mt-6 min-h-[320px]">
        {isLoading ? (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
            <div className="h-[280px] rounded-3xl bg-slate-100 overflow-hidden">
              <div className="h-full w-full animate-pulse bg-slate-200" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Skeleton className="h-12 rounded-3xl" />
              <Skeleton className="h-12 rounded-3xl" />
              <Skeleton className="h-12 rounded-3xl" />
            </div>
          </div>
        ) : isEmpty ? (
          <EmptyState
            icon="📭"
            title={emptyTitle}
            description={emptyDescription}
            action={emptyAction}
          />
        ) : (
          chart
        )}
      </div>
      {footer && <div className="mt-6 border-t border-gray-200 pt-6">{footer}</div>}
    </Card>
  )
}

// Data Table Header
export interface DataTableHeaderProps {
  title?: string
  description?: string
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function DataTableHeader({
  title,
  description,
  searchPlaceholder,
  onSearch,
  filters,
  actions,
}: DataTableHeaderProps) {
  return (
    <div className="space-y-4 mb-6">
      {(title || description) && (
        <div>
          {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
          {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
        </div>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          {onSearch && (
            <input
              type="text"
              placeholder={searchPlaceholder || 'Search...'}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          )}
        </div>
        {filters && <div className="flex gap-2">{filters}</div>}
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  )
}

// Data Table Pagination
export interface DataTablePaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export function DataTablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 pt-6">
      <div className="text-sm text-gray-600">
        Showing {start} to {end} of {total} results
      </div>
      <div className="flex items-center gap-2">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded border border-gray-300 px-2 py-1 text-sm"
        >
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </select>
        <div className="flex gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <div className="flex items-center gap-1 px-2">
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
          </div>
          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
