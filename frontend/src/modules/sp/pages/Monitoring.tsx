import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Zap, Cpu, Database } from 'lucide-react'
import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { PageHeader, StatCard, AnalyticsChartCard } from '../../../shared/components/PageComponents'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { Badge } from '../../../shared/components/Badge'
import { ROUTES } from '../../../shared/constants'

interface SystemMetric {
  timestamp: string
  cpu: number
  memory: number
  disk: number
  latency: number
  requests: number
  errors: number
}

const mockMetrics: SystemMetric[] = [
  { timestamp: '00:00', cpu: 45, memory: 52, disk: 38, latency: 125, requests: 1200, errors: 2 },
  { timestamp: '04:00', cpu: 32, memory: 40, disk: 38, latency: 98, requests: 800, errors: 1 },
  { timestamp: '08:00', cpu: 65, memory: 72, disk: 42, latency: 156, requests: 2100, errors: 5 },
  { timestamp: '12:00', cpu: 78, memory: 85, disk: 48, latency: 210, requests: 3200, errors: 8 },
  { timestamp: '16:00', cpu: 72, memory: 78, disk: 50, latency: 189, requests: 2800, errors: 6 },
  { timestamp: '20:00', cpu: 55, memory: 62, disk: 45, latency: 145, requests: 1900, errors: 3 },
]

const performanceChartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  colors: ['#6366f1', '#22c55e', '#f59e0b'],
  stroke: { curve: 'smooth', width: 2 },
  grid: { strokeDashArray: 4, borderColor: '#e2e8f0' },
  xaxis: { categories: mockMetrics.map((m) => m.timestamp) },
  yaxis: { title: { text: 'Usage (%)' } },
  tooltip: { theme: 'light' },
  responsive: [
    {
      breakpoint: 1280,
      options: { chart: { height: 320 } },
    },
  ],
}

const monitoringLinks = [
  { label: 'Realtime API Requests', path: `${ROUTES.SP_MONITORING}/api-requests`, icon: '📡', metric: '2,320 req/min' },
  { label: 'Server Load', path: `${ROUTES.SP_MONITORING}/server-load`, icon: '🖥️', metric: '58% avg CPU' },
  { label: 'Websocket Connections', path: `${ROUTES.SP_MONITORING}/websockets`, icon: '🔌', metric: '12,140 live' },
  { label: 'Active Sessions', path: `${ROUTES.SP_MONITORING}/active-sessions`, icon: '👥', metric: '4,254 active' },
  { label: 'Storage Analytics', path: `${ROUTES.SP_MONITORING}/storage`, icon: '💾', metric: '7.8 TB used' },
  { label: 'User Registrations', path: `${ROUTES.SP_MONITORING}/registrations`, icon: '📝', metric: '1,648 weekly' },
  { label: 'Dead Accounts', path: `${ROUTES.SP_MONITORING}/dead-accounts`, icon: '📦', metric: '2,197 flagged' },
  { label: 'Failed Requests', path: `${ROUTES.SP_MONITORING}/failed-requests`, icon: '⚠️', metric: '0.42% failure' },
  { label: 'Queue Jobs', path: `${ROUTES.SP_MONITORING}/queue-jobs`, icon: '🧵', metric: '488 queued' },
]

const MonitoringPage: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')

  const latestMetric = mockMetrics[mockMetrics.length - 1]
  const avgCPU = (mockMetrics.reduce((sum, m) => sum + m.cpu, 0) / mockMetrics.length).toFixed(1)
  const totalRequests = mockMetrics.reduce((sum, m) => sum + m.requests, 0)
  const totalErrors = mockMetrics.reduce((sum, m) => sum + m.errors, 0)

  return (
    <div className="space-y-5">
      <PageHeader
        title="System Monitoring"
        description="Real-time system health, performance metrics, and infrastructure monitoring."
        action={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">Alerts</Button>
            <Button variant="primary" size="sm">Configure</Button>
          </div>
        }
      />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="CPU Usage"
          value={`${latestMetric.cpu}%`}
          description={`Average: ${avgCPU}%`}
          change={{ value: latestMetric.cpu > 70 ? 5 : -3, type: latestMetric.cpu > 70 ? 'increase' : 'decrease' }}
          icon={<Cpu className="w-6 h-6" />}
          variant={latestMetric.cpu > 80 ? 'danger' : latestMetric.cpu > 60 ? 'warning' : 'success'}
        />
        <StatCard
          label="Memory Usage"
          value={`${latestMetric.memory}%`}
          description="System memory"
          change={{ value: 2.1, type: 'increase' }}
          icon={<Database className="w-6 h-6" />}
          variant={latestMetric.memory > 80 ? 'danger' : latestMetric.memory > 60 ? 'warning' : 'success'}
        />
        <StatCard
          label="API Latency"
          value={`${latestMetric.latency}ms`}
          description="Average response time"
          change={{ value: 8.2, type: 'decrease' }}
          icon={<Zap className="w-6 h-6" />}
          variant={latestMetric.latency > 200 ? 'warning' : 'success'}
        />
        <StatCard
          label="Error Rate"
          value={((totalErrors / totalRequests) * 100).toFixed(2) + '%'}
          description={`${totalErrors} errors`}
          change={{ value: 0.5, type: 'decrease' }}
          icon={<AlertTriangle className="w-6 h-6" />}
          variant={'info'}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <AnalyticsChartCard
          title="Performance Metrics"
          description="CPU, Memory, and Disk usage over time"
          footer={
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="text-sm rounded-lg border border-slate-200 px-2 py-1 bg-white"
            >
              <option value="1h">Last 1h</option>
              <option value="6h">Last 6h</option>
              <option value="24h">Last 24h</option>
              <option value="7d">Last 7d</option>
            </select>
          }
          chart={
            <Chart
              options={performanceChartOptions}
              series={[
                { name: 'CPU', data: mockMetrics.map((m) => m.cpu) },
                { name: 'Memory', data: mockMetrics.map((m) => m.memory) },
                { name: 'Disk', data: mockMetrics.map((m) => m.disk) },
              ]}
              type="line"
              height={300}
            />
          }
        />

        <Card className="p-4 rounded-lg border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Active Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-red-900">High CPU Usage</p>
                <p className="text-sm text-red-700">CPU has exceeded 75% threshold for 10 minutes</p>
                <p className="text-xs text-red-600 mt-1">Triggered 5 min ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-amber-900">Memory Pressure</p>
                <p className="text-sm text-amber-700">Memory usage is at 85%, consider scaling</p>
                <p className="text-xs text-amber-600 mt-1">Triggered 2 min ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4 rounded-lg border border-slate-200">
        <div className="mb-5">
          <h3 className="text-lg font-bold text-slate-900">Advanced Monitoring Pages</h3>
          <p className="mt-1 text-sm text-slate-600">Jump into dedicated operational dashboards for every live signal.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {monitoringLinks.map((item) => (
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

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="p-4 rounded-lg border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Request Distribution</h3>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-700">API Requests</span>
                <span className="font-medium text-slate-900">65%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '65%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-700">Websocket</span>
                <span className="font-medium text-slate-900">25%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '25%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-700">GraphQL</span>
                <span className="font-medium text-slate-900">10%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 rounded-lg border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Database Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-700">Connection Pool</span>
              <Badge variant="success">Healthy</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-700">Query Performance</span>
              <Badge variant="success">Good</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-700">Replication Lag</span>
              <Badge variant="success">0ms</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-700">Backup Status</span>
              <Badge variant="success">Completed</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-4 rounded-lg border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Cache Performance</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-700">Hit Rate</span>
                <span className="font-medium text-slate-900">92%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '92%' }} />
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-700 mb-2">Memory Used</div>
              <p className="text-lg font-bold text-slate-900">2.4 GB / 4 GB</p>
            </div>
            <div>
              <div className="text-sm text-slate-700 mb-2">Evictions</div>
              <p className="text-lg font-bold text-slate-900">124</p>
              <p className="text-xs text-slate-500">in last 24h</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default MonitoringPage
