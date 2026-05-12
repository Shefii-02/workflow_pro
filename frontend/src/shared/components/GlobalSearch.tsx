import * as React from 'react'
import { cn } from '../../shared/utils/helpers'

export interface SearchResult {
  id: string
  title: string
  description?: string
  type: string
  url?: string
  icon?: React.ReactNode
  category?: string
}

export interface GlobalSearchProps {
  placeholder?: string
  onSearch: (query: string) => Promise<SearchResult[]>
  onResultSelect?: (result: SearchResult) => void
  debounceMs?: number
  maxResults?: number
  showKeyboardShortcut?: boolean
  className?: string
}

export function GlobalSearch({
  placeholder = 'Search...',
  onSearch,
  onResultSelect,
  debounceMs = 300,
  maxResults = 10,
  showKeyboardShortcut = true,
  className,
}: GlobalSearchProps) {
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)

  const searchRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const debounceRef = React.useRef<number | null>(null)

  // Debounced search
  React.useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (query.trim()) {
      setIsLoading(true)
      debounceRef.current = setTimeout(async () => {
        try {
          const searchResults = await onSearch(query)
          setResults(searchResults.slice(0, maxResults))
          setSelectedIndex(-1)
        } catch (error) {
          console.error('Search error:', error)
          setResults([])
        } finally {
          setIsLoading(false)
        }
      }, debounceMs)
    } else {
      setResults([])
      setIsLoading(false)
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query, onSearch, debounceMs, maxResults])

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
          break
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, -1))
          break
        case 'Enter':
          event.preventDefault()
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultSelect(results[selectedIndex])
          }
          break
        case 'Escape':
          event.preventDefault()
          setIsOpen(false)
          setQuery('')
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, results])

  // Click outside to close
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleResultSelect = (result: SearchResult) => {
    onResultSelect?.(result)
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setIsOpen(true)
  }

  return (
    <div ref={searchRef} className={cn('relative', className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          🔍
        </div>
        {showKeyboardShortcut && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <kbd className="px-2 py-1 text-xs bg-slate-100 rounded text-slate-600">
              ⌘K
            </kbd>
          </div>
        )}
      </div>

      {isOpen && (query || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center text-slate-500">
              Searching...
            </div>
          )}

          {!isLoading && results.length === 0 && query && (
            <div className="p-4 text-center text-slate-500">
              No results found for "{query}"
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultSelect(result)}
                  className={cn(
                    'w-full px-4 py-3 text-left hover:bg-slate-50 flex items-start gap-3',
                    index === selectedIndex && 'bg-slate-50',
                  )}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {result.icon || '📄'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-slate-900 truncate">
                      {result.title}
                    </div>
                    {result.description && (
                      <div className="text-sm text-slate-600 truncate">
                        {result.description}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 uppercase tracking-wider">
                        {result.type}
                      </span>
                      {result.category && (
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {result.category}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Hook for global search with keyboard shortcut
export function useGlobalSearch() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return {
    isSearchOpen,
    setIsSearchOpen,
  }
}