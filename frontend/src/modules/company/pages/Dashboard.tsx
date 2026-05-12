import { useState } from 'react'
import { PageHeader, StatCard } from '../../../shared/components/PageComponents'
import { Card } from '../../../shared/components/Card'
import { Button } from '../../../shared/components/Button'
import { mockTasks, mockProjects } from '../../../shared/utils/mock-data'
import type { Task } from '../../../shared/types'

export default function CompanyDashboard() {
  const [tasks] = useState<Task[]>(mockTasks)

  const activeProjects = mockProjects.filter((p) => p.status === 'active').length
  const completedTasks = tasks.filter((t) => t.status === 'done').length
  const totalTasks = tasks.length

  return (
    <div className="space-y-8">
      <PageHeader
        title="Company Dashboard"
        description="Overview of your projects and tasks"
        action={<Button variant="primary">New Project</Button>}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Projects" value={activeProjects} icon="📂" />
        <StatCard label="Total Tasks" value={totalTasks} icon="✅" />
        <StatCard label="Completed Tasks" value={completedTasks} icon="🎯" />
        <StatCard label="Team Members" value="8" change={{ value: 2, type: 'increase' }} icon="👥" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {mockProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{project.name}</p>
                  <p className="text-sm text-gray-600">{project.teamMembers.length} team members</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    project.status === 'active'
                      ? 'bg-green-100 text-green-900'
                      : 'bg-blue-100 text-blue-900'
                  }`}
                >
                  {project.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              📝 Create Task
            </Button>
            <Button variant="outline" className="w-full justify-start">
              👥 Invite Member
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📊 View Reports
            </Button>
            <Button variant="outline" className="w-full justify-start">
              ⚙️ Settings
            </Button>
          </div>
        </Card>
      </div>

      {/* Tasks */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
          <select className="text-sm border border-gray-300 rounded-lg px-2 py-1">
            <option>All Statuses</option>
            <option>Todo</option>
            <option>In Progress</option>
          </select>
        </div>
        <div className="space-y-2">
          {tasks
            .filter((t) => t.status !== 'done')
            .map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-100"
              >
                <input type="checkbox" className="rounded" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <div className="flex gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-900'
                          : 'bg-yellow-100 text-yellow-900'
                      }`}
                    >
                      {task.priority}
                    </span>
                    {task.labels?.map((label) => (
                      <span key={label} className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-600">{new Date(task.dueDate || '').toLocaleDateString()}</span>
              </div>
            ))}
        </div>
      </Card>
    </div>
  )
}
