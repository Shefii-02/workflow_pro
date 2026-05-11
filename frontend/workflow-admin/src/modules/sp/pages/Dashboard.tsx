import { useEffect, useState } from 'react'
import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import {
  PageHeader,
  StatCard,
  DataTableHeader,
  AnalyticsChartCard,
  ProgressWidgetCard,
} from '../../../shared/components/PageComponents'
import { Card, EmptyState } from '../../../shared/components/Card'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { Button } from '../../../shared/components/Button'
import { mockAnalytics, mockCompanies } from '../../../shared/utils/mock-data'
import type { Company } from '../../../shared/types'

const taskChartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    sparkline: { enabled: false },
    animations: { enabled: true, speed: 500 },
  },
  colors: ['#6366f1', '#22c55e'],
  stroke: { curve: 'smooth', width: 3 },
  grid: { strokeDashArray: 4, borderColor: '#e2e8f0' },
  xaxis: { categories: mockAnalytics.taskActivity.map((item) => item.date) },
  tooltip: { theme: 'light' },
  legend: { show: true, position: 'top', horizontalAlign: 'right' },
  responsive: [
    {
      breakpoint: 1280,
      options: {
        chart: { height: 280 },
        legend: { position: 'bottom' },
      },
    },
    {
      breakpoint: 768,
      options: {
        chart: { height: 240 },
        legend: { show: false },
      },
    },
  ],
}

const requestChartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    sparkline: { enabled: true },
    animations: { enabled: true, speed: 400 },
  },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#0ea5e9'],
  xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  tooltip: { theme: 'light' },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: { height: 220 },
      },
    },
  ],
}

export default function SPDashboard() {
  const [companies] = useState<Company[]>(mockCompanies)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoadingAnalytics(false)
    }, 900)
    return () => window.clearTimeout(timer)
  }, [])

  const companyColumns: Column<Company>[] = [
    {
      id: 'name',
      header: 'Company',
      accessorKey: 'name',
      sortable: true,
    },
    {
      id: 'industry',
      header: 'Industry',
      accessorKey: 'industry',
      sortable: true,
    },
    {
      id: 'employees',
      header: 'Employees',
      accessorKey: 'employeeCount',
      cell: (value) => value || '-',
    },
    {
      id: 'plan',
      header: 'Plan',
      accessorKey: 'subscriptionPlan',
      cell: (value) => (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-brand-100 text-brand-900 capitalize">
          {value}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (value) => (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${
            value === 'active' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-900'
          }`}
        >
          {value}
        </span>
      ),
    },
  ]

  const storagePercent = Math.round((mockAnalytics.storageUsage / mockAnalytics.totalStorage) * 100)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Platform Dashboard"
        description="Real-time platform performance, user adoption, and operational health in one place."
        action={<Button variant="primary">Export Report</Button>}
      />

      {selectedCompanies.length > 0 && (
        <div className="rounded-3xl bg-sky-50 border border-sky-100 p-4 text-sm text-sky-700">
          {selectedCompanies.length} companies selected for bulk actions.
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 xl:grid-cols-4">
        <StatCard
          label="Revenue analytics"
          value={`$${mockAnalytics.revenue.toLocaleString()}`}
          description="Monthly run rate estimate."
          change={{ value: mockAnalytics.revenueChange, type: 'increase' }}
          icon="💼"
          variant="brand"
        />
        <StatCard
          label="API requests"
          value={mockAnalytics.totalRequests.toLocaleString()}
          description="Request volume across all endpoints."
          change={{ value: 12.5, type: 'increase' }}
          icon="📡"
          variant="info"
        />
        <StatCard
          label="Active users"
          value={mockAnalytics.activeUsers.toLocaleString()}
          description="Users currently active this week."
          change={{ value: 8.2, type: 'increase' }}
          icon="👥"
          variant="success"
        />
        <StatCard
          label="New registrations"
          value={mockAnalytics.registrations}
          description="Sign-ups from the last 30 days."
          change={{ value: 3.1, type: 'increase' }}
          icon="📝"
          variant="neutral"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Failed requests"
          value={mockAnalytics.failedRequests}
          description="Exceptions and retries detected."
          change={{ value: 2.5, type: 'decrease' }}
          icon="⚠️"
          variant="danger"
        />
        <ProgressWidgetCard
          title="Storage usage"
          value={`${mockAnalytics.storageUsage} GB`}
          progress={storagePercent}
          label={`${mockAnalytics.totalStorage} GB total`}
          description="Primary database and file attachments."
          accent="warning"
        />
        <StatCard
          label="Realtime activities"
          value={`${mockAnalytics.websocketConnections} connections`}
          description="Live workspace and collaboration streams."
          icon="🔌"
          variant="info"
        />
        <StatCard
          label="Subscription health"
          value={`${mockAnalytics.subscriptions.active} active`}
          description={`Churn ${mockAnalytics.subscriptions.churnRate}% / Trials ${mockAnalytics.subscriptions.trials}`}
          icon="📦"
          variant="success"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <AnalyticsChartCard
          title="Task analytics"
          description="Completed vs pending task activity over the week."
          isLoading={isLoadingAnalytics}
          isEmpty={!mockAnalytics.taskActivity.length && !isLoadingAnalytics}
          emptyTitle="No task activity yet"
          emptyDescription="Tasks will appear once the platform begins capturing user activity."
          chart={
            <Chart
              options={taskChartOptions}
              series={[
                { name: 'Completed', data: mockAnalytics.taskActivity.map((item) => item.completed) },
                { name: 'Pending', data: mockAnalytics.taskActivity.map((item) => item.pending) },
              ]}
              type="area"
              width="100%"
              height={320}
            />
          }
        />

        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-[0.15em]">Project analytics</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">Portfolio composition</h2>
              <p className="mt-2 text-sm text-slate-500">Active pipeline and project health breakdown.</p>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-xl text-slate-700">📁</span>
          </div>

          <div className="mt-6 space-y-4">
            {mockAnalytics.projectBreakdown.map((segment) => (
              <div key={segment.label} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700">{segment.label}</p>
                </div>
                <div className="flex-1 px-4">
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        segment.label === 'Active'
                          ? 'bg-brand-600'
                          : segment.label === 'Planning'
                          ? 'bg-sky-500'
                          : segment.label === 'Delayed'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${segment.value}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-900">{segment.value}%</span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Projects active</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">62%</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">On hold</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">10%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-[0.15em]">Subscriptions analytics</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">Revenue cohort performance</h2>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-xl text-slate-700">💳</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Active plans</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{mockAnalytics.subscriptions.active}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Trials</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{mockAnalytics.subscriptions.trials}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Churn</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{mockAnalytics.subscriptions.churnRate}%</p>
            </div>
          </div>

          <div className="mt-6">
            <Chart
              options={requestChartOptions}
              series={[{ name: 'API requests', data: mockAnalytics.apiRequestsHourly }]}
              type="line"
              width="100%"
              height={200}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-[0.15em]">Realtime activity</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">Operations audit</h2>
            </div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-xl text-slate-700">⚡</span>
          </div>

          <div className="mt-6">
            <EmptyState
              icon="✅"
              title="No critical incidents"
              description="Your platform health is stable. Any new critical alerts will appear here instantly."
            />
          </div>
        </Card>
      </div>

      <Card>
        <DataTableHeader
          title="Company management"
          description="Active companies driving platform adoption."
          onSearch={() => {}}
          actions={
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                Filter
              </Button>
              <Button variant="primary" size="sm">
                Add Company
              </Button>
            </div>
          }
        />

        <DataTable
          columns={companyColumns}
          data={companies}
          isSelectable
          onSelectionChange={setSelectedCompanies}
          actions={() => (
            <div className="flex gap-2">
              <button className="text-brand-600 hover:text-brand-700 text-sm font-medium">Edit</button>
              <button className="text-rose-600 hover:text-rose-700 text-sm font-medium">Delete</button>
            </div>
          )}
        />
      </Card>
    </div>
  )
}
