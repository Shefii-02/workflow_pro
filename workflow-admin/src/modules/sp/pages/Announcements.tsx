import React, { useState, useMemo } from 'react'
import { Plus, Search } from 'lucide-react'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { PageHeader } from '../../../shared/components/PageComponents'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Form'
import { Badge } from '../../../shared/components/Badge'
import { Card } from '../../../shared/components/Card'

interface Announcement {
  id: string
  title: string
  content: string
  audience: 'all' | 'companies' | 'freelancers' | 'clients' | 'staff'
  status: 'draft' | 'published' | 'scheduled' | 'archived'
  priority: 'low' | 'medium' | 'high'
  createdBy: string
  createdAt: string
  publishedAt?: string
  expiresAt?: string
  views: number
}

const mockAnnouncements: Announcement[] = [
  {
    id: 'ANN-001',
    title: 'Platform Maintenance Scheduled',
    content: 'We will be performing scheduled maintenance on May 12th from 2-4 AM UTC.',
    audience: 'all',
    status: 'published',
    priority: 'high',
    createdBy: 'Alice Johnson',
    createdAt: '2024-05-08',
    publishedAt: '2024-05-08',
    expiresAt: '2024-05-12',
    views: 1245,
  },
  {
    id: 'ANN-002',
    title: 'New API v2 Released',
    content: 'We are excited to announce the release of API v2 with improved performance and new features.',
    audience: 'staff',
    status: 'published',
    priority: 'medium',
    createdBy: 'Bob Smith',
    createdAt: '2024-05-07',
    publishedAt: '2024-05-07',
    expiresAt: '2024-06-07',
    views: 856,
  },
  {
    id: 'ANN-003',
    title: 'Security Patch Available',
    content: 'Critical security patches are now available for all clients. Please update immediately.',
    audience: 'companies',
    status: 'published',
    priority: 'high',
    createdBy: 'Carol White',
    createdAt: '2024-05-06',
    publishedAt: '2024-05-06',
    expiresAt: '2024-05-20',
    views: 2103,
  },
  {
    id: 'ANN-004',
    title: 'Referral Program Launch',
    content: 'Earn rewards by referring new companies to our platform. Get $500 per successful referral.',
    audience: 'freelancers',
    status: 'scheduled',
    priority: 'medium',
    createdBy: 'David Brown',
    createdAt: '2024-05-10',
    publishedAt: undefined,
    expiresAt: '2024-06-10',
    views: 0,
  },
  {
    id: 'ANN-005',
    title: 'Feature Deprecation Notice',
    content: 'The old dashboard view will be deprecated on June 1st. Please migrate to the new interface.',
    audience: 'all',
    status: 'draft',
    priority: 'low',
    createdBy: 'Alice Johnson',
    createdAt: '2024-05-10',
    views: 0,
  },
]

const AnnouncementsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [audienceFilter, setAudienceFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredAnnouncements = useMemo(() => {
    return mockAnnouncements.filter((announcement) => {
      const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter
      const matchesAudience = audienceFilter === 'all' || announcement.audience === audienceFilter
      return matchesSearch && matchesStatus && matchesAudience
    })
  }, [searchTerm, statusFilter, audienceFilter])

  const paginatedAnnouncements = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredAnnouncements.slice(startIndex, startIndex + pageSize)
  }, [filteredAnnouncements, currentPage, pageSize])

  const published = mockAnnouncements.filter(a => a.status === 'published').length
  const draft = mockAnnouncements.filter(a => a.status === 'draft').length
  const scheduled = mockAnnouncements.filter(a => a.status === 'scheduled').length

  const columns: Column<Announcement>[] = [
    {
      id: 'title',
      header: 'Title',
      accessorKey: 'title',
      sortable: true,
      cell: (value, row) => (
        <div className="flex-1">
          <div className="font-medium text-gray-900 max-w-xs truncate">{value}</div>
          <div className="text-sm text-gray-500 max-w-xs truncate">{row.content}</div>
        </div>
      ),
    },
    {
      id: 'audience',
      header: 'Audience',
      accessorKey: 'audience',
      cell: (value) => (
        <Badge variant="secondary">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'priority',
      header: 'Priority',
      accessorKey: 'priority',
      cell: (value) => (
        <Badge variant={
          value === 'high' ? 'danger' :
          value === 'medium' ? 'warning' : 'secondary'
        }>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (value) => (
        <Badge variant={
          value === 'published' ? 'success' :
          value === 'scheduled' ? 'primary' :
          value === 'draft' ? 'secondary' : 'danger'
        }>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'views',
      header: 'Views',
      accessorKey: 'views',
      cell: (value) => <span className="font-semibold text-slate-900">{value.toLocaleString()}</span>,
    },
    {
      id: 'createdAt',
      header: 'Created',
      accessorKey: 'createdAt',
      cell: (value) => new Date(value).toLocaleDateString(),
    },
  ]

  return (
    <div className="space-y-5">
      <PageHeader
        title="Announcements"
        description="Create and manage platform announcements for different user segments."
        action={<Button variant="primary" icon={<Plus className="w-4 h-4" />}>New Announcement</Button>}
      />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Published</p>
          <p className="text-2xl font-semibold text-slate-950">{published}</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Draft</p>
          <p className="text-2xl font-semibold text-slate-950">{draft}</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Scheduled</p>
          <p className="text-2xl font-semibold text-slate-950">{scheduled}</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Total Views</p>
          <p className="text-2xl font-semibold text-slate-950">{mockAnnouncements.reduce((sum, a) => sum + a.views, 0).toLocaleString()}</p>
        </Card>
      </div>

      <Card className="p-4 rounded-lg border border-slate-200">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Audiences</option>
              <option value="all">All Users</option>
              <option value="companies">Companies</option>
              <option value="freelancers">Freelancers</option>
              <option value="clients">Clients</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>

        <DataTable
          data={paginatedAnnouncements}
          columns={columns}
          pagination={{
            page: currentPage,
            pageSize,
            total: filteredAnnouncements.length,
            onPageChange: setCurrentPage,
            onPageSizeChange: setPageSize,
          }}
        />
      </Card>
    </div>
  )
}

export default AnnouncementsPage
