import { Home, LayoutDashboard, Settings, Sparkles, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../shared/constants/routes'

const navItems = [
  { label: 'Dashboard', path: ROUTES.ROOT, icon: LayoutDashboard },
  { label: 'Analytics', path: ROUTES.ANALYTICS, icon: Sparkles },
  { label: 'Team', path: ROUTES.TEAM, icon: Users },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
]

export function SidebarNavigation() {
  return (
    <aside className="flex h-full w-full flex-col gap-6 rounded-3xl bg-slate-950/95 p-6 text-slate-100 shadow-soft backdrop-blur-xl sm:w-72">
      <div className="flex items-center gap-3 rounded-3xl bg-white/5 px-4 py-3">
        <Home className="h-5 w-5" />
        <div>
          <p className="text-sm text-slate-300">Workflow Admin</p>
          <p className="text-sm font-semibold">Control center</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === ROUTES.ROOT}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-brand-600 text-white shadow-soft' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <footer className="rounded-3xl bg-slate-900/70 p-4 text-xs text-slate-400">
        <p className="font-medium text-slate-100">Workflow insights</p>
        <p className="mt-2 text-slate-400">Keep your team aligned and your projects moving.</p>
      </footer>
    </aside>
  )
}
