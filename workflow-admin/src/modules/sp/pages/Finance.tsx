import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Download, TrendingUp, DollarSign, CreditCard, BarChart3 } from 'lucide-react'
import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { PageHeader, StatCard, AnalyticsChartCard } from '../../../shared/components/PageComponents'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Form'
import { Badge } from '../../../shared/components/Badge'
import { Card } from '../../../shared/components/Card'
import { ROUTES } from '../../../shared/constants'
import { mockFinanceRecords, type FinanceRecord } from '../../../shared/utils/mock-data'

const revenueChartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  colors: ['#22c55e', '#ef4444'],
  stroke: { curve: 'smooth', width: 2 },
  grid: { strokeDashArray: 4, borderColor: '#e2e8f0' },
  xaxis: { categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] },
  yaxis: { title: { text: 'Amount ($)' } },
  tooltip: { theme: 'light' },
  responsive: [
    {
      breakpoint: 1280,
      options: { chart: { height: 320 } },
    },
  ],
}

const financeLinks = [
  { label: 'Revenue Dashboard', path: `${ROUTES.SP_FINANCE}/revenue`, icon: '📈', metric: '$154K MRR' },
  { label: 'Invoice Tables', path: `${ROUTES.SP_FINANCE}/invoices`, icon: '📄', metric: '104 open invoices' },
  { label: 'Subscription Analytics', path: `${ROUTES.SP_FINANCE}/subscription-analytics`, icon: '📊', metric: '1,254 active plans' },
  { label: 'Payouts', path: `${ROUTES.SP_FINANCE}/payouts`, icon: '🏦', metric: '$68.4K due' },
  { label: 'Transaction History', path: `${ROUTES.SP_FINANCE}/transactions`, icon: '💳', metric: '1,552 weekly txns' },
  { label: 'Tax Summaries', path: `${ROUTES.SP_FINANCE}/tax-summaries`, icon: '🧾', metric: '$18.6K collected' },
]

const FinancePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredFinance = useMemo(() => {
    return mockFinanceRecords.filter((record) => {
      const matchesSearch = record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === 'all' || record.type === typeFilter
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter
      return matchesSearch && matchesType && matchesStatus
    })
  }, [searchTerm, typeFilter, statusFilter])

  const paginatedFinance = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredFinance.slice(startIndex, startIndex + pageSize)
  }, [filteredFinance, currentPage, pageSize])

  const totalRevenue = mockFinanceRecords
    .filter(r => r.type === 'invoice' && r.status === 'completed')
    .reduce((sum, r) => sum + r.amount, 0)
  
  const totalPayments = mockFinanceRecords
    .filter(r => r.type === 'payment' && r.status === 'completed')
    .reduce((sum, r) => sum + r.amount, 0)
  
  const pendingAmount = mockFinanceRecords
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + Math.abs(r.amount), 0)

  const columns: Column<FinanceRecord>[] = [
    {
      id: 'id',
      header: 'ID',
      accessorKey: 'id',
      cell: (value) => <span className="font-mono text-sm font-semibold text-slate-900">{value}</span>,
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      cell: (value) => (
        <Badge variant={
          value === 'invoice' ? 'primary' :
          value === 'payment' ? 'success' :
          value === 'refund' ? 'warning' : 'secondary'
        }>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      cell: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.company}</div>
        </div>
      ),
    },
    {
      id: 'amount',
      header: 'Amount',
      accessorKey: 'amount',
      cell: (value) => (
        <span className={value < 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
          {value < 0 ? '-' : '+'}${Math.abs(value).toLocaleString()}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (value) => (
        <Badge variant={
          value === 'completed' ? 'success' :
          value === 'pending' ? 'warning' : 'danger'
        }>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'date',
      header: 'Date',
      accessorKey: 'date',
      cell: (value) => new Date(value).toLocaleDateString(),
    },
  ]

  return (
    <div className="space-y-5">
      <PageHeader
        title="Finance & Revenue"
        description="Track invoices, payments, refunds, and financial analytics."
        action={<Button variant="primary" icon={<Download className="w-4 h-4" />}>Export Report</Button>}
      />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          description="Completed invoices"
          change={{ value: 12.5, type: 'increase' }}
          icon={<DollarSign className="w-6 h-6" />}
          variant="success"
        />
        <StatCard
          label="Payments Received"
          value={`$${totalPayments.toLocaleString()}`}
          description="From customers"
          change={{ value: 8.2, type: 'increase' }}
          icon={<CreditCard className="w-6 h-6" />}
          variant="brand"
        />
        <StatCard
          label="Pending Payments"
          value={`$${pendingAmount.toLocaleString()}`}
          description="Awaiting confirmation"
          change={{ value: 2.1, type: 'increase' }}
          icon={<TrendingUp className="w-6 h-6" />}
          variant="warning"
        />
        <StatCard
          label="Monthly Recurring"
          value={`$${(totalRevenue / 12).toLocaleString()}`}
          description="Subscriptions & contracts"
          icon={<BarChart3 className="w-6 h-6" />}
          variant="info"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <AnalyticsChartCard
          title="Revenue Trend"
          description="Weekly revenue comparison"
          chart={
            <Chart
              options={revenueChartOptions}
              series={[
                { name: 'Revenue', data: [12000, 14500, 13800, 15200] },
                { name: 'Refunds', data: [300, 150, 500, 200] },
              ]}
              type="line"
              height={300}
            />
          }
        />

        <Card className="p-4 rounded-lg border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">Credit Card</p>
                <p className="text-sm text-slate-500">****4242</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">$32,500</p>
                <p className="text-xs text-slate-500">65% of total</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">Bank Transfer</p>
                <p className="text-sm text-slate-500">****2891</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">$15,700</p>
                <p className="text-xs text-slate-500">31% of total</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">Wire Transfer</p>
                <p className="text-sm text-slate-500">Manual</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">$2,800</p>
                <p className="text-xs text-slate-500">4% of total</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4 rounded-lg border border-slate-200">
        <div className="mb-5">
          <h3 className="text-lg font-bold text-slate-900">Finance Module Pages</h3>
          <p className="mt-1 text-sm text-slate-600">Open dedicated financial dashboards for revenue, invoices, subscriptions, payouts, transactions, and tax.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {financeLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex min-h-20 items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-sm"
            >
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-lg">
                {item.icon}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-slate-950">{item.label}</span>
                <span className="mt-1 block text-sm text-slate-500">{item.metric}</span>
              </span>
            </Link>
          ))}
        </div>
      </Card>

      <Card className="p-4 rounded-lg border border-slate-200">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Search by ID, description, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Types</option>
              <option value="invoice">Invoice</option>
              <option value="payment">Payment</option>
              <option value="refund">Refund</option>
              <option value="subscription">Subscription</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <DataTable
          data={paginatedFinance}
          columns={columns}
          pagination={{
            page: currentPage,
            pageSize,
            total: filteredFinance.length,
            onPageChange: setCurrentPage,
            onPageSizeChange: setPageSize,
          }}
        />
      </Card>
    </div>
  )
}

export default FinancePage
