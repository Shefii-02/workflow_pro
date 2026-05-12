import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { apiCache, type ApiCacheOptions } from '../services/api-cache'

interface CachedApiQueryOptions<T> extends ApiCacheOptions {
  enabled?: boolean
  initialData?: T
}

interface CachedApiQueryState<T> {
  data: T | undefined
  error: unknown
  isLoading: boolean
  isFetching: boolean
}

export function useCachedApiQuery<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  options: CachedApiQueryOptions<T> = {},
) {
  const { enabled = true, initialData, ttlMs } = options
  const fetcherRef = useRef(fetcher)
  const mountedRef = useRef(false)
  fetcherRef.current = fetcher

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const cachedData = useMemo(() => apiCache.get<T>(cacheKey), [cacheKey])
  const [state, setState] = useState<CachedApiQueryState<T>>({
    data: cachedData ?? initialData,
    error: null,
    isLoading: enabled && cachedData === undefined && initialData === undefined,
    isFetching: false,
  })

  const refetch = useCallback(async ({ force = false }: { force?: boolean } = {}) => {
    const cached = force ? undefined : apiCache.get<T>(cacheKey)
    if (cached !== undefined) {
      if (mountedRef.current) {
        setState({
          data: cached,
          error: null,
          isLoading: false,
          isFetching: false,
        })
      }
      return cached
    }

    if (mountedRef.current) {
      setState((current) => ({
        ...current,
        error: null,
        isLoading: current.data === undefined,
        isFetching: true,
      }))
    }

    try {
      const data = await fetcherRef.current()
      apiCache.set(cacheKey, data, { ttlMs })
      if (mountedRef.current) {
        setState({
          data,
          error: null,
          isLoading: false,
          isFetching: false,
        })
      }
      return data
    } catch (error) {
      if (mountedRef.current) {
        setState((current) => ({
          ...current,
          error,
          isLoading: false,
          isFetching: false,
        }))
      }
      throw error
    }
  }, [cacheKey, ttlMs])

  useEffect(() => {
    if (!enabled) {
      return
    }

    refetch().catch(() => undefined)
  }, [enabled, refetch])

  const invalidate = useCallback(() => {
    apiCache.invalidate(cacheKey)
  }, [cacheKey])

  return {
    ...state,
    refetch,
    invalidate,
  }
}
