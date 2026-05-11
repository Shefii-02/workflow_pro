import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { logout } from '../../app/store/authSlice'
import { Card } from './Card'
import { CommandPalette } from './CommandPalette'
import { useTheme } from '../theme/useTheme'
import { Bell, ChevronDown, Command, LogOut, Menu, Search, Settings, Sun, Moon, User as UserIcon } from 'lucide-react'
import type { SidebarItem } from '../types'

interface TopHeaderProps {
  commandItems?: SidebarItem[]
  onToggleMobileMenu?: () => void
}

interface CommandItem {
  id: string
  label: string
  description: string
  path: string
  icon: string | React.ReactNode
}

const flattenCommandItems = (items: SidebarItem[], parent?: string): CommandItem[] =>
  items.flatMap((item) => [
    {
      id: item.id,
      label: item.label,
      description: parent ? `${parent} · ${item.label}` : item.label,
      path: item.path,
      icon: item.icon,
    },
    ...(item.children ? flattenCommandItems(item.children, item.label) : []),
  ])

export function TopHeader({ commandItems = [], onToggleMobileMenu }: TopHeaderProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const commands = useMemo(() => {
    if (commandItems.length) {
      return flattenCommandItems(commandItems)
    }
    return [
      { id: 'dashboard', label: 'View dashboard', description: 'Open your dashboard', path: '/sp/dashboard', icon: '📊' },
      { id: 'projects', label: 'View projects', description: 'Open project management', path: '/company/projects', icon: '📂' },
      { id: 'settings', label: 'Open settings', description: 'Manage your workspace settings', path: '/company/settings', icon: '⚙️' },
    ]
  }, [commandItems])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen(true)
      }
      if (event.key === 'Escape') {
        setShowDropdown(false)
        setShowNotifications(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="px-4 py-3 sm:px-5 lg:px-6">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-950 lg:hidden"
          >
            <Menu size={16} />
          </button>

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="hidden h-9 flex-1 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 transition-colors hover:border-slate-300 hover:bg-white focus:ring-2 focus:ring-brand-100 md:flex"
          >
            <Search size={16} />
            <span className="flex-1 text-left">Search commands, pages, or actions...</span>
            <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
              ⌘K
            </span>
          </button>

          <div className="flex-1 md:hidden">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="flex h-9 w-full items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 transition-colors hover:border-slate-300 hover:bg-white"
            >
              <Search size={16} />
              <span className="flex-1 text-left">Search</span>
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-950"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications((current) => !current)}
              className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-950"
            >
              <Bell size={16} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-semibold text-white ring-2 ring-white">
                3
              </span>
            </button>

            {showNotifications && (
              <Card className="absolute right-0 top-11 w-80 overflow-hidden border border-slate-200 bg-white p-0 shadow-elevated">
                <div className="border-b border-slate-200 bg-slate-50 px-3 py-2.5">
                  <p className="text-sm font-semibold text-slate-900">Notifications</p>
                  <p className="text-xs text-slate-500">You have 3 unread notifications</p>
                </div>
                <div className="max-h-80 divide-y divide-slate-200 overflow-y-auto bg-white">
                  {[
                    { icon: '📝', title: 'New task assigned', description: 'Design team updated the milestone', time: '2 min ago', unread: true },
                    { icon: '✅', title: 'Invoice paid', description: 'Payment received from Acme Corp', time: '1 hour ago', unread: true },
                    { icon: '💬', title: 'Mentions', description: 'You were mentioned in marketing chat', time: '3 hours ago', unread: false },
                  ].map((notif, idx) => (
                    <button key={idx} className="w-full px-3 py-3 text-left transition-colors hover:bg-slate-50">
                      <div className="flex gap-2.5">
                        <div className="mt-0.5 text-base">{notif.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <p className="text-sm font-medium text-slate-900">{notif.title}</p>
                            {notif.unread && <div className="h-2 w-2 rounded-full bg-brand-500"></div>}
                          </div>
                          <p className="mt-1 text-xs text-slate-500">{notif.description}</p>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">{notif.time}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="border-t border-slate-200 bg-slate-50 px-3 py-2.5">
                  <button className="w-full text-center text-sm font-medium text-brand-600 hover:text-brand-700">
                    View all notifications
                  </button>
                </div>
              </Card>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown((current) => !current)}
              className="inline-flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-950 text-xs font-semibold text-white">
                {user?.name
                  .split(' ')
                  .map((segment) => segment[0])
                  .join('')}
              </div>
              <div className="hidden items-start text-left sm:flex">
                <span className="block text-sm font-semibold text-slate-900">{user?.name}</span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-slate-500">{user?.role || 'Admin'}</span>
              </div>
              <ChevronDown size={14} className="text-slate-500" />
            </button>

            {showDropdown && (
              <Card className="absolute right-0 top-11 w-64 overflow-hidden border border-slate-200 bg-white p-0 shadow-elevated">
                <div className="border-b border-slate-200 px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-950 text-xs font-semibold text-white">
                      {user?.name
                        .split(' ')
                        .map((segment) => segment[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 bg-white p-1.5">
                  <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50/80">
                    <UserIcon size={16} /> Profile Settings
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50/80">
                    <Settings size={16} /> Workspace Settings
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50/80">
                    <Command size={16} /> Keyboard Shortcuts
                  </button>
                  <div className="border-t border-slate-200/60 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-rose-600 transition hover:bg-rose-50/80"
                    >
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <CommandPalette
        open={paletteOpen}
        actions={commands}
        onClose={() => setPaletteOpen(false)}
      />
    </header>
  )
}
