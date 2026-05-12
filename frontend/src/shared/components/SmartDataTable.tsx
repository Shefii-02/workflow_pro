import * as React from 'react'
import { cn } from '../../shared/utils/helpers'
import { DataTable, type Column } from './DataTable'
import { DataTableHeader } from './PageComponents'
import { Button } from './Button'
import { GlobalSearch, type SearchResult } from './GlobalSearch'
import { Card } from './Card'

export interface SmartDataTableProps<T extends { id: string }> {
  title?: string
  description?: string
  columns: Column<T>[]
  data: T[]
  isLoading?: boolean
  isSelectable?: boolean
  onSelectionChange?: (selectedIds: string[]) => void
  actions?: (row: T) => React.ReactNode
  pagination?: {
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
  }
  onSort?: (column: string, direction: 'asc' | 'desc') => void
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  filters?: React.ReactNode
  bulkActions?: React.ReactNode
  exportOptions?: {
    onExport: (format: 'csv' | 'excel' | 'pdf') => void
    formats?: ('csv' | 'excel' | 'pdf')[]
  }
  viewOptions?: {
    density?: 'compact' | 'comfortable' | 'spacious'
    onDensityChange?: (density: 'compact' | 'comfortable' | 'spacious') => void
  }
  refreshOptions?: {
    onRefresh: () => void
    isRefreshing?: boolean
  }
  className?: string
}

export function SmartDataTable<T extends { id: string }>({
  title,
  description,
  columns,
  data,
  isLoading,
  isSelectable,
  onSelectionChange,
  actions,
  pagination,
  onSort,
  searchPlaceholder,
  onSearch,
  filters,
  bulkActions,
  exportOptions,
  viewOptions,
  refreshOptions,
  className,
}: SmartDataTableProps<T>) {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
  const [density, setDensity] = React.useState<'compact' | 'comfortable' | 'spacious'>('comfortable')

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedRows(new Set(selectedIds))
    onSelectionChange?.(selectedIds)
  }

  const handleSearch = (query: string) => {
    onSearch?.(query)
  }

  const handleGlobalSearch = async (query: string): Promise<SearchResult[]> => {
    // Mock search implementation - in real app, this would search across the data
    const results: SearchResult[] = data
      .filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(query.toLowerCase())
        )
      )
      .slice(0, 5)
      .map(item => ({
        id: item.id,
        title: String(item.id),
        description: 'Found in table data',
        type: 'Table Row',
        category: title,
      }))

    return results
  }

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    exportOptions?.onExport(format)
  }

  const hasSelection = selectedRows.size > 0
  const selectedCount = selectedRows.size

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with search and actions */}
      <DataTableHeader
        title={title}
        description={description}
        searchPlaceholder={searchPlaceholder}
        onSearch={onSearch ? handleSearch : undefined}
        filters={
          <div className="flex items-center gap-3">
            {filters}

            {/* View Options */}
            {viewOptions && (
              <select
                value={density}
                onChange={(e) => {
                  const newDensity = e.target.value as 'compact' | 'comfortable' | 'spacious'
                  setDensity(newDensity)
                  viewOptions.onDensityChange?.(newDensity)
                }}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm"
              >
                <option value="compact">Compact</option>
                <option value="comfortable">Comfortable</option>
                <option value="spacious">Spacious</option>
              </select>
            )}

            {/* Export Options */}
            {exportOptions && (
              <div className="flex gap-2">
                {(exportOptions.formats || ['csv', 'excel', 'pdf']).map(format => (
                  <Button
                    key={format}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleExport(format)}
                  >
                    Export {format.toUpperCase()}
                  </Button>
                ))}
              </div>
            )}

            {/* Refresh */}
            {refreshOptions && (
              <Button
                variant="secondary"
                size="sm"
                onClick={refreshOptions.onRefresh}
                isLoading={refreshOptions.isRefreshing}
              >
                Refresh
              </Button>
            )}
          </div>
        }
        actions={
          <div className="flex gap-2">
            {/* Global Search */}
            <div className="w-64">
              <GlobalSearch
                placeholder="Search everything..."
                onSearch={handleGlobalSearch}
                debounceMs={200}
              />
            </div>
          </div>
        }
      />

      {/* Bulk Actions */}
      {hasSelection && bulkActions && (
        <Card className="p-4 bg-slate-50 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">
              {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              {bulkActions}
            </div>
          </div>
        </Card>
      )}

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isSelectable={isSelectable}
        onSelectionChange={handleSelectionChange}
        actions={actions}
        pagination={pagination}
        onSort={onSort}
      />
    </div>
  )
}