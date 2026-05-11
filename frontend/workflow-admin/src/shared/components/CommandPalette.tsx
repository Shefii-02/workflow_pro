import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from './Card'
import type { SidebarItem } from '../types'

export interface CommandAction {
  id: string
  label: string
  description: string
  path: string
  icon: string | React.ReactNode
}

interface CommandPaletteProps {
  open: boolean
  items?: SidebarItem[]
  actions?: CommandAction[]
  onClose: () => void
}

const flattenCommands = (items: SidebarItem[], parentLabel?: string): CommandAction[] =>
  items.flatMap((item) => [
    {
      id: item.id,
      label: item.label,
      description: parentLabel ? `${parentLabel} · ${item.label}` : item.label,
      path: item.path,
      icon: item.icon,
    },
    ...(item.children ? flattenCommands(item.children, item.label) : []),
  ])

export function CommandPalette({ open, items = [], actions = [], onClose }: CommandPaletteProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const commands = useMemo(
    () => (actions.length ? actions : flattenCommands(items)),
    [actions, items],
  )
  const filteredCommands = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return commands
    }
    return commands.filter((command) =>
      `${command.label} ${command.description}`.toLowerCase().includes(normalized),
    )
  }, [commands, query])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4">
      <Card className="w-full max-w-2xl overflow-hidden border border-slate-200 bg-white p-0 shadow-elevated">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase text-slate-500">Command Palette</p>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search commands, pages, or actions..."
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>
        <div className="max-h-[480px] overflow-y-auto p-2">
          {filteredCommands.length ? (
            <div className="grid gap-1">
              {filteredCommands.map((command) => (
                <button
                  key={command.id}
                  onClick={() => {
                    navigate(command.path)
                    setQuery('')
                    onClose()
                  }}
                  className="w-full rounded-md px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3 text-slate-900">
                    <span className="text-base">{command.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold">{command.label}</p>
                      <p className="text-sm text-slate-500">{command.description}</p>
                    </div>
                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center">
              <svg className="mx-auto h-9 w-9 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="mt-4 text-sm text-slate-500">No commands found. Try another search term.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
