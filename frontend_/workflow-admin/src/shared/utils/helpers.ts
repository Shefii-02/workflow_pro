type ClassValue =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | Record<string, boolean | undefined>
  | ClassValue[]

export function cn(...classes: ClassValue[]) {
  return classes
    .flatMap((item) => {
      if (!item && item !== 0 && item !== 0n) {
        return []
      }
      if (typeof item === 'string' || typeof item === 'number' || typeof item === 'bigint') {
        return [String(item)]
      }
      if (Array.isArray(item)) {
        return item
      }
      if (typeof item === 'object') {
        return Object.entries(item)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
      }
      return []
    })
    .join(' ')
}

export const Storage = {
  get(key: string) {
    if (typeof localStorage === 'undefined') return null
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  set(key: string, value: unknown) {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string) {
    if (typeof localStorage === 'undefined') return
    localStorage.removeItem(key)
  },
}
