import React, { cloneElement, useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Breadcrumbs } from './Breadcrumbs'
import { cn, Storage } from '../utils/helpers'
import type { SidebarItem } from '../types'
import { STORAGE_KEYS } from '../constants'
import { usePermissions, useStableCallback } from '../hooks'

interface SidebarProps {
  items: SidebarItem[]
  branding?: {
    logo?: React.ReactNode
    name: string
    tagline?: string
  }
  isOpen?: boolean
  isMobileOpen?: boolean
  onToggle?: (open: boolean) => void
  onCloseMobile?: () => void
}

function filterSidebarItems(
  items: SidebarItem[],
  hasAnyPermission: (permissions: NonNullable<SidebarItem['permissions']>) => boolean,
): SidebarItem[] {
  return items
    .map((item) => {
      const allowed = !item.permissions || item.permissions.length === 0 || hasAnyPermission(item.permissions)
      if (!allowed) return null

      const children = item.children ? filterSidebarItems(item.children, hasAnyPermission) : undefined
      if (item.children && (!children || children.length === 0)) {
        return { ...item, children: undefined }
      }

      return { ...item, children }
    })
    .filter(Boolean) as SidebarItem[]
}

function getActiveSidebarParentIds(
  item: SidebarItem,
  isActive: (path: string) => boolean,
  parents: string[] = [],
): string[] {
  const itemActive = isActive(item.path)
  const childIds = item.children?.flatMap((child) => getActiveSidebarParentIds(child, isActive, [...parents, item.id])) ?? []
  if (itemActive) {
    return parents
  }
  return childIds
}

export const Sidebar = React.memo(function Sidebar({
  items,
  branding,
  isOpen = true,
  isMobileOpen = false,
  onToggle,
  onCloseMobile,
}: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const { hasAnyPermission } = usePermissions()

  const normalizePath = useCallback((path: string) => path.split('?')[0].replace(/\/$/, '') || '/', [])

  const isActive = useCallback(
    (path: string) => {
      const normalized = normalizePath(path)
      return (
        location.pathname === normalized ||
        location.pathname.startsWith(`${normalized}/`)
      )
    },
    [location.pathname, normalizePath],
  )

  const filteredItems = useMemo(() => filterSidebarItems(items, hasAnyPermission), [items, hasAnyPermission])

  const activeParentIds = useMemo(
    () => filteredItems.flatMap((item) => getActiveSidebarParentIds(item, isActive)),
    [filteredItems, isActive],
  )

  const visibleExpandedItems = useMemo(
    () => new Set([...expandedItems, ...activeParentIds]),
    [activeParentIds, expandedItems],
  )

  const toggleExpand = useCallback((id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }, [])

  function renderItem(item: SidebarItem, level = 0) {
    const hasChildren = item.children && item.children.length > 0
    const expanded = visibleExpandedItems.has(item.id)
    const active = isActive(item.path)

    return (
      <div key={item.id}>
        <button
          type="button"
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id)
            }
            navigate(item.path)
            onCloseMobile?.()
          }}
          className={cn(
            'group relative flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950',
            {
              'bg-slate-100 text-slate-950': active,
              'pl-8': level > 0,
            },
          )}
        >
          <span className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className={cn(
              'inline-flex h-7 w-7 items-center justify-center rounded-md bg-transparent text-slate-500 transition-colors group-hover:text-slate-900',
              {
                'text-slate-950': active,
                'h-6 w-6': level > 0,
              }
            )}>
              {item.icon}
            </span>
            <span className={cn('truncate transition-opacity', { 'opacity-0': !isOpen })}>{item.label}</span>
            {item.badge && isOpen && (
              <span
                className={cn(
                  'ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                  {
                    'bg-slate-200 text-slate-800': item.badgeVariant === 'default' || !item.badgeVariant,
                    'bg-emerald-500 text-white': item.badgeVariant === 'success',
                    'bg-sky-500 text-white': item.badgeVariant === 'info',
                    'bg-amber-500 text-slate-900': item.badgeVariant === 'warning',
                    'bg-rose-500 text-white': item.badgeVariant === 'danger',
                  },
                )}
              >
                {item.badge}
              </span>
            )}
          </span>

          {hasChildren && isOpen && (
            <span className={cn('transition-transform duration-200 text-slate-400', { 'rotate-180': expanded })}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          )}

          {item.badge && !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white ring-2 ring-white">
              {item.badge}
            </span>
          )}
        </button>

        {hasChildren && expanded && (
          <div className="ml-3 mt-1 space-y-1 border-l border-slate-200 pl-2">
            {item.children?.map((child) => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const sidebarVisibility = isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex h-full flex-col overflow-hidden border-r border-slate-200 bg-white shadow-elevated transition-all duration-200 lg:static lg:h-auto lg:shadow-none',
        sidebarVisibility,
        {
          'w-64': isOpen,
          'w-20': !isOpen,
        },
      )}
    >
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white px-3 py-3">
        <div className={cn('flex items-center justify-between gap-3', { 'justify-center': !isOpen })}>
          <div className={cn('flex items-center gap-3 min-w-0', { 'justify-center': !isOpen })}>
            {branding?.logo && (
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-950 text-sm text-white">
                {branding.logo}
              </div>
            )}
            {isOpen && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950">{branding?.name}</p>
                <p className="truncate text-xs font-medium text-slate-500">{branding?.tagline}</p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => (isMobileOpen ? onCloseMobile?.() : onToggle?.(!isOpen))}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-950 focus:ring-2 focus:ring-brand-100"
          >
            {isMobileOpen ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : isOpen ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <div className="space-y-1">
          {filteredItems.map((item) => renderItem(item))}
        </div>
      </nav>

      <div className="border-t border-slate-200 bg-slate-50 px-3 py-3">
        <div className={cn('rounded-md border border-slate-200 bg-white p-3', { 'text-center': !isOpen })}>
          <p className="text-xs font-semibold text-slate-900">Workflow Insights</p>
          <p className={cn('mt-1 text-xs text-slate-600', { 'hidden': !isOpen })}>
            Keep your team aligned and projects moving forward.
          </p>
        </div>
      </div>
    </aside>
  )
})

// Main Layout
export interface LayoutProps {
  sidebar: {
    items: SidebarItem[]
    branding?: {
      logo?: React.ReactNode
      name: string
      tagline?: string
    }
  }
  header?: React.ReactNode
  children: React.ReactNode
}

interface LayoutHeaderProps {
  onToggleMobileMenu?: () => void
  commandItems?: SidebarItem[]
}

export function Layout({ sidebar, header, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const stored = Storage.get(STORAGE_KEYS.SIDEBAR_STATE)
    return typeof stored === 'boolean' ? stored : true
  })
  const [mobileOpen, setMobileOpen] = useState(false)
  const openMobileMenu = useStableCallback(() => setMobileOpen(true))
  const closeMobileMenu = useStableCallback(() => setMobileOpen(false))

  useEffect(() => {
    Storage.set(STORAGE_KEYS.SIDEBAR_STATE, sidebarOpen)
  }, [sidebarOpen])

  const enhancedHeader = useMemo(() => {
    if (!header || !React.isValidElement(header)) {
      return header
    }
    return cloneElement(header as React.ReactElement<LayoutHeaderProps>, {
      onToggleMobileMenu: openMobileMenu,
      commandItems: sidebar.items,
    })
  }, [header, openMobileMenu, sidebar.items])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-all duration-300 lg:hidden',
          {
            'opacity-100 pointer-events-auto': mobileOpen,
            'opacity-0 pointer-events-none': !mobileOpen,
          },
        )}
        onClick={closeMobileMenu}
      />

      <div className="relative flex min-h-screen">
        <Sidebar
          items={sidebar.items}
          branding={sidebar.branding}
          isOpen={sidebarOpen}
          isMobileOpen={mobileOpen}
          onToggle={setSidebarOpen}
          onCloseMobile={closeMobileMenu}
        />

        <main
          className={cn(
            'flex flex-1 flex-col transition-all duration-300 ease-in-out',
            // {
            //   'lg:pl-72': sidebarOpen,
            //   'lg:pl-20': !sidebarOpen,
            // }
          )}
        >
          {enhancedHeader}
          <div className="flex-1">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-5 lg:px-6">
              <Breadcrumbs items={sidebar.items} />
              <div className="mt-4">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
