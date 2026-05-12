import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, MessageSquare, Eye } from 'lucide-react'
import { DataTable, type Column } from '../../../shared/components/DataTable'
import { PageHeader } from '../../../shared/components/PageComponents'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Form'
import { Badge } from '../../../shared/components/Badge'
import { Card } from '../../../shared/components/Card'
import { ROUTES } from '../../../shared/constants'
import { mockSupportTickets, type SupportTicketRecord } from '../../../shared/utils/mock-data'

const supportLinks = [
  { label: 'Ticket System', path: ROUTES.SP_SUPPORT, icon: '🎫', metric: '68 active tickets' },
  { label: 'Ticket Details', path: `${ROUTES.SP_SUPPORT}/tickets/TKT-001`, icon: '📋', metric: 'SLA and owner view' },
  { label: 'Conversation Thread', path: `${ROUTES.SP_SUPPORT}/conversation`, icon: '💬', metric: 'Customer replies' },
  { label: 'Status Workflow', path: `${ROUTES.SP_SUPPORT}/workflow`, icon: '✅', metric: 'Queue board' },
  { label: 'Support Analytics', path: `${ROUTES.SP_SUPPORT}/analytics`, icon: '📊', metric: 'SLA and CSAT' },
]

const SupportTicketsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredTickets = useMemo(() => {
    return mockSupportTickets.filter((ticket) => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.submitter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
      return matchesSearch && matchesPriority && matchesStatus
    })
  }, [searchTerm, priorityFilter, statusFilter])

  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredTickets.slice(startIndex, startIndex + pageSize)
  }, [filteredTickets, currentPage, pageSize])

  const openTickets = mockSupportTickets.filter(t => t.status === 'open').length
  const inProgress = mockSupportTickets.filter(t => t.status === 'in_progress').length
  const resolved = mockSupportTickets.filter(t => t.status === 'resolved').length

  const columns: Column<SupportTicketRecord>[] = [
    {
      id: 'id',
      header: 'Ticket ID',
      accessorKey: 'id',
      cell: (value) => <span className="font-mono text-sm font-semibold text-slate-900">{value}</span>,
    },
    {
      id: 'title',
      header: 'Title',
      accessorKey: 'title',
      sortable: true,
      cell: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.submitter}</div>
        </div>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
      cell: (value) => (
        <Badge variant="secondary">{value}</Badge>
      ),
    },
    {
      id: 'priority',
      header: 'Priority',
      accessorKey: 'priority',
      sortable: true,
      cell: (value) => (
        <Badge variant={
          value === 'critical' ? 'danger' :
          value === 'high' ? 'warning' :
          value === 'medium' ? 'primary' : 'secondary'
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
          value === 'resolved' ? 'success' :
          value === 'in_progress' ? 'primary' :
          value === 'waiting' ? 'warning' : 'secondary'
        }>
          {value.replace('_', ' ').charAt(0).toUpperCase() + value.replace('_', ' ').slice(1)}
        </Badge>
      ),
    },
    {
      id: 'messages',
      header: 'Messages',
      accessorKey: 'messages',
      cell: (value) => (
        <div className="flex items-center gap-1 text-slate-700">
          <MessageSquare className="w-4 h-4" />
          {value}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-5">
      <PageHeader
        title="Support Tickets"
        description="Manage customer support tickets and track resolution progress."
        action={<Button variant="primary" icon={<Plus className="w-4 h-4" />}>New Ticket</Button>}
      />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Total Tickets</p>
          <p className="text-2xl font-semibold text-slate-950">{mockSupportTickets.length}</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Open</p>
          <p className="text-2xl font-semibold text-slate-950">{openTickets}</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">In Progress</p>
          <p className="text-2xl font-semibold text-slate-950">{inProgress}</p>
        </Card>
        <Card className="p-4 rounded-lg border-slate-200 bg-white">
          <p className="text-xs font-medium uppercase text-slate-500 mb-2">Resolved</p>
          <p className="text-2xl font-semibold text-slate-950">{resolved}</p>
        </Card>
      </div>

      <Card className="p-4 rounded-lg border border-slate-200">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Search tickets by ID, title, or submitter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="waiting">Waiting</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <DataTable
          data={paginatedTickets}
          columns={columns}
          actions={(ticket) => (
            <Link to={`${ROUTES.SP_SUPPORT}/tickets/${ticket.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
              <Eye className="h-4 w-4" />
              View
            </Link>
          )}
          pagination={{
            page: currentPage,
            pageSize,
            total: filteredTickets.length,
            onPageChange: setCurrentPage,
            onPageSizeChange: setPageSize,
          }}
        />
      </Card>

      <Card className="p-4 rounded-lg border border-slate-200">
        <div className="mb-5">
          <h3 className="text-lg font-bold text-slate-900">Support System Pages</h3>
          <p className="mt-1 text-sm text-slate-600">Open dedicated support workflows for details, conversations, status movement, and analytics.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {supportLinks.map((item) => (
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
    </div>
  )
}

export default SupportTicketsPage
