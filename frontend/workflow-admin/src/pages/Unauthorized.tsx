import { useNavigate } from 'react-router-dom'
import { Button } from '../shared/components/Button'

export default function UnauthorizedPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-md w-full rounded-3xl border border-gray-200 bg-white p-10 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-slate-400">Unauthorized</p>
          <h1 className="mt-4 text-5xl font-semibold text-gray-950 dark:text-white">401</h1>
          <p className="mt-4 text-base text-gray-600 dark:text-slate-300">
            You do not have permission to view this page. Please contact your administrator or sign in with a different account.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => navigate(-1)} variant="outline" className="w-full sm:w-auto">
            Go back
          </Button>
          <Button onClick={() => navigate('/login')} className="w-full sm:w-auto">
            Return to sign in
          </Button>
        </div>
      </div>
    </div>
  )
}
