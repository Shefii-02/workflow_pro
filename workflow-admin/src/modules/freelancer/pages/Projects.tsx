import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Download, Eye, Edit, MoreHorizontal, Clock, CheckCircle, AlertCircle, DollarSign, Calendar } from 'lucide-react'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { PageHeader } from '../../../shared/components/PageComponents'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Form'
import { Badge } from '../../../shared/components/Badge'
import { DropdownMenu } from '../../../shared/components/DropdownMenu'
import { mockProjects } from '../../../shared/utils/mock-data'
import type { Project } from '../../../shared/types'
import { ROUTES } from '../../../shared/constants/routes'

const FreelancerProjectsPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Mock freelancer projects (in a real app, this would be filtered by current user)
  const freelancerProjects: (Project & { clientName?: string; budget?: number; deadline?: string; progress?: number })[] = [
    {
      ...mockProjects[0],
      clientName: 'Acme Corp',
      budget: 5000,
      deadline: '2024-03-15',
      progress: 75,
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Develop a React Native mobile app for e-commerce',
      slug: 'mobile-app-dev',
      status: 'active',
      visibility: 'private',
      ownerId: '2',
      ownerType: 'company' as any,
      teamMembers: [
        { id: '1', userId: '3', name: 'Mike Davis', email: 'freelancer@email.com', role: 'freelancer' as any, joinedAt: '2024-02-01T00:00:00Z' },
      ],
      createdAt: '2024-02-01T00:00:00Z',
      updatedAt: '2024-02-01T00:00:00Z',
      clientName: 'TechStart Inc',
      budget: 8000,
      deadline: '2024-04-20',
      progress: 45,
    },
    {
      id: '3',
      name: 'API Integration',
      description: 'Integrate third-party APIs for data synchronization',
      slug: 'api-integration',
      status: 'completed',
      visibility: 'private',
      ownerId: '2',
      ownerType: 'company' as any,
      teamMembers: [
        { id: '1', userId: '3', name: 'Mike Davis', email: 'freelancer@email.com', role: 'freelancer' as any, joinedAt: '2024-01-15T00:00:00Z' },
      ],
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
      clientName: 'Global Solutions',
      budget: 3200,
      deadline: '2024-02-28',
      progress: 100,
    },
  ]

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return freelancerProjects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.clientName?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'all' || project.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  // Paginated data
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredProjects.slice(startIndex, startIndex + pageSize)
  }, [filteredProjects, currentPage, pageSize])

  // Table columns
  const columns: Column<typeof freelancerProjects[0]>[] = [
    {
      id: 'name',
      header: 'Project',
      accessorKey: 'name',
      sortable: true,
      cell: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold">
            {value.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.clientName}</div>
          </div>
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (value) => {
        const statusConfig = {
          planning: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Planning' },
          active: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Active' },
          on_hold: { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'On Hold' },
          completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' },
          archived: { icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Archived' },
        }
        const config = statusConfig[value as keyof typeof statusConfig]
        const Icon = config.icon
        return (
          <Badge variant="outline" className={`${config.color} ${config.bg} border-current`}>
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
        )
      },
    },
    {
      id: 'progress',
      header: 'Progress',
      accessorKey: 'progress',
      sortable: true,
      cell: (value) => (
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">{value}%</span>
        </div>
      ),
    },
    {
      id: 'budget',
      header: 'Budget',
      accessorKey: 'budget',
      sortable: true,
      cell: (value) => (
        <div className="flex items-center space-x-1">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{value?.toLocaleString()}</span>
        </div>
      ),
    },
    {
      id: 'deadline',
      header: 'Deadline',
      accessorKey: 'deadline',
      sortable: true,
      cell: (value) => value ? (
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{new Date(value).toLocaleDateString()}</span>
        </div>
      ) : 'No deadline',
    },
    {
      id: 'updatedAt',
      header: 'Last Updated',
      accessorKey: 'updatedAt',
      sortable: true,
      cell: (value) => new Date(value).toLocaleDateString(),
    },
  ]

  // Row actions
  const renderActions = (project: typeof freelancerProjects[0]) => (
    <DropdownMenu
      trigger={
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      }
      items={[
        {
          label: 'View Details',
          icon: <Eye className="w-4 h-4" />,
          onClick: () => navigate(`/freelancer/projects/${project.id}`),
        },
        {
          label: 'Update Progress',
          icon: <Edit className="w-4 h-4" />,
          onClick: () => navigate(`/freelancer/projects/${project.id}/progress`),
        },
        {
          label: 'Submit Work',
          icon: <CheckCircle className="w-4 h-4" />,
          onClick: () => navigate(`/freelancer/projects/${project.id}/submit`),
        },
      ]}
    />
  )

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export projects')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Projects"
        description="Manage your freelance projects and track progress"
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => navigate(ROUTES.FREELANCER_PROJECTS_NEW)}>
              <Plus className="w-4 h-4 mr-2" />
              Find Projects
            </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">
                {freelancerProjects.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {freelancerProjects.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">
                ${freelancerProjects.reduce((acc, p) => acc + (p.budget || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="on_hold">On Hold</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={paginatedProjects}
        actions={renderActions}
        pagination={{
          page: currentPage,
          pageSize,
          total: filteredProjects.length,
          onPageChange: setCurrentPage,
          onPageSizeChange: setPageSize,
        }}
        emptyMessage="No projects found matching your criteria"
      />
    </div>
  )
}

export default FreelancerProjectsPage
