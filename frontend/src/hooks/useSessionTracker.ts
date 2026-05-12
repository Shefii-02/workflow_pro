import { useEffect, useRef } from 'react'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/authSlice'

interface SessionTrackerOptions {
  timeoutMinutes?: number
  warningMinutes?: number
  onWarning?: () => void
  onTimeout?: () => void
}

export function useSessionTracker(options: SessionTrackerOptions = {}) {
  const {
    timeoutMinutes = parseInt(import.meta.env.VITE_SESSION_TIMEOUT_MINUTES || '60'),
    warningMinutes = parseInt(import.meta.env.VITE_SESSION_WARNING_MINUTES || '5'),
    onWarning,
    onTimeout,
  } = options

  const dispatch = useAppDispatch()
  const timeoutRef = useRef<number | null>(null)
  const warningRef = useRef<number | null>(null)
  const lastActivityRef = useRef<number>(Date.now())

  const resetTimer = () => {
    const now = Date.now()
    lastActivityRef.current = now

    // Clear existing timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (warningRef.current) clearTimeout(warningRef.current)

    // Set warning timer
    const warningTime = (timeoutMinutes - warningMinutes) * 60 * 1000
    warningRef.current = setTimeout(() => {
      onWarning?.()
    }, warningTime)

    // Set logout timer
    const timeoutTime = timeoutMinutes * 60 * 1000
    timeoutRef.current = setTimeout(() => {
      onTimeout?.()
      dispatch(logout())
    }, timeoutTime)

    // Store last activity in localStorage
    localStorage.setItem('lastActivity', now.toString())
  }

  const updateActivity = () => {
    resetTimer()
  }

  useEffect(() => {
    // Load last activity from localStorage
    const storedActivity = localStorage.getItem('lastActivity')
    if (storedActivity) {
      const lastActivity = parseInt(storedActivity)
      const now = Date.now()
      const timeSinceActivity = now - lastActivity
      const timeoutMs = timeoutMinutes * 60 * 1000

      if (timeSinceActivity >= timeoutMs) {
        // Session already expired
        dispatch(logout())
        return
      }
    }

    // Set up event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

    const handleActivity = () => updateActivity()

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })

    // Start the timer
    resetTimer()

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (warningRef.current) clearTimeout(warningRef.current)
    }
  }, [dispatch, timeoutMinutes, warningMinutes])

  return { updateActivity, resetTimer }
}