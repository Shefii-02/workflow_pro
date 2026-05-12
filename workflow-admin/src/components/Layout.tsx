import { Outlet } from 'react-router-dom'
import { SidebarNavigation } from './SidebarNavigation'
import { Button } from './ui/button'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../store/authSlice'

export function Layout() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="hidden md:block md:w-72">
          <SidebarNavigation />
        </div>

        <main className="flex-1">
          <header className="mb-6 flex flex-col gap-4 rounded-3xl bg-white/90 p-5 shadow-soft backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Welcome back{user ? `, ${user.name}` : ''}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-600">React + Tailwind</div>
              <Button variant="secondary" onClick={() => dispatch(logout())}>
                Sign out
              </Button>
            </div>
          </header>

          <div className="space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
