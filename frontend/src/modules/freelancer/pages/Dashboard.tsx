import { PageHeader, StatCard } from '../../../shared/components/PageComponents'
import { Card } from '../../../shared/components/Card'
import { Button } from '../../../shared/components/Button'

export default function FreelancerDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Freelancer Dashboard"
        description="Manage your projects and earnings"
        action={<Button variant="primary">New Project Proposal</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Projects" value="3" icon="📂" />
        <StatCard label="Total Earnings" value="$12,500" change={{ value: 15.2, type: 'increase' }} icon="💰" />
        <StatCard label="Pending Invoices" value="2" icon="📄" />
        <StatCard label="Clients" value="8" icon="🤝" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h3>
          <div className="space-y-3">
            {[
              { name: 'Website Redesign', client: 'Acme Corp', amount: '$2,500', status: 'In Progress' },
              { name: 'Logo Design', client: 'StartupX', amount: '$1,200', status: 'Completed' },
              { name: 'Mobile App Dev', client: 'TechStart', amount: '$5,000', status: 'Active' },
            ].map((project, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">{project.name}</p>
                  <p className="text-sm text-gray-600">{project.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{project.amount}</p>
                  <p className="text-xs text-gray-600">{project.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Overview</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="font-medium">120 hrs</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-brand-600"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-600">Average Rate</p>
                <p className="font-medium">$95/hr</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-3">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">$11,400</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoices</h3>
        <div className="space-y-2">
          {[
            { id: 'INV-001', client: 'Acme Corp', amount: '$2,500', status: 'Paid', date: '2024-01-15' },
            { id: 'INV-002', client: 'StartupX', amount: '$1,200', status: 'Pending', date: '2024-01-20' },
          ].map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-gray-100"
            >
              <div>
                <p className="font-medium text-gray-900">{inv.id}</p>
                <p className="text-sm text-gray-600">{inv.client}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{inv.amount}</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded inline-block ${
                    inv.status === 'Paid' ? 'bg-green-100 text-green-900' : 'bg-yellow-100 text-yellow-900'
                  }`}
                >
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
