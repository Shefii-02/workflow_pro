import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Download, Eye, Edit, Trash2, MoreHorizontal, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { PageHeader } from '../../../shared/components/PageComponents'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Form'
import { Badge } from '../../../shared/components/Badge'
import { DropdownMenu } from '../../../shared/components/DropdownMenu'
import { mockProjects } from '../../../shared/utils/mock-data'
import type { Project } from '../../../shared/types'

const CompanyProjectsPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [visibilityFilter, setVisibilityFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.slug.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'all' || project.status === statusFilter
      const matchesVisibility = visibilityFilter === 'all' || project.visibility === visibilityFilter

      return matchesSearch && matchesStatus && matchesVisibility
    })
  }, [searchTerm, statusFilter, visibilityFilter])

  // Paginated data
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredProjects.slice(startIndex, startIndex + pageSize)
  }, [filteredProjects, currentPage, pageSize])

  // Table columns
  const columns: Column<Project>[] = [
    {
      id: 'name',
      header: 'Project',
      accessorKey: 'name',
      sortable: true,
      cell: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-semibold">
            {value.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.slug}</div>
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
      id: 'visibility',
      header: 'Visibility',
      accessorKey: 'visibility',
      sortable: true,
      cell: (value) => (
        <Badge variant={
          value === 'public' ? 'success' :
          value === 'internal' ? 'primary' : 'secondary'
        }>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'teamMembers',
      header: 'Team',
      accessorKey: 'teamMembers',
      cell: (value) => (
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{value?.length || 0} members</span>
        </div>
      ),
    },
    {
      id: 'createdAt',
      header: 'Created',
      accessorKey: 'createdAt',
      sortable: true,
      cell: (value) => new Date(value).toLocaleDateString(),
    },
    {
      id: 'updatedAt',
      header: 'Updated',
      accessorKey: 'updatedAt',
      sortable: true,
      cell: (value) => new Date(value).toLocaleDateString(),
    },
  ]

  // Row actions
  const renderActions = (project: Project) => (
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
          onClick: () => navigate(`/company/projects/${project.id}`),
        },
        {
          label: 'Edit',
          icon: <Edit className="w-4 h-4" />,
          onClick: () => navigate(`/company/projects/${project.id}/edit`),
        },
        {
          label: 'Manage Team',
          icon: <Users className="w-4 h-4" />,
          onClick: () => navigate(`/company/projects/${project.id}/team`),
        },
        {
          label: 'Delete',
          icon: <Trash2 className="w-4 h-4" />,
          onClick: () => handleDeleteProject(project.id),
          variant: 'danger',
        },
      ]}
    />
  )

  const handleDeleteProject = (projectId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete project:', projectId)
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export projects')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Manage your company's projects and tasks"
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => navigate('/company/projects/new')}>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{mockProjects.length}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockProjects.filter(p => p.status === 'active').length}
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
                {mockProjects.filter(p => p.status === 'completed').length}
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
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockProjects.reduce((acc, p) => acc + (p.teamMembers?.length || 0), 0)}
              </p>
            </div>
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
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
          <select
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Visibility</option>
            <option value="private">Private</option>
            <option value="internal">Internal</option>
            <option value="public">Public</option>
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

export default CompanyProjectsPage