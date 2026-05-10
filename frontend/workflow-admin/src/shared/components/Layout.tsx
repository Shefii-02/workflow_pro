import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { cn } from '../../shared/utils/helpers'
import type { SidebarItem } from '../../shared/types'

interface SidebarProps {
  items: SidebarItem[]
  branding?: {
    logo?: React.ReactNode
    name: string
    tagline?: string
  }
  isOpen?: boolean
  onToggle?: (open: boolean) => void
}

export function Sidebar({ items, branding, isOpen = true, onToggle }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const renderItem = (item: SidebarItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const expanded = expandedItems.includes(item.id)
    const active = isActive(item.path)

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id)
            } else {
              navigate(item.path)
            }
          }}
          className={cn(
            'w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between gap-2',
            {
              'bg-brand-100 text-brand-900': active && !hasChildren,
              'text-gray-700 hover:bg-gray-100': !active,
              'pl-6': level > 0,
            },
          )}
        >
          <span className="flex items-center gap-3 flex-1">
            {item.icon && <span className="text-lg">{item.icon}</span>}
            <span className={cn({ hidden: !isOpen })}>{item.label}</span>
          </span>
          {hasChildren && (
            <span className={cn('transition-transform', { 'rotate-180': expanded, hidden: !isOpen })}>
              ▼
            </span>
          )}
          {item.badge && !isOpen && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {item.badge}
            </span>
          )}
        </button>

        {hasChildren && expanded && (
          <div className="space-y-1">
            {item.children?.map((child) => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 overflow-y-auto',
        {
          'w-64': isOpen,
          'w-20': !isOpen,
        },
      )}
    >
      {/* Branding */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 bg-white">
        {branding && (
          <div className={cn('flex items-center gap-3', { 'justify-center': !isOpen })}>
            {branding.logo}
            {isOpen && (
              <div>
                <div className="font-bold text-gray-900">{branding.name}</div>
                {branding.tagline && <div className="text-xs text-gray-600">{branding.tagline}</div>}
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => onToggle?.(!isOpen)}
          className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100 transition-colors"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 p-4">
        {items.map((item) => renderItem(item))}
      </nav>
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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        items={sidebar.items}
        branding={sidebar.branding}
        isOpen={sidebarOpen}
        onToggle={setSidebarOpen}
      />

      <main className={cn('flex-1 flex flex-col transition-all duration-300', {
        'ml-64': sidebarOpen,
        'ml-20': !sidebarOpen,
      })}>
        {header && <div className="border-b border-gray-200 bg-white">{header}</div>}

        <div className="flex-1 overflow-y-auto">
          <div className="p-8">{children}</div>
        </div>
      </main>
    </div>
  )
}
