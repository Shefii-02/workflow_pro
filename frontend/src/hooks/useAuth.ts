import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { refreshTokenAsync, checkTokenExpiry, logout } from '../store/authSlice'

export function useTokenRefresh() {
  const dispatch = useAppDispatch()
  const { tokenExpiry, isRefreshing, refreshToken } = useAppSelector((state) => state.auth)
  const refreshTimeoutRef = useRef<number | null>(null)
  const checkIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    // Set up periodic token expiry checking
    checkIntervalRef.current = setInterval(() => {
      dispatch(checkTokenExpiry())
    }, 60000) // Check every minute

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current)
      }
    }
  }, [dispatch])

  useEffect(() => {
    if (tokenExpiry && refreshToken && !isRefreshing) {
      const now = Date.now()
      const timeUntilExpiry = tokenExpiry - now

      // If token expires in less than 5 minutes, refresh it
      if (timeUntilExpiry <= 300000 && timeUntilExpiry > 0) {
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current)
        }

        refreshTimeoutRef.current = setTimeout(() => {
          dispatch(refreshTokenAsync())
        }, Math.max(timeUntilExpiry - 60000, 0)) // Refresh 1 minute before expiry
      }
    }
  }, [tokenExpiry, refreshToken, isRefreshing, dispatch])

  return { isRefreshing }
}

export function useSessionExpiry() {
  const dispatch = useAppDispatch()
  const { refreshTokenExpiry } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (refreshTokenExpiry) {
      const now = Date.now()
      const timeUntilExpiry = refreshTokenExpiry - now

      if (timeUntilExpiry <= 0) {
        // Refresh token has expired, logout user
        dispatch(logout())
      } else if (timeUntilExpiry <= 3600000) { // Less than 1 hour
        // Show warning about upcoming session expiry
        const warningTimeout = setTimeout(() => {
          // You could dispatch an action to show a warning modal here
          console.warn('Your session will expire soon. Please save your work.')
        }, timeUntilExpiry - 300000) // Warn 5 minutes before expiry

        return () => clearTimeout(warningTimeout)
      }
    }
  }, [refreshTokenExpiry, dispatch])
}