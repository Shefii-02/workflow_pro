// Class Merging Utility
export function cn(
  ...classes: Array<string | number | bigint | false | undefined | null | Record<string, boolean>>
): string {
  return classes
    .flatMap((value) => {
      if (typeof value === 'string' || typeof value === 'number' || value === false || value === undefined || value === null) {
        return value ? [value] : []
      }

      return Object.entries(value)
        .filter(([, active]) => active)
        .map(([className]) => className)
    })
    .filter(Boolean)
    .join(' ')
}

// Format Date
export function formatDate(date: string | Date, format: 'short' | 'long' | 'full' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date

  const formats = {
    short: new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(d),
    long: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(d),
    full: new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d),
  }

  return formats[format]
}

// Format Time
export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(d)
}

// Format Currency
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

// Format Number
export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(num)
}

// Format Percentage
export function formatPercentage(num: number): string {
  return `${(num * 100).toFixed(1)}%`
}

// Truncate Text
export function truncateText(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + '...' : text
}

// Get Initials
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Validate Email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Debounce
export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number,
): (...args: TArgs) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (...args: TArgs) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Throttle
export function throttle<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  limit: number,
): (...args: TArgs) => void {
  let lastRun = 0
  return function (...args: TArgs) {
    const now = Date.now()
    if (now - lastRun >= limit) {
      fn(...args)
      lastRun = now
    }
  }
}

// Sleep (for testing/delays)
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Generate UUID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Check if value is empty
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

// Deep clone
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// Group array by key
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce(
    (acc, item) => {
      const group = String(item[key])
      if (!acc[group]) acc[group] = []
      acc[group].push(item)
      return acc
    },
    {} as Record<string, T[]>,
  )
}

// Flatten array
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), [])
}

// Remove duplicates
export function unique<T>(arr: T[], key?: keyof T): T[] {
  if (!key) return [...new Set(arr)]
  return Array.from(new Map(arr.map((item) => [item[key], item])).values())
}

// Sort array
export function sortBy<T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  const sorted = [...arr].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
  return sorted
}

// Filter by multiple conditions
export function filterBy<T>(arr: T[], conditions: Partial<T>): T[] {
  return arr.filter((item) => {
    return Object.entries(conditions).every(([key, value]) => item[key as keyof T] === value)
  })
}

// Storage utilities
export const Storage = {
  get: <T = unknown>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Handle storage quota exceeded
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch {
      // Handle removal errors
    }
  },
  clear: () => {
    try {
      localStorage.clear()
    } catch {
      // Handle clear errors
    }
  },
}
