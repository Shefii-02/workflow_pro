import { Card } from '../components/ui/card'

export default function Analytics() {
  return (
    <div className="space-y-6">
      <Card>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Analytics</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Growth insights</h1>
          <p className="mt-4 text-slate-600">Track campaign performance and channel conversion in one view.</p>
        </div>
      </Card>
    </div>
  )
}
