import { PageHeader, StatCard } from '../../../shared/components/PageComponents'
import { Card } from '../../../shared/components/Card'

export default function ClientDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Client Dashboard"
        description="View your projects and deliverables"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Projects" value="2" icon="📂" />
        <StatCard label="Total Spent" value="$8,500" icon="💰" />
        <StatCard label="Pending Tasks" value="5" icon="✅" />
        <StatCard label="Team" value="3" icon="👥" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Projects</h3>
          <div className="space-y-3">
            {[
              { name: 'Website Redesign', team: 'Design Team', progress: 65, status: 'In Progress' },
              { name: 'Brand Identity', team: 'Branding Team', progress: 100, status: 'Completed' },
            ].map((project, idx) => (
              <div key={idx} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{project.name}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-900'
                        : 'bg-blue-100 text-blue-900'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{project.team}</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-600 transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{project.progress}% Complete</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
          <div className="space-y-4">
            {[
              { icon: '📤', title: 'New files uploaded', time: '2 hours ago' },
              { icon: '✅', title: 'Task completed', time: '5 hours ago' },
              { icon: '💬', title: 'New comment', time: '1 day ago' },
            ].map((update, idx) => (
              <div key={idx} className="flex gap-3 pb-3 border-b border-gray-100 last:pb-0 last:border-0">
                <span className="text-lg">{update.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{update.title}</p>
                  <p className="text-xs text-gray-600">{update.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoices & Payments</h3>
        <div className="space-y-2">
          {[
            { id: 'INV-2024-001', amount: '$4,500', date: '2024-01-01', status: 'Paid' },
            { id: 'INV-2024-002', amount: '$4,000', date: '2024-02-01', status: 'Paid' },
          ].map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-gray-100"
            >
              <div>
                <p className="font-medium text-gray-900">{inv.id}</p>
                <p className="text-sm text-gray-600">{inv.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{inv.amount}</p>
                <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-900">
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
