import { Link, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import type { SidebarItem } from '../types'
import { ROUTES } from '../constants/routes'

interface BreadcrumbsProps {
  items: SidebarItem[]
}

function findBreadcrumbTrail(items: SidebarItem[], pathname: string): SidebarItem[] | null {
  for (const item of items) {
    if (pathname === item.path || pathname.startsWith(item.path + '/')) {
      if (item.children?.length) {
        const trail = findBreadcrumbTrail(item.children, pathname)
        if (trail) {
          return [item, ...trail]
        }
      }
      return [item]
    }
  }
  return null
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { pathname } = useLocation()
  const trail = useMemo(() => findBreadcrumbTrail(items, pathname) ?? [], [items, pathname])

  if (!trail.length) {
    return null
  }

  return (
    <div className="rounded-xl border border-slate-200/60 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link
          to={ROUTES.ROOT}
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="font-medium">Workspace</span>
        </Link>
        {trail.map((item, index) => (
          <span key={item.id} className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {index < trail.length - 1 ? (
              <Link
                to={item.path}
                className="rounded-lg px-2 py-1 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ) : (
              <span className="rounded-lg bg-brand-50 px-2 py-1 font-semibold text-brand-700">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </div>
  )
}
