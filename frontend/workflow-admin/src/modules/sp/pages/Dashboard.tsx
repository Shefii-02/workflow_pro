import { useState } from 'react'
import { PageHeader, StatCard, DataTableHeader } from '../../../shared/components/PageComponents'
import { Card } from '../../../shared/components/Card'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { Button } from '../../../shared/components/Button'
import { mockAnalytics, mockCompanies } from '../../../shared/utils/mock-data'
import type { Company } from '../../../shared/types'

export default function SPDashboard() {
  const [companies] = useState<Company[]>(mockCompanies)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])

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
            value === 'active' ? 'bg-green-100 text-green-900' : 'bg-gray-100 text-gray-900'
          }`}
        >
          {value}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Platform Dashboard"
        description="Real-time monitoring and analytics"
        action={<Button variant="primary">Export Report</Button>}
      />

      {selectedCompanies.length > 0 && (
        <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 text-sm text-blue-700">
          {selectedCompanies.length} companies selected
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total API Requests"
          value={mockAnalytics.totalRequests.toLocaleString()}
          change={{ value: 12.5, type: 'increase' }}
          unit="this month"
          icon="📊"
        />
        <StatCard
          label="Active Users"
          value={mockAnalytics.activeUsers.toLocaleString()}
          change={{ value: 8.2, type: 'increase' }}
          icon="👥"
        />
        <StatCard
          label="New Registrations"
          value={mockAnalytics.registrations}
          change={{ value: 3.1, type: 'increase' }}
          icon="📝"
        />
        <StatCard
          label="Failed Requests"
          value={mockAnalytics.failedRequests}
          change={{ value: 2.5, type: 'decrease' }}
          icon="⚠️"
        />
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Storage Usage</p>
            <span className="text-2xl">💾</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{mockAnalytics.storageUsage} GB</p>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-brand-600 rounded-full"></div>
          </div>
          <p className="mt-1 text-xs text-gray-600">85% available</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">WebSocket Connections</p>
            <span className="text-2xl">🔌</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{mockAnalytics.websocketConnections}</p>
          <p className="mt-2 text-xs text-green-600">● All connected</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Active Sessions</p>
            <span className="text-2xl">🔑</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{mockAnalytics.activeSessions}</p>
          <p className="mt-2 text-xs text-gray-600">Real-time</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Memory Usage</p>
            <span className="text-2xl">🧠</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{mockAnalytics.memoryUsage} GB</p>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-yellow-500 rounded-full"></div>
          </div>
        </Card>
      </div>

      {/* Queue Jobs */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Background Jobs</h3>
            <p className="text-sm text-gray-600 mt-1">{mockAnalytics.queueJobs} jobs in queue</p>
          </div>
          <div className="text-4xl font-bold text-brand-600">{mockAnalytics.queueJobs}</div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span>Email Notifications</span>
            <span className="ml-auto font-medium">24</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span>Report Generation</span>
            <span className="ml-auto font-medium">32</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span>Data Sync</span>
            <span className="ml-auto font-medium">23</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span>Failed Processes</span>
            <span className="ml-auto font-medium">8</span>
          </div>
        </div>
      </Card>

      {/* Companies Management */}
      <Card>
        <DataTableHeader
          title="Company Management"
          description="Manage all companies on the platform"
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
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
            </div>
          )}
        />
      </Card>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { time: '2 hours ago', action: 'New company registered', details: 'Acme Corp' },
            { time: '5 hours ago', action: 'Subscription upgraded', details: 'TechStart Inc to Professional' },
            { time: '1 day ago', action: 'Support ticket created', details: 'Issue #12345' },
            { time: '2 days ago', action: 'Bulk export requested', details: 'User analytics' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:pb-0 last:border-0">
              <div className="text-2xl">📌</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
              </div>
              <p className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
