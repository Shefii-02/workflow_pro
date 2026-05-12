export interface ApiCacheEntry<T> {
  data: T
  createdAt: number
  expiresAt: number
}

export interface ApiCacheOptions {
  ttlMs?: number
}

const DEFAULT_TTL_MS = 5 * 60 * 1000

class ApiCache {
  private cache = new Map<string, ApiCacheEntry<unknown>>()

  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key)

    if (!entry) {
      return undefined
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return undefined
    }

    return entry.data as T
  }

  set<T>(key: string, data: T, options: ApiCacheOptions = {}) {
    const ttlMs = options.ttlMs ?? DEFAULT_TTL_MS
    const createdAt = Date.now()

    this.cache.set(key, {
      data,
      createdAt,
      expiresAt: createdAt + ttlMs,
    })

    return data
  }

  has(key: string) {
    return this.get(key) !== undefined
  }

  invalidate(keyOrPrefix?: string) {
    if (!keyOrPrefix) {
      this.cache.clear()
      return
    }

    for (const key of this.cache.keys()) {
      if (key === keyOrPrefix || key.startsWith(keyOrPrefix)) {
        this.cache.delete(key)
      }
    }
  }
}

export const apiCache = new ApiCache()

export const createApiCacheKey = (resource: string, params?: unknown) => {
  if (!params) {
    return resource
  }

  return `${resource}:${JSON.stringify(params, Object.keys(params as Record<string, unknown>).sort())}`
}
