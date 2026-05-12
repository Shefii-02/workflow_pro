import { useEffect, useMemo, useState } from 'react'
import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  Gauge,
  Globe2,
  HeartPulse,
  LineChart,
  MonitorUp,
  MoreHorizontal,
  RadioTower,
  Search,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  UsersRound,
  WalletCards,
} from 'lucide-react'
import { DataTableHeader } from '../../../shared/components/PageComponents'
import { Badge, Card } from '../../../shared/components/Card'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { Button } from '../../../shared/components/Button'
import {
  mockAnalytics,
  mockCompanies,
  mockFinanceRecords,
  mockProjects,
  mockSubscriptions,
  mockSupportTickets,
  mockTasks,
  mockUsers,
} from '../../../shared/utils/mock-data'
import type { Company } from '../../../shared/types'
import { AccountType } from '../../../shared/types'
import { cn } from '../../../shared/utils/helpers'

const compactNumber = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const areaChartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: true, speed: 500 },
  },
  colors: ['#2563eb', '#14b8a6'],
  dataLabels: { enabled: false },
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 0.25, opacityFrom: 0.24, opacityTo: 0.02, stops: [0, 90, 100] },
  },
  grid: { borderColor: '#e2e8f0', strokeDashArray: 4, padding: { left: 0, right: 8 } },
  legend: { show: true, position: 'top', horizontalAlign: 'right', fontSize: '12px' },
  stroke: { curve: 'smooth', width: 3 },
  tooltip: { theme: 'light' },
  xaxis: {
    categories: mockAnalytics.taskActivity.map((item) => item.date),
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#64748b' } },
  },
  yaxis: { labels: { style: { colors: '#64748b' } } },
  responsive: [{ breakpoint: 768, options: { legend: { show: false } } }],
}

const requestChartOptions: ApexOptions = {
  chart: { toolbar: { show: false }, zoom: { enabled: false }, sparkline: { enabled: true } },
  colors: ['#0f172a'],
  dataLabels: { enabled: false },
  fill: {
    type: 'gradient',
    gradient: { opacityFrom: 0.22, opacityTo: 0.01 },
  },
  stroke: { curve: 'smooth', width: 3 },
  tooltip: { theme: 'light' },
}

const workloadOptions: ApexOptions = {
  chart: { toolbar: { show: false }, sparkline: { enabled: true } },
  colors: ['#2563eb', '#14b8a6', '#f59e0b', '#ef4444'],
  dataLabels: { enabled: false },
  labels: mockAnalytics.projectBreakdown.map((segment) => segment.label),
  legend: { show: false },
  plotOptions: {
    radialBar: {
      hollow: { size: '42%' },
      track: { background: '#f1f5f9' },
      dataLabels: {
        name: { show: false },
        value: { color: '#0f172a', fontSize: '18px', fontWeight: 700 },
        total: { show: true, label: 'Healthy', color: '#64748b', formatter: () => '91%' },
      },
    },
  },
}

const enterpriseSignals = [
  {
    label: 'Tenant ARR',
    value: currency.format(mockAnalytics.revenue * 12),
    detail: 'Enterprise, professional, and starter plans',
    change: '+14.8%',
    icon: WalletCards,
    tone: 'blue',
  },
  {
    label: 'Managed companies',
    value: mockCompanies.length.toString(),
    detail: `${mockCompanies.filter((company) => company.status === 'active').length} active workspaces`,
    change: '+6.1%',
    icon: Building2,
    tone: 'teal',
  },
  {
    label: 'People network',
    value: compactNumber.format(mockAnalytics.activeUsers),
    detail: 'HR users, clients, and freelancers',
    change: '+8.2%',
    icon: UsersRound,
    tone: 'slate',
  },
  {
    label: 'Realtime health',
    value: `${mockAnalytics.memoryUsage}%`,
    detail: `${compactNumber.format(mockAnalytics.websocketConnections)} live websocket sessions`,
    change: '99.97%',
    icon: RadioTower,
    tone: 'emerald',
  },
]

const operatingLanes = [
  { label: 'Projects', value: mockProjects.length, metric: 'active portfolios', icon: BriefcaseBusiness, color: 'bg-blue-600' },
  { label: 'HR', value: mockUsers.filter((user) => user.accountType === AccountType.COMPANY).length, metric: 'company admins', icon: UserRoundCheck, color: 'bg-teal-600' },
  { label: 'Marketplace', value: mockUsers.filter((user) => user.accountType === AccountType.FREELANCER).length, metric: 'verified freelancers', icon: Sparkles, color: 'bg-amber-500' },
  { label: 'Subscriptions', value: mockAnalytics.subscriptions.active, metric: 'paid accounts', icon: CreditCard, color: 'bg-slate-900' },
]

const incidentFeed = [
  { title: 'API burst limiter mitigation', meta: 'Acme Corp and Atlas Logistics', status: 'In progress', tone: 'warning' },
  { title: 'SCIM deprovisioning review', meta: 'NovaBank Financial identity audit', status: 'Open', tone: 'info' },
  { title: 'Webhook duplicate event cluster', meta: 'Integration queue workers', status: 'Critical', tone: 'danger' },
  { title: 'Helio renewal readiness', meta: 'Subscription renewal window', status: 'Stable', tone: 'success' },
]

const subscriptionMix = [
  { label: 'Enterprise', value: mockSubscriptions.filter((item) => item.plan === 'Enterprise').length, revenue: 156000 },
  { label: 'Professional', value: mockSubscriptions.filter((item) => item.plan === 'Professional').length, revenue: 134400 },
  { label: 'Starter', value: mockSubscriptions.filter((item) => item.plan === 'Starter').length, revenue: 18171 },
]

const toneClasses = {
  blue: 'bg-blue-50 text-blue-700 ring-blue-100',
  teal: 'bg-teal-50 text-teal-700 ring-teal-100',
  slate: 'bg-slate-100 text-slate-800 ring-slate-200',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
}

function SignalCard({ signal }: { signal: (typeof enterpriseSignals)[number] }) {
  const Icon = signal.icon

  return (
    <Card className="min-h-40 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase text-slate-500">{signal.label}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-950">{signal.value}</p>
          <p className="mt-2 text-sm text-slate-500">{signal.detail}</p>
        </div>
        <span className={cn('inline-flex h-10 w-10 items-center justify-center rounded-md ring-1', toneClasses[signal.tone as keyof typeof toneClasses])}>
          <Icon size={19} />
        </span>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3 text-sm">
        <span className="font-semibold text-emerald-700">{signal.change}</span>
        <span className="text-slate-500">current period</span>
      </div>
    </Card>
  )
}

export default function SPDashboard() {
  const [companies] = useState<Company[]>(mockCompanies)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoadingAnalytics(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  const companyColumns: Column<Company>[] = useMemo(
    () => [
      {
        id: 'name',
        header: 'Company',
        accessorKey: 'name',
        sortable: true,
        cell: (value, row) => (
          <div>
            <p className="font-semibold text-slate-950">{value}</p>
            <p className="text-xs text-slate-500">{row.email}</p>
          </div>
        ),
      },
      { id: 'industry', header: 'Industry', accessorKey: 'industry', sortable: true },
      {
        id: 'employees',
        header: 'Employees',
        accessorKey: 'employeeCount',
        cell: (value) => compactNumber.format(Number(value || 0)),
      },
      {
        id: 'plan',
        header: 'Plan',
        accessorKey: 'subscriptionPlan',
        cell: (value) => <Badge variant={value === 'enterprise' ? 'primary' : 'default'}>{String(value)}</Badge>,
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        cell: (value) => (
          <Badge variant={value === 'active' ? 'success' : value === 'suspended' ? 'danger' : 'warning'}>
            {String(value)}
          </Badge>
        ),
      },
    ],
    [],
  )

  const financeTotal = mockFinanceRecords.reduce((sum, item) => sum + item.amount, 0)
  const highPriorityTickets = mockSupportTickets.filter((ticket) => ticket.priority === 'critical' || ticket.priority === 'high').length
  const urgentTasks = mockTasks.filter((task) => task.priority === 'urgent' || task.priority === 'high').length

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white shadow-elevated">
        <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-white/10 bg-white/10 text-white">Global command center</Badge>
              <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-100">Live platform</Badge>
            </div>
            <div className="mt-7 max-w-3xl">
              <h1 className="text-2xl font-semibold tracking-normal sm:text-3xl">
                Workflow enterprise operations
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Manage project delivery, HR operations, freelancer capacity, company tenants, subscription revenue, and realtime infrastructure from one admin surface.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button icon={<Download size={16} />} className="border-white bg-white text-slate-950 hover:bg-slate-100">
                Export board
              </Button>
              <Button variant="outline" icon={<MonitorUp size={16} />} className="border-white/20 text-white hover:bg-white/10">
                Open monitoring
              </Button>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.03] p-6 lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">Reliability score</p>
                <p className="mt-2 text-3xl font-semibold">99.97%</p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-400/20">
                <ShieldCheck size={22} />
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {[
                ['API requests', compactNumber.format(mockAnalytics.totalRequests)],
                ['Queue jobs', mockAnalytics.queueJobs.toString()],
                ['High priority tickets', highPriorityTickets.toString()],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{label}</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[76%] rounded-full bg-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedCompanies.length > 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm font-medium text-blue-800">
          {selectedCompanies.length} companies selected for bulk review.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {enterpriseSignals.map((signal) => (
          <SignalCard key={signal.label} signal={signal} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
        <Card className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Delivery intelligence</p>
              <h2 className="mt-2 text-lg font-semibold text-slate-950">Project and task throughput</h2>
              <p className="mt-1 text-sm text-slate-500">Completed work, pending load, and operational urgency across tenants.</p>
            </div>
            <Badge variant="success">{urgentTasks} urgent tasks</Badge>
          </div>
          <div className="mt-5 min-h-[320px]">
            {isLoadingAnalytics ? (
              <div className="h-[300px] animate-pulse rounded-lg bg-slate-100" />
            ) : (
              <Chart
                options={areaChartOptions}
                series={[
                  { name: 'Completed', data: mockAnalytics.taskActivity.map((item) => item.completed) },
                  { name: 'Pending', data: mockAnalytics.taskActivity.map((item) => item.pending) },
                ]}
                type="area"
                height={320}
                width="100%"
              />
            )}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Portfolio mix</p>
              <h2 className="mt-2 text-lg font-semibold text-slate-950">Workload health</h2>
            </div>
            <Gauge size={20} className="text-slate-500" />
          </div>
          <div className="mt-4">
            <Chart
              options={workloadOptions}
              series={mockAnalytics.projectBreakdown.map((segment) => segment.value)}
              type="radialBar"
              height={245}
            />
          </div>
          <div className="space-y-3">
            {mockAnalytics.projectBreakdown.map((segment) => (
              <div key={segment.label} className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{segment.label}</span>
                <span className="font-semibold text-slate-950">{segment.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {operatingLanes.map((lane) => {
          const Icon = lane.icon
          return (
            <Card key={lane.label} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{lane.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">{lane.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{lane.metric}</p>
                </div>
                <span className={cn('inline-flex h-10 w-10 items-center justify-center rounded-md text-white', lane.color)}>
                  <Icon size={18} />
                </span>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Subscription platform</p>
              <h2 className="mt-2 text-lg font-semibold text-slate-950">Revenue and plan mix</h2>
              <p className="mt-1 text-sm text-slate-500">Current recognized finance activity: {currency.format(financeTotal)}.</p>
            </div>
            <LineChart size={20} className="text-slate-500" />
          </div>
          <div className="mt-5 space-y-4">
            {subscriptionMix.map((plan) => (
              <div key={plan.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{plan.label}</span>
                  <span className="font-semibold text-slate-950">{currency.format(plan.revenue)}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(100, plan.revenue / 1800)}%` }} />
                </div>
                <p className="mt-1 text-xs text-slate-500">{plan.value} sample accounts</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Realtime monitoring</p>
              <h2 className="mt-2 text-lg font-semibold text-slate-950">API traffic and incident stream</h2>
            </div>
            <Activity size={20} className="text-slate-500" />
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Hourly requests</span>
                <span className="text-sm font-semibold text-slate-950">{compactNumber.format(mockAnalytics.totalRequests)}</span>
              </div>
              <div className="mt-4">
                <Chart
                  options={requestChartOptions}
                  series={[{ name: 'API requests', data: mockAnalytics.apiRequestsHourly }]}
                  type="area"
                  height={130}
                  width="100%"
                />
              </div>
            </div>
            <div className="space-y-3">
              {incidentFeed.map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
                  <span
                    className={cn(
                      'mt-1 h-2.5 w-2.5 rounded-full',
                      item.tone === 'danger' && 'bg-rose-500',
                      item.tone === 'warning' && 'bg-amber-500',
                      item.tone === 'info' && 'bg-sky-500',
                      item.tone === 'success' && 'bg-emerald-500',
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <DataTableHeader
          title="Company tenants"
          description="Multi-company SaaS accounts, subscription status, and workforce footprint."
          onSearch={() => {}}
          searchPlaceholder="Search company, industry, or plan..."
          actions={
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" icon={<Search size={15} />}>
                Segment
              </Button>
              <Button variant="primary" size="sm" icon={<ArrowUpRight size={15} />}>
                Add tenant
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
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-950">
              <MoreHorizontal size={16} />
            </button>
          )}
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <HeartPulse size={20} className="text-rose-600" />
          <h2 className="mt-4 text-base font-semibold text-slate-950">HR readiness</h2>
          <p className="mt-2 text-sm text-slate-500">Company administrators, attendance workflows, payroll surfaces, and permission reviews remain visible from the same workspace.</p>
        </Card>
        <Card className="p-5">
          <Globe2 size={20} className="text-blue-600" />
          <h2 className="mt-4 text-base font-semibold text-slate-950">Marketplace governance</h2>
          <p className="mt-2 text-sm text-slate-500">Freelancer verification, capacity signals, client assignments, and payout activity roll into operational oversight.</p>
        </Card>
        <Card className="p-5">
          <CheckCircle2 size={20} className="text-emerald-600" />
          <h2 className="mt-4 text-base font-semibold text-slate-950">Support discipline</h2>
          <p className="mt-2 text-sm text-slate-500">SLA queues, incidents, billing issues, and realtime infrastructure alerts are summarized for fast executive action.</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <Clock3 size={15} />
            {mockSupportTickets.length} active support records
          </div>
        </Card>
      </div>
    </div>
  )
}
