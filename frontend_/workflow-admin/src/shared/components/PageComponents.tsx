import React from 'react'
import { cn } from '../utils/helpers'
import { Card } from './Card'

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
  trend?: 'up' | 'down' | 'neutral'
}

export function StatCard({ label, value, change, unit, icon }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {unit && <p className="text-sm text-gray-600">{unit}</p>}
          </div>
          {change && (
            <p className={cn('mt-2 text-sm font-medium', {
              'text-green-600': change.type === 'increase',
              'text-red-600': change.type === 'decrease',
            })}>
              {change.type === 'increase' ? '↑' : '↓'} {Math.abs(change.value)}% from last month
            </p>
          )}
        </div>
        {icon && <div className="text-2xl opacity-50">{icon}</div>}
      </div>
    </Card>
  )
}

// Analytics Chart Card
export interface AnalyticsChartCardProps {
  title: string
  description?: string
  chart: React.ReactNode
  footer?: React.ReactNode
}

export function AnalyticsChartCard({ title, description, chart, footer }: AnalyticsChartCardProps) {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      </div>
      <div className="mt-6">{chart}</div>
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
