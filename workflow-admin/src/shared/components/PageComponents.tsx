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
    <div className="mb-5 space-y-3">
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-950">{title}</h1>
          {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
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
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-xl font-semibold text-slate-950">{value}</p>
            {unit && <span className="text-sm text-slate-500">{unit}</span>}
          </div>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
          {change && (
            <p className={cn(
              'mt-2 inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium',
              change.type === 'increase' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700',
            )}
          >
            {change.type === 'increase' ? '▲' : '▼'} {Math.abs(change.value)}% from last month
          </p>
          )}
        </div>
        {icon && (
          <div className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-md text-base ring-1',
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
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase text-slate-500">{title}</p>
          <p className="mt-2 text-xl font-semibold text-slate-950">{value}</p>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        {label && <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium uppercase text-slate-600">{label}</span>}
      </div>
      <div className="mt-4 grid gap-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
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
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-950">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      </div>
      <div className="mt-4 min-h-[280px]">
        {isLoading ? (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
            <div className="h-[240px] overflow-hidden rounded-lg bg-slate-100">
              <div className="h-full w-full animate-pulse bg-slate-200" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-10 rounded-lg" />
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
      {footer && <div className="mt-4 border-t border-gray-200 pt-4">{footer}</div>}
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
    <div className="mb-4 space-y-3">
      {(title || description) && (
        <div>
          {title && <h2 className="text-base font-semibold text-gray-950">{title}</h2>}
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
              className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-100"
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
    <div className="mt-3 flex flex-col gap-3 border-t border-gray-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-600">
        Showing {start} to {end} of {total} results
      </div>
      <div className="flex items-center gap-2">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-8 rounded-md border border-gray-300 px-2 text-sm"
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
            className="h-8 rounded-md border border-gray-300 px-3 text-sm hover:bg-gray-50 disabled:opacity-50"
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
            className="h-8 rounded-md border border-gray-300 px-3 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
