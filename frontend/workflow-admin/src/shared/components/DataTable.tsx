import React, { useState } from 'react'
import { cn } from '../../shared/utils/helpers'
import { DataTablePagination } from './PageComponents'
import { Checkbox } from './Form'

export interface Column<T> {
  id: string
  header: string
  accessorKey: keyof T
  sortable?: boolean
  width?: string
  cell?: (value: any, row: T) => React.ReactNode
}

export interface DataTableProps<T extends { id: string }> {
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
  emptyMessage?: string
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  isLoading = false,
  isSelectable = false,
  onSelectionChange,
  actions,
  pagination,
  onSort,
  emptyMessage = 'No data found',
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(data.map((row) => row.id))
      setSelectedRows(allIds)
      onSelectionChange?.(Array.from(allIds))
    } else {
      setSelectedRows(new Set())
      onSelectionChange?.([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedRows(newSelected)
    onSelectionChange?.(Array.from(newSelected))
  }

  const handleSort = (columnId: string) => {
    let newDirection: 'asc' | 'desc' = 'asc'
    if (sortColumn === columnId && sortDirection === 'asc') {
      newDirection = 'desc'
    }
    setSortColumn(columnId)
    setSortDirection(newDirection)
    onSort?.(columnId, newDirection)
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {isSelectable && <th className="px-6 py-3 w-12"></th>}
              {columns.map((col) => (
                <th key={col.id} className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-6 py-3 w-12"></th>}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx} className="border-b border-gray-200 animate-pulse">
                {isSelectable && <td className="px-6 py-4 bg-gray-50"></td>}
                {columns.map((col) => (
                  <td key={col.id} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="rounded-lg border border-gray-200 p-8 text-center text-gray-600">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div>
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {isSelectable && (
                <th className="px-6 py-3 w-12">
                  <Checkbox
                    checked={selectedRows.size === data.length && data.length > 0}
                    onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cn('px-6 py-3 text-left text-sm font-semibold text-gray-900', {
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
              {actions && <th className="px-6 py-3 w-12"></th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                {isSelectable && (
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedRows.has(row.id)}
                      onChange={(e) => handleSelectRow(row.id, e.currentTarget.checked)}
                    />
                  </td>
                )}
                {columns.map((col) => {
                  const value = row[col.accessorKey as keyof T]
                  return (
                    <td key={col.id} className="px-6 py-4 text-sm text-gray-700">
                      {col.cell ? col.cell(value, row) : String(value || '-')}
                    </td>
                  )
                })}
                {actions && <td className="px-6 py-4 text-sm">{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <DataTablePagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={pagination.onPageChange}
          onPageSizeChange={pagination.onPageSizeChange}
        />
      )}
    </div>
  )
}
