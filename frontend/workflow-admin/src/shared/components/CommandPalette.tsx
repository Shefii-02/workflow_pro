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
      setQuery('')
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
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl overflow-hidden border border-slate-200/80 shadow-2xl bg-white/95 backdrop-blur-xl">
        <div className="border-b border-slate-200/60 bg-slate-50/80 px-6 py-4 backdrop-blur-sm">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.15em] text-slate-500 font-semibold">Command Palette</p>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search commands, pages, or actions..."
              className="w-full rounded-xl border border-slate-200/60 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-200 backdrop-blur-sm"
            />
          </div>
        </div>
        <div className="max-h-[480px] overflow-y-auto p-4">
          {filteredCommands.length ? (
            <div className="grid gap-2">
              {filteredCommands.map((command) => (
                <button
                  key={command.id}
                  onClick={() => {
                    navigate(command.path)
                    onClose()
                  }}
                  className="w-full rounded-xl border border-slate-200/60 bg-white/80 px-4 py-3 text-left transition-all hover:border-brand-300 hover:bg-brand-50/80 hover:shadow-sm backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4 text-slate-900">
                    <span className="text-xl">{command.icon}</span>
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
            <div className="rounded-xl border border-dashed border-slate-200/60 bg-slate-50/50 px-6 py-12 text-center backdrop-blur-sm">
              <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
