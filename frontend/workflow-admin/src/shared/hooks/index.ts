import { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/store/hooks'
import type { Permission, AccountType } from '../types'
export { useCachedApiQuery } from './useCachedApiQuery'

// Use Auth
export function useAuth() {
  const auth = useAppSelector((state) => state.auth)

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    token: auth.token,
    status: auth.status,
    error: auth.error,
  }
}

// Use permissions
export function usePermissions() {
  const auth = useAppSelector((state) => state.auth)

  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      if (!auth.user) return false
      return auth.user.permissions.includes(permission)
    },
    [auth.user],
  )

  const hasAnyPermission = useCallback(
    (permissions: Permission[]): boolean => {
      const user = auth.user
      if (!user) return false
      return permissions.some((p) => user.permissions.includes(p))
    },
    [auth.user],
  )

  const hasAllPermissions = useCallback(
    (permissions: Permission[]): boolean => {
      const user = auth.user
      if (!user) return false
      return permissions.every((p) => user.permissions.includes(p))
    },
    [auth.user],
  )

  return { hasPermission, hasAnyPermission, hasAllPermissions }
}

// Use account type
export function useAccountType() {
  const auth = useAppSelector((state) => state.auth)

  const isAccountType = useCallback(
    (type: AccountType): boolean => {
      return auth.user?.accountType === type
    },
    [auth.user],
  )

  return {
    accountType: auth.user?.accountType,
    isAccountType,
  }
}

// Use required auth
export function useRequireAuth() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return isAuthenticated
}

// Use debounce
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// Use local storage
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch {
      // Handle error
    }
  }

  return [storedValue, setValue]
}

// Use toggle
export function useToggle(initialValue: boolean = false): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  const setValueDirect = useCallback((val: boolean) => {
    setValue(val)
  }, [])

  return [value, toggle, setValueDirect]
}

export function useStableCallback<TArgs extends unknown[], TResult>(
  callback: (...args: TArgs) => TResult,
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useCallback((...args: TArgs) => callbackRef.current(...args), [])
}

// Use async
export function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true,
): {
  status: 'idle' | 'pending' | 'success' | 'error'
  value: T | null
  error: E | null
} {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  const execute = useCallback(async () => {
    setStatus('pending')
    setValue(null)
    setError(null)

    try {
      const response = await asyncFunction()
      setValue(response)
      setStatus('success')
      return response
    } catch (err) {
      setError(err as E)
      setStatus('error')
      throw err
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { status, value, error }
}

// Use previous
export function usePrevious<T>(value: T): T | undefined {
  const [prev, setPrev] = useState<T | undefined>()

  useEffect(() => {
    setPrev(value)
  }, [value])

  return prev
}

// Use click outside
export function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [callback, ref])
}

// Use mount effect
export function useMountEffect(fn: () => void | (() => void)) {
  useEffect(fn, [])
}

// Use unmount effect
export function useUnmountEffect(fn: () => void) {
  useEffect(() => fn, [])
}
