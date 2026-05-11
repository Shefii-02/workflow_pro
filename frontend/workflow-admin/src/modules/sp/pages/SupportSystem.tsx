import { Link, useParams } from 'react-router-dom'
import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import {
  CheckCircle,
  Clock,
  MessageSquare,
  Send,
  ShieldAlert,
  Ticket,
  UserRound,
} from 'lucide-react'
import { PageHeader, StatCard, AnalyticsChartCard } from '../../../shared/components/PageComponents'
import { Badge } from '../../../shared/components/Badge'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { ROUTES } from '../../../shared/constants'

const tickets = [
  {
    id: 'TKT-001',
    title: 'API Rate Limiting Issues',
    requester: 'John Acme',
    email: 'john@acme.com',
    company: 'Acme Corp',
    priority: 'critical',
    status: 'in_progress',
    assignee: 'Alice Johnson',
    category: 'Technical',
    sla: '1h 12m remaining',
    created: 'May 8, 2024',
  },
  {
    id: 'TKT-002',
    title: 'Billing Invoice Not Generated',
    requester: 'Sarah Tech',
    email: 'sarah@techinnovations.com',
    company: 'Tech Innovations',
    priority: 'high',
    status: 'waiting',
    assignee: 'Bob Smith',
    category: 'Billing',
    sla: '3h 40m remaining',
    created: 'May 9, 2024',
  },
]

const thread = [
  { author: 'John Acme', role: 'Customer', time: '10:14 AM', body: 'We are seeing 429 responses on normal traffic. The dashboard says our limit is not exceeded.' },
  { author: 'Alice Johnson', role: 'Support', time: '10:22 AM', body: 'I checked the gateway logs and found a regional burst limiter applying too aggressively. I am escalating this to platform operations.' },
  { author: 'System', role: 'Automation', time: '10:25 AM', body: 'Incident linked: API gateway burst limit configuration drift. Priority raised to critical.' },
  { author: 'Alice Johnson', role: 'Support', time: '10:41 AM', body: 'A temporary exception is active for your workspace while engineering rolls out the limiter patch.' },
]

const workflowColumns = [
  { label: 'Open', count: 18, tone: 'border-blue-200 bg-blue-50', tickets: ['Feature Request: Custom Branding', 'New user invite not received'] },
  { label: 'In Progress', count: 24, tone: 'border-amber-200 bg-amber-50', tickets: ['API Rate Limiting Issues', 'Performance Degradation After Update'] },
  { label: 'Waiting', count: 11, tone: 'border-violet-200 bg-violet-50', tickets: ['Billing Invoice Not Generated', 'Account ownership verification'] },
  { label: 'Resolved', count: 64, tone: 'border-emerald-200 bg-emerald-50', tickets: ['Slack integration restored', 'Invoice export completed'] },
]

const analyticsOptions: ApexOptions = {
  chart: { toolbar: { show: false }, zoom: { enabled: false } },
  colors: ['#2563eb', '#22c55e'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  grid: { borderColor: '#e2e8f0', strokeDashArray: 4 },
  xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  tooltip: { theme: 'light' },
  legend: { position: 'bottom' },
}

function statusLabel(value: string) {
  return value.replace('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function TicketDetails() {
  const { ticketId } = useParams()
  const ticket = tickets.find((item) => item.id === ticketId) ?? tickets[0]

  return (
    <div className="space-y-5">
      <PageHeader
        title={`${ticket.id}: ${ticket.title}`}
        description="Ticket details, customer context, SLA status, ownership, and related support activity."
        action={<Link to={`${ROUTES.SP_SUPPORT}/conversation`}><Button variant="primary">Open Conversation</Button></Link>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Priority" value={statusLabel(ticket.priority)} description="Escalation policy" variant="danger" icon={<ShieldAlert className="h-6 w-6" />} />
        <StatCard label="Status" value={statusLabel(ticket.status)} description={ticket.sla} variant="warning" icon={<Clock className="h-6 w-6" />} />
        <StatCard label="Assignee" value={ticket.assignee} description="Current ticket owner" variant="brand" icon={<UserRound className="h-6 w-6" />} />
        <StatCard label="Category" value={ticket.category} description="Routing queue" variant="info" icon={<Ticket className="h-6 w-6" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-6">
          <h3 className="font-semibold text-slate-950">Customer Context</h3>
          <div className="mt-5 space-y-4 text-sm">
            <div><p className="text-slate-500">Requester</p><p className="font-semibold text-slate-950">{ticket.requester}</p></div>
            <div><p className="text-slate-500">Email</p><p className="font-semibold text-slate-950">{ticket.email}</p></div>
            <div><p className="text-slate-500">Company</p><p className="font-semibold text-slate-950">{ticket.company}</p></div>
            <div><p className="text-slate-500">Created</p><p className="font-semibold text-slate-950">{ticket.created}</p></div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-slate-950">Resolution Plan</h3>
          <div className="mt-5 space-y-3">
            {['Confirm gateway limiter logs', 'Apply workspace exception', 'Coordinate platform patch', 'Send customer postmortem'].map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                <CheckCircle className={`h-5 w-5 ${index < 2 ? 'text-emerald-600' : 'text-slate-300'}`} />
                <span className="text-sm font-medium text-slate-800">{step}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function ConversationThread() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Conversation Thread"
        description="Customer and support replies with automation events in one chronological workspace."
        action={<Link to={`${ROUTES.SP_SUPPORT}/tickets/TKT-001`}><Button variant="secondary">Ticket Details</Button></Link>}
      />

      <Card className="p-6">
        <div className="space-y-5">
          {thread.map((message) => (
            <div key={`${message.author}-${message.time}`} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 font-semibold text-slate-700">
                {message.author.slice(0, 1)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-950">{message.author}</p>
                  <Badge variant={message.role === 'Support' ? 'primary' : message.role === 'Automation' ? 'warning' : 'secondary'}>{message.role}</Badge>
                  <span className="text-xs text-slate-500">{message.time}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">{message.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <textarea className="h-28 w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:border-brand-400" placeholder="Write a support reply..." />
          <div className="mt-3 flex justify-end">
            <Button variant="primary" icon={<Send className="h-4 w-4" />}>Send Reply</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function WorkflowBoard() {
  return (
    <div className="space-y-5">
      <PageHeader title="Ticket Status Workflow" description="Operational workflow board for support queues, ownership, and SLA handoff." />
      <div className="grid gap-4 xl:grid-cols-4">
        {workflowColumns.map((column) => (
          <Card key={column.label} className={`p-5 ${column.tone}`}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-slate-950">{column.label}</h3>
              <Badge variant="outline">{column.count}</Badge>
            </div>
            <div className="space-y-3">
              {column.tickets.map((ticket) => (
                <div key={ticket} className="rounded-xl border border-white/70 bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-900">{ticket}</p>
                  <p className="mt-2 text-xs text-slate-500">SLA tracked, owner assigned</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SupportAnalytics() {
  return (
    <div className="space-y-5">
      <PageHeader title="Support Analytics" description="Support volume, resolution speed, SLA performance, and customer satisfaction trends." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tickets this week" value="384" description="+12% from previous week" variant="brand" icon={<Ticket className="h-6 w-6" />} />
        <StatCard label="First response" value="18m" description="Median response time" variant="success" icon={<Clock className="h-6 w-6" />} />
        <StatCard label="SLA hit rate" value="94%" description="Across priority queues" variant="info" icon={<CheckCircle className="h-6 w-6" />} />
        <StatCard label="CSAT" value="4.7" description="After-ticket survey score" variant="success" icon={<MessageSquare className="h-6 w-6" />} />
      </div>
      <AnalyticsChartCard
        title="Ticket Volume and Resolution"
        description="Opened versus resolved tickets by day."
        chart={
          <Chart
            options={analyticsOptions}
            series={[
              { name: 'Opened', data: [42, 56, 48, 64, 72, 51, 49] },
              { name: 'Resolved', data: [38, 49, 52, 58, 69, 55, 46] },
            ]}
            type="area"
            height={340}
          />
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {['Billing: 27%', 'Technical: 44%', 'Integrations: 18%'].map((item) => (
          <Card key={item} className="p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Queue Mix</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">{item}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function SupportSystemPage() {
  const { view, ticketId } = useParams()

  if (ticketId) return <TicketDetails />
  if (view === 'conversation') return <ConversationThread />
  if (view === 'workflow') return <WorkflowBoard />
  if (view === 'analytics') return <SupportAnalytics />
  return <TicketDetails />
}
