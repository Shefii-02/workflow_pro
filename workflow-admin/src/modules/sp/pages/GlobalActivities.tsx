import React, { useState, useMemo } from 'react'
import { Search, Download } from 'lucide-react'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { PageHeader } from '../../../shared/components/PageComponents'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Form'
import { Badge } from '../../../shared/components/Badge'
import { Card } from '../../../shared/components/Card'

interface Activity {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  resourceType: 'company' | 'user' | 'subscription' | 'ticket' | 'announcement' | 'system'
  changes?: string
  ipAddress: string
  status: 'success' | 'failed'
}

const mockActivities: Activity[] = [
  {
    id: 'ACT-001',
    timestamp: '2024-05-10T14:30:00',
    user: 'Alice Johnson',
    action: 'Updated',
    resource: 'Acme Corp',
    resourceType: 'company',
    changes: 'Status changed from active to inactive',
    ipAddress: '192.168.1.1',
    status: 'success',
  },
  {
    id: 'ACT-002',
    timestamp: '2024-05-10T14:15:00',
    user: 'Bob Smith',
    action: 'Created',
    resource: 'Support Ticket TKT-005',
    resourceType: 'ticket',
    changes: 'New ticket created',
    ipAddress: '192.168.1.5',
    status: 'success',
  },
  {
    id: 'ACT-003',
    timestamp: '2024-05-10T14:00:00',
    user: 'Carol White',
    action: 'Deleted',
    resource: 'User: John Doe',
    resourceType: 'user',
    changes: 'User account permanently deleted',
    ipAddress: '192.168.1.3',
    status: 'success',
  },
  {
    id: 'ACT-004',
    timestamp: '2024-05-10T13:45:00',
    user: 'System',
    action: 'Triggered',
    resource: 'Database Backup',
    resourceType: 'system',
    changes: 'Automatic backup completed',
    ipAddress: 'internal',
    status: 'success',
  },
  {
    id: 'ACT-005',
    timestamp: '2024-05-10T13:30:00',
    user: 'David Brown',
    action: 'Failed',
    resource: 'Payment Processing',
    resourceType: 'subscription',
    changes: 'Payment failed for subscription renewal',
    ipAddress: '192.168.1.7',
    status: 'failed',
  },
  {
    id: 'ACT-006',
    timestamp: '2024-05-10T13:15:00',
    user: 'Alice Johnson',
    action: 'Published',
    resource: 'Platform Maintenance Announcement',
    resourceType: 'announcement',
    changes: 'Announcement published to all users',
    ipAddress: '192.168.1.1',
    status: 'success',
  },
  {
    id: 'ACT-007',
    timestamp: '2024-05-10T13:00:00',
    user: 'Bob Smith',
    action: 'Updated',
    resource: 'System Configuration',
    resourceType: 'system',
    changes: 'API rate limits adjusted',
    ipAddress: '192.168.1.5',
    status: 'success',
  },
  {
    id: 'ACT-008',
    timestamp: '2024-05-10T12:45:00',
    user: 'Carol White',
    action: 'Exported',
    resource: 'Financial Report',
    resourceType: 'company',
    changes: 'Q2 financial data exported',
    ipAddress: '192.168.1.3',
    status: 'success',
  },
]

const GlobalActivitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [actionFilter, setActionFilter] = useState<string>('all')
  const [resourceFilter, setResourceFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredActivities = useMemo(() => {
    return mockActivities.filter((activity) => {
      const matchesSearch = activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.action.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesAction = actionFilter === 'all' || activity.action === actionFilter
      const matchesResource = resourceFilter === 'all' || activity.resourceType === resourceFilter
      const matchesStatus = statusFilter === 'all' || activity.status === statusFilter
      return matchesSearch && matchesAction && matchesResource && matchesStatus
    })
  }, [searchTerm, actionFilter, resourceFilter, statusFilter])

  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredActivities.slice(startIndex, startIndex + pageSize)
  }, [filteredActivities, currentPage, pageSize])

  const successCount = mockActivities.filter(a => a.status === 'success').length
  const failedCount = mockActivities.filter(a => a.status === 'failed').length

  const columns: Column<Activity>[] = [
    {
      id: 'timestamp',
      header: 'Time',
      accessorKey: 'timestamp',
      sortable: true,
      cell: (value) => {
        const date = new Date(value)
        return (
          <div>
            <div className="font-medium text-gray-900">{date.toLocaleTimeString()}</div>
            <div className="text-sm text-gray-500">{date.toLocaleDateString()}</div>
          </div>
        )
      },
    },
    {
      id: 'user',
      header: 'User',
      accessorKey: 'user',
      sortable: true,
    },
    {
      id: 'action',
      header: 'Action',
      accessorKey: 'action',
      cell: (value) => (
        <Badge variant={
          value === 'Created' ? 'success' :
          value === 'Updated' ? 'primary' :
          value === 'Deleted' ? 'danger' :
          value === 'Published' ? 'success' : 'secondary'
        }>
          {value}
        </Badge>
      ),
    },
    {
      id: 'resource',
      header: 'Resource',
      accessorKey: 'resource',
      cell: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.resourceType}</div>
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (value) => (
        <Badge variant={value === 'success' ? 'success' : 'danger'}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'ipAddress',
      header: 'IP Address',
      accessorKey: 'ipAddress',
      cell: (value) => <span className="font-mono text-sm text-slate-600">{value}</span>,
    },
  ]

  return (
    <div className="space-y-5">
      <PageHeader
        title="Global Activity Log"
        description="Complete audit trail of all system activities and user actions."
        action={<Button variant="secondary" icon={<Download className="w-4 h-4" />}>Export Audit</Button>}
      />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Total Activities</p>
          <p className="text-2xl font-semibold text-slate-950">{mockActivities.length}</p>
          <p className="text-xs text-slate-500 mt-1">Last 24 hours</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Successful</p>
          <p className="text-2xl font-semibold text-slate-950">{successCount}</p>
          <p className="text-xs text-slate-500 mt-1">{((successCount / mockActivities.length) * 100).toFixed(1)}% success rate</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Failed</p>
          <p className="text-2xl font-semibold text-slate-950">{failedCount}</p>
          <p className="text-xs text-slate-500 mt-1">Requires attention</p>
        </Card>
      </div>

      <Card className="p-4 rounded-lg border border-slate-200">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Search by user, resource, or action..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Actions</option>
              <option value="Created">Created</option>
              <option value="Updated">Updated</option>
              <option value="Deleted">Deleted</option>
              <option value="Published">Published</option>
              <option value="Exported">Exported</option>
            </select>
            <select
              value={resourceFilter}
              onChange={(e) => setResourceFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Resources</option>
              <option value="company">Company</option>
              <option value="user">User</option>
              <option value="subscription">Subscription</option>
              <option value="ticket">Ticket</option>
              <option value="announcement">Announcement</option>
              <option value="system">System</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <DataTable
          data={paginatedActivities}
          columns={columns}
          pagination={{
            page: currentPage,
            pageSize,
            total: filteredActivities.length,
            onPageChange: setCurrentPage,
            onPageSizeChange: setPageSize,
          }}
        />
      </Card>
    </div>
  )
}

export default GlobalActivitiesPage
