import React, { useState, useMemo } from 'react'
import { Plus, Search } from 'lucide-react'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { PageHeader } from '../../../shared/components/PageComponents'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Form'
import { Badge } from '../../../shared/components/Badge'
import { Card } from '../../../shared/components/Card'

interface StaffMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'moderator' | 'analyst'
  permissions: string[]
  status: 'active' | 'inactive' | 'suspended'
  joinDate: string
  lastActive: string
}

const mockStaff: StaffMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@workflow.com',
    role: 'admin',
    permissions: ['manage_users', 'manage_permissions', 'view_analytics', 'manage_support'],
    status: 'active',
    joinDate: '2024-01-10',
    lastActive: '2024-05-10T14:30:00',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@workflow.com',
    role: 'manager',
    permissions: ['manage_support', 'view_analytics', 'manage_reports'],
    status: 'active',
    joinDate: '2024-02-15',
    lastActive: '2024-05-09T10:15:00',
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol@workflow.com',
    role: 'moderator',
    permissions: ['view_analytics', 'manage_support'],
    status: 'active',
    joinDate: '2024-03-01',
    lastActive: '2024-05-10T09:45:00',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@workflow.com',
    role: 'analyst',
    permissions: ['view_analytics'],
    status: 'inactive',
    joinDate: '2024-04-20',
    lastActive: '2024-04-28T16:20:00',
  },
]

const AdminStaffPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredStaff = useMemo(() => {
    return mockStaff.filter((staff) => {
      const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = roleFilter === 'all' || staff.role === roleFilter
      const matchesStatus = statusFilter === 'all' || staff.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [searchTerm, roleFilter, statusFilter])

  const paginatedStaff = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredStaff.slice(startIndex, startIndex + pageSize)
  }, [filteredStaff, currentPage, pageSize])

  const columns: Column<StaffMember>[] = [
    {
      id: 'name',
      header: 'Staff Member',
      accessorKey: 'name',
      sortable: true,
      cell: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      ),
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      sortable: true,
      cell: (value) => (
        <Badge variant={
          value === 'admin' ? 'danger' :
          value === 'manager' ? 'success' :
          value === 'moderator' ? 'warning' : 'secondary'
        }>
          {value.charAt(0).toUpperCase() + value.slice(1)}
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
          value === 'inactive' ? 'warning' : 'danger'
        }>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'joinDate',
      header: 'Joined',
      accessorKey: 'joinDate',
      cell: (value) => new Date(value).toLocaleDateString(),
    },
    {
      id: 'lastActive',
      header: 'Last Active',
      accessorKey: 'lastActive',
      cell: (value) => {
        const date = new Date(value)
        const now = new Date()
        const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
        if (diffHours < 1) return 'Just now'
        if (diffHours < 24) return `${diffHours}h ago`
        return date.toLocaleDateString()
      },
    },
  ]

  return (
    <div className="space-y-5">
      <PageHeader
        title="Admin Staff"
        description="Manage admin staff members, roles, and permissions."
        action={<Button variant="primary" icon={<Plus className="w-4 h-4" />}>Add Staff Member</Button>}
      />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Total Staff</p>
          <p className="text-2xl font-semibold text-slate-950">{mockStaff.length}</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Active</p>
          <p className="text-2xl font-semibold text-slate-950">{mockStaff.filter(s => s.status === 'active').length}</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Admins</p>
          <p className="text-2xl font-semibold text-slate-950">{mockStaff.filter(s => s.role === 'admin').length}</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Managers</p>
          <p className="text-2xl font-semibold text-slate-950">{mockStaff.filter(s => s.role === 'manager').length}</p>
        </Card>
      </div>

      <Card className="p-4 rounded-lg border border-slate-200">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Search staff members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="moderator">Moderator</option>
              <option value="analyst">Analyst</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <DataTable
          data={paginatedStaff}
          columns={columns}
          pagination={{
            page: currentPage,
            pageSize,
            total: filteredStaff.length,
            onPageChange: setCurrentPage,
            onPageSizeChange: setPageSize,
          }}
        />
      </Card>
    </div>
  )
}

export default AdminStaffPage
