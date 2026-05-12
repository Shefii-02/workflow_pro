import { Card } from '../components/ui/card'
import { useAppSelector } from '../store/hooks'

export default function Settings() {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Account settings</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Profile overview</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-950">Name:</span> {user?.name ?? 'Not set'}
            </p>
            <p>
              <span className="font-semibold text-slate-950">Email:</span> {user?.email ?? 'Not set'}
            </p>
            <p className="text-slate-500">You can extend the settings page with notifications, billing and access controls.</p>
          </div>
        </Card>

        <Card className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">System status</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">All systems operational</h2>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
            <p>API uptime: 99.98%</p>
            <p className="mt-2">No alerts detected in the last 24 hours.</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
