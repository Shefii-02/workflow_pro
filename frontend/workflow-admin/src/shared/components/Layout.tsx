import React, { cloneElement, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Breadcrumbs } from './Breadcrumbs'
import { cn, Storage } from '../utils/helpers'
import type { SidebarItem } from '../types'
import { STORAGE_KEYS } from '../constants'

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

export function Sidebar({
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

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  const renderItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const expanded = expandedItems.includes(item.id)
    const active = isActive(item.path)

    return (
      <div key={item.id}>
        <button
          type="button"
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id)
            } else {
              navigate(item.path)
              onCloseMobile?.()
            }
          }}
          className={cn(
            'group relative w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-between gap-3 text-slate-700 hover:bg-slate-100/80 hover:shadow-sm',
            {
              'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-100 hover:bg-brand-100/80': active && !hasChildren,
              'pl-12': level > 0,
              'ml-2 mr-2': level === 0,
            },
          )}
        >
          <span className="flex items-center gap-3 flex-1 min-w-0">
            <span className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors group-hover:bg-slate-200',
              {
                'bg-brand-100 text-brand-700 group-hover:bg-brand-200': active,
                'h-8 w-8': level > 0,
              }
            )}>
              {item.icon}
            </span>
            <span className={cn('truncate transition-opacity', { 'opacity-0': !isOpen })}>{item.label}</span>
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
          <div className="ml-6 mt-1 space-y-1 border-l border-slate-200 pl-4">
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
        'fixed inset-y-0 left-0 z-50 flex h-full flex-col overflow-hidden border-r border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-xl transition-all duration-300 lg:static lg:h-auto lg:shadow-none lg:backdrop-blur-none',
        sidebarVisibility,
        {
          'w-72': isOpen,
          'w-20': !isOpen,
        },
      )}
    >
      <div className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/80 px-6 py-5 backdrop-blur-sm">
        <div className={cn('flex items-center justify-between gap-3', { 'justify-center': !isOpen })}>
          <div className={cn('flex items-center gap-3 min-w-0', { 'justify-center': !isOpen })}>
            {branding?.logo && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-xl text-white shadow-sm">
                {branding.logo}
              </div>
            )}
            {isOpen && (
              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-slate-900">{branding?.name}</p>
                <p className="truncate text-xs text-slate-500 font-medium">{branding?.tagline}</p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => (isMobileOpen ? onCloseMobile?.() : onToggle?.(!isOpen))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm focus:ring-2 focus:ring-brand-200"
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

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          {items.map((item) => renderItem(item))}
        </div>
      </nav>

      <div className="border-t border-slate-200/60 bg-slate-50/50 px-6 py-4">
        <div className={cn('rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 p-4 shadow-sm', { 'text-center': !isOpen })}>
          <p className="text-xs font-semibold text-slate-900">Workflow Insights</p>
          <p className={cn('mt-1 text-xs text-slate-600', { 'hidden': !isOpen })}>
            Keep your team aligned and projects moving forward.
          </p>
        </div>
      </div>
    </aside>
  )
}

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

export function Layout({ sidebar, header, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const stored = Storage.get(STORAGE_KEYS.SIDEBAR_STATE)
    if (typeof stored === 'boolean') {
      setSidebarOpen(stored)
    }
  }, [])

  useEffect(() => {
    Storage.set(STORAGE_KEYS.SIDEBAR_STATE, sidebarOpen)
  }, [sidebarOpen])

  const enhancedHeader = useMemo(() => {
    if (!header || !React.isValidElement(header)) {
      return header
    }
    return cloneElement(header as React.ReactElement<any>, {
      onToggleMobileMenu: () => setMobileOpen(true),
      commandItems: sidebar.items,
    })
  }, [header, sidebar.items])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-all duration-300 lg:hidden',
          {
            'opacity-100 pointer-events-auto': mobileOpen,
            'opacity-0 pointer-events-none': !mobileOpen,
          },
        )}
        onClick={() => setMobileOpen(false)}
      />

      <div className="relative flex min-h-screen">
        <Sidebar
          items={sidebar.items}
          branding={sidebar.branding}
          isOpen={sidebarOpen}
          isMobileOpen={mobileOpen}
          onToggle={setSidebarOpen}
          onCloseMobile={() => setMobileOpen(false)}
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
            <div className="mx-auto w-full max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8 xl:px-12">
              <Breadcrumbs items={sidebar.items} />
              <div className="mt-6">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
