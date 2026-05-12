import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logoutAsync, logout } from '../store/authSlice'
import { ROUTES } from '../shared/constants/routes'

export function useLogout() {
  const dispatch = useAppDispatch()
  const { refreshToken } = useAppSelector((state) => state.auth)

  const handleLogout = useCallback(async (force = false) => {
    try {
      if (refreshToken && !force) {
        // Try server logout first
        await dispatch(logoutAsync()).unwrap()
      }
    } catch (error) {
      console.warn('Server logout failed, clearing local session:', error)
    } finally {
      // Always clear local session
      dispatch(logout())

      // Clear any additional local storage items
      localStorage.removeItem('lastActivity')
      localStorage.removeItem('sessionWarningShown')

      // Redirect to login
      window.location.href = ROUTES.LOGIN
    }
  }, [dispatch, refreshToken])

  const forceLogout = useCallback(() => {
    handleLogout(true)
  }, [handleLogout])

  return { logout: handleLogout, forceLogout }
}
