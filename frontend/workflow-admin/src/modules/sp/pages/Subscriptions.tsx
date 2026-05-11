import React, { useState, useMemo } from 'react'
import { Plus, Search } from 'lucide-react'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { PageHeader } from '../../../shared/components/PageComponents'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Form'
import { Badge } from '../../../shared/components/Badge'
import { Card } from '../../../shared/components/Card'
import { mockSubscriptions, type SubscriptionRecord } from '../../../shared/utils/mock-data'

const SubscriptionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [planFilter, setPlanFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredSubscriptions = useMemo(() => {
    return mockSubscriptions.filter((sub) => {
      const matchesSearch = sub.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sub.plan.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter
      const matchesPlan = planFilter === 'all' || sub.plan === planFilter
      return matchesSearch && matchesStatus && matchesPlan
    })
  }, [searchTerm, statusFilter, planFilter])

  const paginatedSubscriptions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredSubscriptions.slice(startIndex, startIndex + pageSize)
  }, [filteredSubscriptions, currentPage, pageSize])

  const totalRevenue = filteredSubscriptions.reduce((sum, sub) => sum + (sub.status === 'active' ? sub.revenue : 0), 0)
  const activeCount = filteredSubscriptions.filter(s => s.status === 'active').length

  const columns: Column<SubscriptionRecord>[] = [
    {
      id: 'company',
      header: 'Company',
      accessorKey: 'company',
      sortable: true,
    },
    {
      id: 'plan',
      header: 'Plan',
      accessorKey: 'plan',
      sortable: true,
      cell: (value) => (
        <Badge variant={value === 'Enterprise' ? 'success' : value === 'Professional' ? 'primary' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (value) => (
        <Badge variant={
          value === 'active' ? 'success' :
          value === 'paused' ? 'warning' :
          value === 'cancelled' ? 'danger' : 'secondary'
        }>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'price',
      header: 'Price',
      accessorKey: 'price',
      cell: (value, row) => `$${value.toLocaleString()}/${row.billingCycle === 'yearly' ? 'yr' : 'mo'}`,
    },
    {
      id: 'users',
      header: 'Users',
      accessorKey: 'users',
      cell: (value) => value,
    },
    {
      id: 'endDate',
      header: 'Renewal Date',
      accessorKey: 'endDate',
      cell: (value) => new Date(value).toLocaleDateString(),
    },
  ]

  return (
    <div className="space-y-5">
      <PageHeader
        title="Subscriptions"
        description="Manage active subscriptions, plans, and billing cycles."
        action={<Button variant="primary" icon={<Plus className="w-4 h-4" />}>New Subscription</Button>}
      />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Active Subscriptions</p>
          <p className="text-2xl font-semibold text-slate-950">{activeCount}</p>
          <p className="text-xs text-slate-500 mt-1">Currently generating revenue</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Total Monthly Revenue</p>
          <p className="text-2xl font-semibold text-slate-950">${(totalRevenue / 12).toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-1">Annualized: ${totalRevenue.toLocaleString()}</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Total Users</p>
          <p className="text-2xl font-semibold text-slate-950">{filteredSubscriptions.reduce((sum, s) => sum + s.users, 0).toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-1">Across all subscriptions</p>
        </Card>
      </div>

      <Card className="p-4 rounded-lg border border-slate-200">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Search companies or plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Plans</option>
              <option value="Starter">Starter</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        <DataTable
          data={paginatedSubscriptions}
          columns={columns}
          pagination={{
            page: currentPage,
            pageSize,
            total: filteredSubscriptions.length,
            onPageChange: setCurrentPage,
            onPageSizeChange: setPageSize,
          }}
        />
      </Card>
    </div>
  )
}

export default SubscriptionsPage
