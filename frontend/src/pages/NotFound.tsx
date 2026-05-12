import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { ROUTES } from '../shared/constants/routes'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white/95 p-10 text-center shadow-soft">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Page not found</p>
        <h1 className="mt-4 text-5xl font-semibold text-slate-950">404</h1>
        <p className="mt-4 text-base text-slate-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <Link to={ROUTES.ROOT}>
          <Button className="mt-8" variant="secondary">
            Return home
          </Button>
        </Link>
      </div>
    </div>
  )
}
