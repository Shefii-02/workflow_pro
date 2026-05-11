import { Link, useParams } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import {
  Activity,
  AlertTriangle,
  Archive,
  Clock,
  Database,
  HardDrive,
  Radio,
  Server,
  UserPlus,
  Users,
} from 'lucide-react'
import { PageHeader, StatCard, AnalyticsChartCard } from '../../../shared/components/PageComponents'
import { Badge } from '../../../shared/components/Badge'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { ROUTES } from '../../../shared/constants'

type MonitoringSlug =
  | 'api-requests'
  | 'server-load'
  | 'websockets'
  | 'active-sessions'
  | 'storage'
  | 'registrations'
  | 'dead-accounts'
  | 'failed-requests'
  | 'queue-jobs'

type StatVariant = 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'

interface MonitoringPageConfig {
  title: string
  description: string
  icon: ReactNode
  accent: string
  chartType: 'area' | 'line' | 'bar' | 'donut'
  series: ApexOptions['series']
  categories?: string[]
  labels?: string[]
  stats: {
    label: string
    value: string
    description: string
    variant: StatVariant
    icon: ReactNode
  }[]
  rows: {
    name: string
    detail: string
    metric: string
    status: string
    variant: BadgeVariant
  }[]
  signals: {
    label: string
    value: string
    progress: number
    tone: string
  }[]
}

const monitoringPages: Record<MonitoringSlug, MonitoringPageConfig> = {
  'api-requests': {
    title: 'Realtime API Requests',
    description: 'Live request volume, endpoint latency, regional traffic, and throttling pressure.',
    icon: <Activity className="h-6 w-6" />,
    accent: '#2563eb',
    chartType: 'area',
    categories: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30'],
    series: [
      { name: 'Requests', data: [1180, 1420, 1660, 1510, 1890, 2140, 2320] },
      { name: 'Cached', data: [420, 510, 580, 540, 690, 760, 810] },
    ],
    stats: [
      { label: 'Requests/min', value: '2,320', description: 'Live ingress rate', variant: 'brand', icon: <Activity className="h-6 w-6" /> },
      { label: 'P95 latency', value: '182ms', description: 'Across all regions', variant: 'success', icon: <Clock className="h-6 w-6" /> },
      { label: 'Rate limited', value: '41', description: 'Last 15 minutes', variant: 'warning', icon: <AlertTriangle className="h-6 w-6" /> },
      { label: 'Healthy routes', value: '98.7%', description: '2 routes degraded', variant: 'info', icon: <Radio className="h-6 w-6" /> },
    ],
    rows: [
      { name: 'GET /api/v1/projects', detail: 'us-east primary cluster', metric: '48ms avg', status: 'Healthy', variant: 'success' },
      { name: 'POST /api/v1/files', detail: 'eu-west upload edge', metric: '221ms avg', status: 'Watch', variant: 'warning' },
      { name: 'GET /api/v1/search', detail: 'global search service', metric: '134ms avg', status: 'Healthy', variant: 'success' },
    ],
    signals: [
      { label: 'Cache hit ratio', value: '82%', progress: 82, tone: 'bg-emerald-500' },
      { label: 'Gateway capacity', value: '68%', progress: 68, tone: 'bg-blue-500' },
      { label: 'Throttle budget', value: '24%', progress: 24, tone: 'bg-amber-500' },
    ],
  },
  'server-load': {
    title: 'Server Load',
    description: 'CPU, memory, node saturation, and cluster balancing across application servers.',
    icon: <Server className="h-6 w-6" />,
    accent: '#16a34a',
    chartType: 'line',
    categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    series: [
      { name: 'CPU', data: [42, 38, 61, 77, 71, 58] },
      { name: 'Memory', data: [56, 54, 68, 82, 79, 64] },
      { name: 'Load avg', data: [34, 29, 52, 69, 66, 48] },
    ],
    stats: [
      { label: 'Avg CPU', value: '58%', description: 'Across 24 nodes', variant: 'success', icon: <Server className="h-6 w-6" /> },
      { label: 'Memory', value: '64%', description: '15.4 GB free', variant: 'info', icon: <Database className="h-6 w-6" /> },
      { label: 'Hot nodes', value: '2', description: 'Above threshold', variant: 'warning', icon: <AlertTriangle className="h-6 w-6" /> },
      { label: 'Uptime', value: '99.98%', description: '30 day platform SLA', variant: 'brand', icon: <Radio className="h-6 w-6" /> },
    ],
    rows: [
      { name: 'app-node-07', detail: 'Mumbai application pool', metric: '84% CPU', status: 'High', variant: 'warning' },
      { name: 'app-node-12', detail: 'Singapore application pool', metric: '52% CPU', status: 'Normal', variant: 'success' },
      { name: 'worker-node-04', detail: 'Background processing', metric: '71% CPU', status: 'Normal', variant: 'success' },
    ],
    signals: [
      { label: 'Autoscale headroom', value: '43%', progress: 43, tone: 'bg-sky-500' },
      { label: 'Memory pressure', value: '64%', progress: 64, tone: 'bg-amber-500' },
      { label: 'Cluster balance', value: '91%', progress: 91, tone: 'bg-emerald-500' },
    ],
  },
  websockets: {
    title: 'Websocket Connections',
    description: 'Realtime channel health, room fanout, disconnect rate, and event throughput.',
    icon: <Radio className="h-6 w-6" />,
    accent: '#7c3aed',
    chartType: 'area',
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [{ name: 'Connections', data: [8200, 9100, 8700, 9800, 11200, 10400, 12140] }],
    stats: [
      { label: 'Live sockets', value: '12,140', description: 'Across 9 gateways', variant: 'brand', icon: <Radio className="h-6 w-6" /> },
      { label: 'Events/sec', value: '8,420', description: 'Broadcast and direct', variant: 'info', icon: <Activity className="h-6 w-6" /> },
      { label: 'Disconnects', value: '0.8%', description: 'Below alert threshold', variant: 'success', icon: <Users className="h-6 w-6" /> },
      { label: 'Backpressure', value: 'Low', description: 'No saturated rooms', variant: 'success', icon: <Server className="h-6 w-6" /> },
    ],
    rows: [
      { name: 'presence:workspace', detail: 'Presence and typing events', metric: '4,120 clients', status: 'Healthy', variant: 'success' },
      { name: 'task:updates', detail: 'Task activity broadcast', metric: '2,840 clients', status: 'Healthy', variant: 'success' },
      { name: 'chat:rooms', detail: 'Conversation fanout', metric: '1,930 clients', status: 'Watch', variant: 'warning' },
    ],
    signals: [
      { label: 'Gateway capacity', value: '73%', progress: 73, tone: 'bg-violet-500' },
      { label: 'Fanout latency', value: '38%', progress: 38, tone: 'bg-emerald-500' },
      { label: 'Reconnect queue', value: '12%', progress: 12, tone: 'bg-sky-500' },
    ],
  },
  'active-sessions': {
    title: 'Active Sessions',
    description: 'Signed-in users, session age, risky locations, and concurrent account usage.',
    icon: <Users className="h-6 w-6" />,
    accent: '#0891b2',
    chartType: 'bar',
    categories: ['SP', 'Company', 'Freelancer', 'Client'],
    series: [{ name: 'Sessions', data: [84, 1840, 920, 1410] }],
    stats: [
      { label: 'Active sessions', value: '4,254', description: 'Across all account types', variant: 'brand', icon: <Users className="h-6 w-6" /> },
      { label: 'Admin sessions', value: '84', description: 'SP and company admins', variant: 'info', icon: <Server className="h-6 w-6" /> },
      { label: 'Risk flags', value: '7', description: 'Geo and device changes', variant: 'warning', icon: <AlertTriangle className="h-6 w-6" /> },
      { label: 'MFA coverage', value: '96%', description: 'Admin accounts protected', variant: 'success', icon: <Radio className="h-6 w-6" /> },
    ],
    rows: [
      { name: 'Alex Johnson', detail: 'SP admin, Mumbai', metric: '2 devices', status: 'Verified', variant: 'success' },
      { name: 'Sarah Smith', detail: 'Company admin, Dubai', metric: '1 device', status: 'Verified', variant: 'success' },
      { name: 'Unknown device', detail: 'Client account, new ASN', metric: '1 session', status: 'Review', variant: 'warning' },
    ],
    signals: [
      { label: 'Session capacity', value: '57%', progress: 57, tone: 'bg-cyan-500' },
      { label: 'Idle sessions', value: '18%', progress: 18, tone: 'bg-slate-500' },
      { label: 'MFA adoption', value: '96%', progress: 96, tone: 'bg-emerald-500' },
    ],
  },
  storage: {
    title: 'Storage Analytics',
    description: 'Object storage, database footprint, attachment growth, and retention pressure.',
    icon: <HardDrive className="h-6 w-6" />,
    accent: '#0d9488',
    chartType: 'donut',
    labels: ['Database', 'Files', 'Backups', 'Logs'],
    series: [38, 44, 12, 6],
    stats: [
      { label: 'Used storage', value: '7.8 TB', description: '14.2 TB provisioned', variant: 'brand', icon: <HardDrive className="h-6 w-6" /> },
      { label: 'Growth/day', value: '142 GB', description: '30 day moving average', variant: 'warning', icon: <Activity className="h-6 w-6" /> },
      { label: 'Retention risk', value: 'Low', description: 'Cleanup policy active', variant: 'success', icon: <Archive className="h-6 w-6" /> },
      { label: 'Backup age', value: '42m', description: 'Last verified snapshot', variant: 'info', icon: <Database className="h-6 w-6" /> },
    ],
    rows: [
      { name: 'Project attachments', detail: 'S3 primary bucket', metric: '3.4 TB', status: 'Growing', variant: 'warning' },
      { name: 'Postgres cluster', detail: 'Primary and read replicas', metric: '2.9 TB', status: 'Healthy', variant: 'success' },
      { name: 'Audit logs', detail: 'Compressed cold tier', metric: '486 GB', status: 'Healthy', variant: 'success' },
    ],
    signals: [
      { label: 'Storage consumed', value: '55%', progress: 55, tone: 'bg-teal-500' },
      { label: 'Backup coverage', value: '99%', progress: 99, tone: 'bg-emerald-500' },
      { label: 'Cold tier savings', value: '31%', progress: 31, tone: 'bg-blue-500' },
    ],
  },
  registrations: {
    title: 'User Registrations',
    description: 'Signup velocity, conversion funnel, verification delays, and account mix.',
    icon: <UserPlus className="h-6 w-6" />,
    accent: '#ea580c',
    chartType: 'bar',
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      { name: 'Started', data: [210, 240, 228, 260, 288, 198, 224] },
      { name: 'Verified', data: [168, 192, 182, 213, 246, 154, 181] },
    ],
    stats: [
      { label: 'New users', value: '1,648', description: 'Last 7 days', variant: 'brand', icon: <UserPlus className="h-6 w-6" /> },
      { label: 'Verify rate', value: '81%', description: 'Email and phone checks', variant: 'success', icon: <Radio className="h-6 w-6" /> },
      { label: 'Drop-offs', value: '312', description: 'Incomplete onboarding', variant: 'warning', icon: <AlertTriangle className="h-6 w-6" /> },
      { label: 'SP invites', value: '28', description: 'Admin-created accounts', variant: 'info', icon: <Users className="h-6 w-6" /> },
    ],
    rows: [
      { name: 'Company signup', detail: 'Workspace creation funnel', metric: '692 users', status: 'Strong', variant: 'success' },
      { name: 'Freelancer signup', detail: 'Profile completion funnel', metric: '531 users', status: 'Stable', variant: 'success' },
      { name: 'Client signup', detail: 'Invitation landing flow', metric: '425 users', status: 'Watch', variant: 'warning' },
    ],
    signals: [
      { label: 'Verification throughput', value: '81%', progress: 81, tone: 'bg-orange-500' },
      { label: 'Profile completion', value: '74%', progress: 74, tone: 'bg-emerald-500' },
      { label: 'Invite acceptance', value: '63%', progress: 63, tone: 'bg-blue-500' },
    ],
  },
  'dead-accounts': {
    title: 'Dead Accounts',
    description: 'Dormant, unverified, abandoned, and low-confidence accounts needing cleanup.',
    icon: <Archive className="h-6 w-6" />,
    accent: '#64748b',
    chartType: 'bar',
    categories: ['Unverified', 'Dormant', 'Bounced', 'Abandoned'],
    series: [{ name: 'Accounts', data: [428, 1204, 176, 389] }],
    stats: [
      { label: 'Dead accounts', value: '2,197', description: 'Matching cleanup policy', variant: 'warning', icon: <Archive className="h-6 w-6" /> },
      { label: 'Dormant 90d', value: '1,204', description: 'No recent session', variant: 'neutral', icon: <Clock className="h-6 w-6" /> },
      { label: 'Bounced email', value: '176', description: 'Needs suppression', variant: 'danger', icon: <AlertTriangle className="h-6 w-6" /> },
      { label: 'Recoverable', value: '61%', description: 'Eligible for winback', variant: 'info', icon: <Users className="h-6 w-6" /> },
    ],
    rows: [
      { name: 'Dormant company users', detail: 'No session in 90 days', metric: '604 accounts', status: 'Queue', variant: 'warning' },
      { name: 'Unverified freelancers', detail: 'Signup never completed', metric: '428 accounts', status: 'Review', variant: 'warning' },
      { name: 'Invalid contacts', detail: 'Repeated delivery failure', metric: '176 accounts', status: 'Block', variant: 'danger' },
    ],
    signals: [
      { label: 'Cleanup readiness', value: '72%', progress: 72, tone: 'bg-slate-500' },
      { label: 'Winback pool', value: '61%', progress: 61, tone: 'bg-blue-500' },
      { label: 'Data risk', value: '19%', progress: 19, tone: 'bg-rose-500' },
    ],
  },
  'failed-requests': {
    title: 'Failed Requests',
    description: 'Error rates, exception clusters, failed integrations, and retry behavior.',
    icon: <AlertTriangle className="h-6 w-6" />,
    accent: '#dc2626',
    chartType: 'area',
    categories: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30'],
    series: [
      { name: '5xx', data: [8, 11, 14, 22, 19, 12, 9] },
      { name: '4xx', data: [44, 38, 52, 61, 49, 46, 42] },
    ],
    stats: [
      { label: 'Failure rate', value: '0.42%', description: 'Within alert budget', variant: 'warning', icon: <AlertTriangle className="h-6 w-6" /> },
      { label: '5xx errors', value: '95', description: 'Last 30 minutes', variant: 'danger', icon: <Server className="h-6 w-6" /> },
      { label: 'Retry success', value: '88%', description: 'Recovered automatically', variant: 'success', icon: <Radio className="h-6 w-6" /> },
      { label: 'Open incidents', value: '1', description: 'Payment provider timeout', variant: 'warning', icon: <Activity className="h-6 w-6" /> },
    ],
    rows: [
      { name: 'Payment provider timeout', detail: 'POST /billing/charge', metric: '31 failures', status: 'Incident', variant: 'danger' },
      { name: 'File validation error', detail: 'POST /files/upload', metric: '48 failures', status: 'Known', variant: 'warning' },
      { name: 'Search index timeout', detail: 'GET /search', metric: '16 failures', status: 'Recovered', variant: 'success' },
    ],
    signals: [
      { label: 'Error budget used', value: '18%', progress: 18, tone: 'bg-rose-500' },
      { label: 'Retry recovery', value: '88%', progress: 88, tone: 'bg-emerald-500' },
      { label: 'Provider health', value: '79%', progress: 79, tone: 'bg-amber-500' },
    ],
  },
  'queue-jobs': {
    title: 'Queue Jobs',
    description: 'Background jobs, delayed tasks, worker throughput, dead letters, and retry queues.',
    icon: <Archive className="h-6 w-6" />,
    accent: '#9333ea',
    chartType: 'bar',
    categories: ['Email', 'Billing', 'Exports', 'Notifications', 'Cleanup'],
    series: [
      { name: 'Queued', data: [120, 48, 34, 210, 76] },
      { name: 'Processing', data: [42, 18, 11, 66, 23] },
    ],
    stats: [
      { label: 'Queued jobs', value: '488', description: 'Across 12 queues', variant: 'brand', icon: <Archive className="h-6 w-6" /> },
      { label: 'Workers', value: '36', description: '34 healthy, 2 draining', variant: 'success', icon: <Server className="h-6 w-6" /> },
      { label: 'Dead letters', value: '9', description: 'Needs operator review', variant: 'danger', icon: <AlertTriangle className="h-6 w-6" /> },
      { label: 'Avg wait', value: '14s', description: 'Below 60s target', variant: 'info', icon: <Clock className="h-6 w-6" /> },
    ],
    rows: [
      { name: 'notification.dispatch', detail: 'Push and email delivery', metric: '210 queued', status: 'Normal', variant: 'success' },
      { name: 'billing.reconcile', detail: 'Payment reconciliation', metric: '48 queued', status: 'Watch', variant: 'warning' },
      { name: 'exports.generate', detail: 'Report generation', metric: '9 dead letters', status: 'Review', variant: 'danger' },
    ],
    signals: [
      { label: 'Worker utilization', value: '69%', progress: 69, tone: 'bg-violet-500' },
      { label: 'Retry pressure', value: '22%', progress: 22, tone: 'bg-amber-500' },
      { label: 'SLA compliance', value: '94%', progress: 94, tone: 'bg-emerald-500' },
    ],
  },
}

function getChartOptions(config: MonitoringPageConfig): ApexOptions {
  return {
    chart: { toolbar: { show: false }, zoom: { enabled: false } },
    colors: [config.accent, '#22c55e', '#f59e0b'],
    dataLabels: { enabled: false },
    labels: config.labels,
    stroke: { curve: 'smooth', width: 2 },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4 },
    xaxis: config.categories ? { categories: config.categories } : undefined,
    legend: { position: 'bottom' },
    tooltip: { theme: 'light' },
  }
}

export default function AdvancedMonitoringPage() {
  const { view } = useParams()
  const slug = (view || 'api-requests') as MonitoringSlug
  const config = monitoringPages[slug] ?? monitoringPages['api-requests']
  const chartOptions = getChartOptions(config)

  return (
    <div className="space-y-5">
      <PageHeader
        title={config.title}
        description={config.description}
        action={
          <Link to={ROUTES.SP_MONITORING}>
            <Button variant="secondary">Monitoring Overview</Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {config.stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <AnalyticsChartCard
          title={`${config.title} Trend`}
          description="Operational movement over the selected monitoring window."
          chart={
            <Chart
              options={chartOptions}
              series={config.series}
              type={config.chartType}
              height={340}
            />
          }
        />

        <Card className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              {config.icon}
            </span>
            <div>
              <h3 className="font-semibold text-slate-950">Live Signals</h3>
              <p className="text-sm text-slate-500">Current thresholds and capacity indicators.</p>
            </div>
          </div>
          <div className="space-y-5">
            {config.signals.map((signal) => (
              <div key={signal.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{signal.label}</span>
                  <span className="text-slate-500">{signal.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${signal.tone}`} style={{ width: `${signal.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">Operational Breakdown</h3>
            <p className="text-sm text-slate-500">Focused records for the selected monitoring surface.</p>
          </div>
          <Badge variant="outline">Live sample</Badge>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Detail</th>
                <th className="px-4 py-3 font-semibold">Metric</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {config.rows.map((row) => (
                <tr key={row.name} className="bg-white">
                  <td className="px-4 py-4 font-medium text-slate-950">{row.name}</td>
                  <td className="px-4 py-4 text-slate-600">{row.detail}</td>
                  <td className="px-4 py-4 font-semibold text-slate-800">{row.metric}</td>
                  <td className="px-4 py-4">
                    <Badge variant={row.variant}>{row.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
