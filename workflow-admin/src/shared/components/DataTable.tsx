import React, { useCallback, useMemo, useState } from 'react'
import { cn } from '../../shared/utils/helpers'
import { DataTablePagination } from './PageComponents'
import { Checkbox } from './Form'

export interface Column<T> {
  id: string
  header: string
  accessorKey: keyof T
  sortable?: boolean
  width?: string
  // Cell callbacks are intentionally loose because columns narrow values by accessor at call sites.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cell?: (value: any, row: T) => React.ReactNode
}

export interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[]
  data: T[]
  isLoading?: boolean
  isSelectable?: boolean
  onSelectionChange?: (selectedIds: string[]) => void
  actions?: (row: T) => React.ReactNode
  bulkActions?: (selectedIds: string[]) => React.ReactNode
  filters?: React.ReactNode
  enableSearch?: boolean
  searchPlaceholder?: string
  enableExport?: boolean
  exportFilename?: string
  enablePagination?: boolean
  pagination?: {
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
  }
  onSort?: (column: string, direction: 'asc' | 'desc') => void
  emptyMessage?: string
}

const DEFAULT_PAGE_SIZE = 10

function escapeCsvValue(value: unknown) {
  const normalized = value === null || value === undefined ? '' : String(value)
  return `"${normalized.replace(/"/g, '""')}"`
}

function DataTableComponent<T extends { id: string }>({
  columns,
  data,
  isLoading = false,
  isSelectable = true,
  onSelectionChange,
  actions,
  bulkActions,
  filters,
  enableSearch = true,
  searchPlaceholder = 'Filter table...',
  enableExport = true,
  exportFilename = 'table-export.csv',
  enablePagination = true,
  pagination,
  onSort,
  emptyMessage = 'No data found',
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [globalFilter, setGlobalFilter] = useState('')
  const [internalPage, setInternalPage] = useState(1)
  const [internalPageSize, setInternalPageSize] = useState(DEFAULT_PAGE_SIZE)

  const processedData = useMemo(() => {
    const query = globalFilter.trim().toLowerCase()
    const filtered = query
      ? data.filter((row) =>
          columns.some((column) => {
            const value = row[column.accessorKey]
            return String(value ?? '').toLowerCase().includes(query)
          }),
        )
      : data

    if (!sortColumn || onSort) {
      return filtered
    }

    const column = columns.find((item) => item.id === sortColumn)
    if (!column) {
      return filtered
    }

    return [...filtered].sort((a, b) => {
      const aValue = a[column.accessorKey]
      const bValue = b[column.accessorKey]
      if (aValue === bValue) return 0
      if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? -1 : 1
      if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? 1 : -1
      return aValue > bValue
        ? sortDirection === 'asc' ? 1 : -1
        : sortDirection === 'asc' ? -1 : 1
    })
  }, [columns, data, globalFilter, onSort, sortColumn, sortDirection])

  const displayedData = useMemo(() => {
    if (!enablePagination || pagination) {
      return processedData
    }

    const startIndex = (internalPage - 1) * internalPageSize
    return processedData.slice(startIndex, startIndex + internalPageSize)
  }, [enablePagination, internalPage, internalPageSize, pagination, processedData])

  const visibleSelectedRows = useMemo(() => {
    const availableIds = new Set(data.map((row) => row.id))
    return new Set(Array.from(selectedRows).filter((id) => availableIds.has(id)))
  }, [data, selectedRows])

  const selectedIds = useMemo(() => Array.from(visibleSelectedRows), [visibleSelectedRows])

  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      const allIds = new Set(displayedData.map((row) => row.id))
      setSelectedRows(allIds)
      onSelectionChange?.(Array.from(allIds))
    } else {
      setSelectedRows(new Set())
      onSelectionChange?.([])
    }
  }, [displayedData, onSelectionChange])

  const handleSelectRow = useCallback((id: string, checked: boolean) => {
    setSelectedRows((current) => {
      const nextSelected = new Set(current)
      if (checked) {
        nextSelected.add(id)
      } else {
        nextSelected.delete(id)
      }
      onSelectionChange?.(Array.from(nextSelected))
      return nextSelected
    })
  }, [onSelectionChange])

  const handleSort = useCallback((columnId: string) => {
    let newDirection: 'asc' | 'desc' = 'asc'
    if (sortColumn === columnId && sortDirection === 'asc') {
      newDirection = 'desc'
    }
    setSortColumn(columnId)
    setSortDirection(newDirection)
    onSort?.(columnId, newDirection)
  }, [onSort, sortColumn, sortDirection])

  const handleExport = useCallback((rows: T[] = processedData) => {
    const csvRows = [
      columns.map((column) => escapeCsvValue(column.header)).join(','),
      ...rows.map((row) =>
        columns.map((column) => escapeCsvValue(row[column.accessorKey])).join(','),
      ),
    ]

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = exportFilename.endsWith('.csv') ? exportFilename : `${exportFilename}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }, [columns, exportFilename, processedData])

  const handleInternalPageSizeChange = useCallback((size: number) => {
    setInternalPageSize(size)
    setInternalPage(1)
  }, [])

  const selectedData = useMemo(
    () => processedData.filter((row) => visibleSelectedRows.has(row.id)),
    [processedData, visibleSelectedRows],
  )
  const tableHasUtilityBar = enableSearch || filters || enableExport
  const effectivePagination = useMemo(
    () => pagination ?? (
      enablePagination
        ? {
            page: internalPage,
            pageSize: internalPageSize,
            total: processedData.length,
            onPageChange: setInternalPage,
            onPageSizeChange: handleInternalPageSizeChange,
          }
        : undefined
    ),
    [enablePagination, handleInternalPageSizeChange, internalPage, internalPageSize, pagination, processedData.length],
  )

  if (isLoading) {
    return (
      <div className="space-y-3">
        {tableHasUtilityBar && (
          <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-9 w-full max-w-xs animate-pulse rounded-md bg-gray-200" />
            <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />
          </div>
        )}
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {isSelectable && <th className="w-10 px-3 py-2.5"></th>}
                {columns.map((col) => (
                  <th key={col.id} className="px-3 py-2.5 text-left text-xs font-semibold uppercase text-gray-600">
                    {col.header}
                  </th>
                ))}
                <th className="w-10 px-3 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="border-b border-gray-200 animate-pulse">
                  {isSelectable && <td className="bg-gray-50 px-3 py-3"></td>}
                  {columns.map((col) => (
                    <td key={col.id} className="px-3 py-3">
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </td>
                  ))}
                  <td className="px-3 py-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tableHasUtilityBar && (
        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            {enableSearch && (
              <input
                type="search"
                value={globalFilter}
                onChange={(event) => {
                  setGlobalFilter(event.target.value)
                  setInternalPage(1)
                }}
                placeholder={searchPlaceholder}
                className="h-9 w-full max-w-sm rounded-md border border-gray-200 px-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            )}
            {filters}
          </div>

          {enableExport && (
            <button
              type="button"
              onClick={() => handleExport()}
              className="inline-flex h-9 items-center justify-center rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Export CSV
            </button>
          )}
        </div>
      )}

      {isSelectable && selectedIds.length > 0 && (
        <div className="flex flex-col gap-3 rounded-lg border border-brand-100 bg-brand-50 p-3 text-sm text-brand-900 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-medium">{selectedIds.length} selected</span>
          <div className="flex flex-wrap gap-2">
            {bulkActions?.(selectedIds)}
            <button
              type="button"
              onClick={() => handleExport(selectedData)}
              className="rounded-md border border-brand-200 bg-white px-3 py-1.5 font-medium text-brand-700 hover:bg-brand-50"
            >
              Export selected
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRows(new Set())
                onSelectionChange?.([])
              }}
              className="rounded-md border border-brand-200 bg-white px-3 py-1.5 font-medium text-brand-700 hover:bg-brand-50"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {isSelectable && (
                <th className="w-10 px-3 py-2.5">
                  <Checkbox
                    checked={displayedData.length > 0 && displayedData.every((row) => visibleSelectedRows.has(row.id))}
                    onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cn('px-3 py-2.5 text-left text-xs font-semibold uppercase text-gray-600', {
                    'cursor-pointer hover:bg-gray-100': Boolean(col.sortable),
                  })}
                  onClick={() => col.sortable && handleSort(col.id)}
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {col.sortable && (
                      <span className="text-gray-400">
                        {sortColumn === col.id && (sortDirection === 'asc' ? '↑' : '↓')}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-3 py-2.5 text-right text-xs font-semibold uppercase text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (isSelectable ? 2 : 1)}
                  className="px-3 py-10 text-center text-sm text-gray-600"
                >
                  <div className="font-medium text-gray-900">{emptyMessage}</div>
                  <div className="mt-1 text-gray-500">Adjust filters or export the current dataset for offline review.</div>
                </td>
              </tr>
            ) : displayedData.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                {isSelectable && (
                  <td className="px-3 py-3">
                    <Checkbox
                      checked={visibleSelectedRows.has(row.id)}
                      onChange={(e) => handleSelectRow(row.id, e.currentTarget.checked)}
                    />
                  </td>
                )}
                {columns.map((col) => {
                  const value = row[col.accessorKey as keyof T]
                  return (
                    <td key={col.id} className="px-3 py-3 text-sm text-gray-700">
                      {col.cell ? col.cell(value, row) : String(value || '-')}
                    </td>
                  )
                })}
                <td className="px-3 py-3 text-right text-sm">
                  {actions ? (
                    actions(row)
                  ) : (
                    <div className="inline-flex gap-2">
                      <button type="button" className="font-medium text-brand-600 hover:text-brand-700">View</button>
                      <button type="button" className="font-medium text-slate-600 hover:text-slate-900">Edit</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {effectivePagination && (
        <DataTablePagination
          page={effectivePagination.page}
          pageSize={effectivePagination.pageSize}
          total={effectivePagination.total}
          onPageChange={effectivePagination.onPageChange}
          onPageSizeChange={effectivePagination.onPageSizeChange}
        />
      )}
    </div>
  )
}

export const DataTable = React.memo(DataTableComponent) as typeof DataTableComponent
