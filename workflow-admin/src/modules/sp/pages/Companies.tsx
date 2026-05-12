import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Download, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { PageHeader } from '../../../shared/components/PageComponents'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Form'
import { Badge } from '../../../shared/components/Badge'
import { DropdownMenu } from '../../../shared/components/DropdownMenu'
import { mockCompanies } from '../../../shared/utils/mock-data'
import type { Company } from '../../../shared/types'
import { ROUTES } from '../../../shared/constants/routes'

const CompaniesPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [planFilter, setPlanFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Filter and search companies
  const filteredCompanies = useMemo(() => {
    return mockCompanies.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.industry?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'all' || company.status === statusFilter
      const matchesPlan = planFilter === 'all' || company.subscriptionPlan === planFilter

      return matchesSearch && matchesStatus && matchesPlan
    })
  }, [searchTerm, statusFilter, planFilter])

  // Paginated data
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredCompanies.slice(startIndex, startIndex + pageSize)
  }, [filteredCompanies, currentPage, pageSize])

  // Table columns
  const columns: Column<Company>[] = [
    {
      id: 'name',
      header: 'Company',
      accessorKey: 'name',
      sortable: true,
      cell: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold">
            {row.name.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: 'industry',
      header: 'Industry',
      accessorKey: 'industry',
      sortable: true,
      cell: (value) => value || 'Not specified',
    },
    {
      id: 'employeeCount',
      header: 'Employees',
      accessorKey: 'employeeCount',
      sortable: true,
      cell: (value) => value ? `${value}` : 'N/A',
    },
    {
      id: 'subscriptionPlan',
      header: 'Plan',
      accessorKey: 'subscriptionPlan',
      sortable: true,
      cell: (value) => (
        <Badge variant={
          value === 'enterprise' ? 'success' :
          value === 'professional' ? 'primary' :
          value === 'starter' ? 'secondary' : 'default'
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
      id: 'createdAt',
      header: 'Created',
      accessorKey: 'createdAt',
      sortable: true,
      cell: (value) => new Date(value).toLocaleDateString(),
    },
  ]

  // Row actions
  const renderActions = (company: Company) => (
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
          onClick: () => navigate(`/sp/companies/${company.id}`),
        },
        {
          label: 'Edit',
          icon: <Edit className="w-4 h-4" />,
          onClick: () => navigate(`/sp/companies/${company.id}/edit`),
        },
        {
          label: 'Delete',
          icon: <Trash2 className="w-4 h-4" />,
          onClick: () => handleDeleteCompany(company.id),
          variant: 'danger',
        },
      ]}
    />
  )

  const handleDeleteCompany = (companyId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete company:', companyId)
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export companies')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Companies"
        description="Manage all companies on the platform"
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => navigate(ROUTES.SP_COMPANIES_NEW)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Company
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
              placeholder="Search companies..."
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
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Plans</option>
            <option value="free">Free</option>
            <option value="starter">Starter</option>
            <option value="professional">Professional</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={paginatedCompanies}
        actions={renderActions}
        pagination={{
          page: currentPage,
          pageSize,
          total: filteredCompanies.length,
          onPageChange: setCurrentPage,
          onPageSizeChange: setPageSize,
        }}
        emptyMessage="No companies found matching your criteria"
      />
    </div>
  )
}

export default CompaniesPage
