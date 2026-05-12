import { Card } from '../components/ui/card'

export default function Team() {
  return (
    <div className="space-y-6">
      <Card>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Team</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Your collaborators</h1>
          <p className="mt-4 text-slate-600">Review permissions, check activity, and keep the team in sync.</p>
        </div>
      </Card>
    </div>
  )
}
