import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Download, Eye, Edit, Trash2, MoreHorizontal, Star } from 'lucide-react'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { PageHeader } from '../../../shared/components/PageComponents'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Form'
import { Badge } from '../../../shared/components/Badge'
import { DropdownMenu } from '../../../shared/components/DropdownMenu'
import { mockUsers } from '../../../shared/utils/mock-data'
import type { User } from '../../../shared/types'
import { AccountType, UserRole } from '../../../shared/types'
import { ROUTES } from '../../../shared/constants/routes'

const SPFreelancersPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [ratingFilter, setRatingFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Get freelancers from mock data
  const freelancers = useMemo(() => {
    return mockUsers.filter(user => user.accountType === AccountType.FREELANCER)
  }, [])

  // Add mock freelancer data for demonstration
  const mockFreelancers: (User & { rating?: number; completedProjects?: number; hourlyRate?: number; skills?: string[] })[] = [
    ...freelancers.map(f => ({ ...f, rating: 4.8, completedProjects: 45, hourlyRate: 75, skills: ['React', 'TypeScript', 'Node.js'] })),
    {
      id: '4',
      email: 'jane.dev@email.com',
      name: 'Jane Developer',
      avatar: 'JD',
      accountType: AccountType.FREELANCER,
      role: UserRole.FREELANCER,
      permissions: ['view_dashboard', 'manage_projects', 'manage_tasks'],
      status: 'active' as const,
      createdAt: '2024-01-20T00:00:00Z',
      updatedAt: '2024-01-20T00:00:00Z',
      rating: 4.9,
      completedProjects: 67,
      hourlyRate: 85,
      skills: ['Vue.js', 'Python', 'Django'],
    },
    {
      id: '5',
      email: 'bob.designer@email.com',
      name: 'Bob Designer',
      avatar: 'BD',
      accountType: AccountType.FREELANCER,
      role: UserRole.FREELANCER,
      permissions: ['view_dashboard', 'manage_projects', 'manage_tasks'],
      status: 'active' as const,
      createdAt: '2024-01-25T00:00:00Z',
      updatedAt: '2024-01-25T00:00:00Z',
      rating: 4.7,
      completedProjects: 32,
      hourlyRate: 65,
      skills: ['Figma', 'Adobe XD', 'Sketch'],
    },
  ]

  // Filter and search freelancers
  const filteredFreelancers = useMemo(() => {
    return mockFreelancers.filter((freelancer) => {
      const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          freelancer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          freelancer.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = statusFilter === 'all' || freelancer.status === statusFilter
      const matchesRating = ratingFilter === 'all' ||
                          (ratingFilter === '4.5+' && (freelancer.rating || 0) >= 4.5) ||
                          (ratingFilter === '4.0+' && (freelancer.rating || 0) >= 4.0) ||
                          (ratingFilter === '3.5+' && (freelancer.rating || 0) >= 3.5)

      return matchesSearch && matchesStatus && matchesRating
    })
  }, [searchTerm, statusFilter, ratingFilter])

  // Paginated data
  const paginatedFreelancers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredFreelancers.slice(startIndex, startIndex + pageSize)
  }, [filteredFreelancers, currentPage, pageSize])

  // Table columns
  const columns: Column<typeof mockFreelancers[0]>[] = [
    {
      id: 'name',
      header: 'Freelancer',
      accessorKey: 'name',
      sortable: true,
      cell: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-semibold">
            {row.avatar || row.name.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: 'rating',
      header: 'Rating',
      accessorKey: 'rating',
      sortable: true,
      cell: (value) => value ? (
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{value}</span>
        </div>
      ) : 'N/A',
    },
    {
      id: 'completedProjects',
      header: 'Projects',
      accessorKey: 'completedProjects',
      sortable: true,
      cell: (value) => value || 0,
    },
    {
      id: 'hourlyRate',
      header: 'Rate ($/hr)',
      accessorKey: 'hourlyRate',
      sortable: true,
      cell: (value) => value ? `$${value}` : 'N/A',
    },
    {
      id: 'skills',
      header: 'Skills',
      accessorKey: 'skills',
      cell: (value) => (
        <div className="flex flex-wrap gap-1">
          {value?.slice(0, 3).map((skill: string) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {value && value.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 3}
            </Badge>
          )}
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'warning'}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'createdAt',
      header: 'Joined',
      accessorKey: 'createdAt',
      sortable: true,
      cell: (value) => new Date(value).toLocaleDateString(),
    },
  ]

  // Row actions
  const renderActions = (freelancer: typeof mockFreelancers[0]) => (
    <DropdownMenu
      trigger={
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      }
      items={[
        {
          label: 'View Profile',
          icon: <Eye className="w-4 h-4" />,
          onClick: () => navigate(`/sp/freelancers/${freelancer.id}`),
        },
        {
          label: 'Edit',
          icon: <Edit className="w-4 h-4" />,
          onClick: () => navigate(`/sp/freelancers/${freelancer.id}/edit`),
        },
        {
          label: 'Delete',
          icon: <Trash2 className="w-4 h-4" />,
          onClick: () => handleDeleteFreelancer(freelancer.id),
          variant: 'danger',
        },
      ]}
    />
  )

  const handleDeleteFreelancer = (freelancerId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete freelancer:', freelancerId)
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export freelancers')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Freelancers"
        description="Manage freelancers on the platform"
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => navigate(ROUTES.SP_FREELANCERS_NEW)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Freelancer
            </Button>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search freelancers..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ratings</option>
            <option value="4.5+">4.5+</option>
            <option value="4.0+">4.0+</option>
            <option value="3.5+">3.5+</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={paginatedFreelancers}
        actions={renderActions}
        pagination={{
          page: currentPage,
          pageSize,
          total: filteredFreelancers.length,
          onPageChange: setCurrentPage,
          onPageSizeChange: setPageSize,
        }}
        emptyMessage="No freelancers found matching your criteria"
      />
    </div>
  )
}

export default SPFreelancersPage
