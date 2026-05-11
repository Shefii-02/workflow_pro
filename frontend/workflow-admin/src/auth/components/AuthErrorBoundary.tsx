import * as React from 'react'
import { useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/authSlice'
import { ErrorBoundary } from '../../shared/components/ErrorBoundary'

interface ErrorInfo {
  message?: string
}

interface FallbackProps {
  error?: Error | ErrorInfo
  retry?: () => void
}

interface AuthErrorBoundaryProps {
  children: React.ReactNode
  onAuthError?: () => void
}

export function AuthErrorBoundary({ children, onAuthError }: AuthErrorBoundaryProps) {
  const dispatch = useAppDispatch()

  const handleAuthError = React.useCallback(() => {
    dispatch(logout())
    onAuthError?.()
  }, [dispatch, onAuthError])

  return (
    <ErrorBoundary
      fallback={({ error, retry }: FallbackProps) => {
        // Check if it's an authentication error
        const errorMessage = (error as any)?.message || ''
        const isAuthError = errorMessage.includes('401') ||
                           errorMessage.includes('Unauthorized') ||
                           errorMessage.includes('Token expired')

        if (isAuthError) {
          handleAuthError()
          return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
              <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-6xl mb-4">🔐</div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Session Expired
                </h2>
                <p className="text-slate-600 mb-4">
                  Your session has expired. Please log in again to continue.
                </p>
                <button
                  onClick={handleAuthError}
                  className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors"
                >
                  Go to Login
                </button>
              </div>
            </div>
          )
        }

        // For other errors, show the default error boundary
        return (
          <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Something went wrong
              </h2>
              <p className="text-slate-600 mb-4">
                {errorMessage || 'An unexpected error occurred'}
              </p>
              <button
                onClick={retry}
                className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

export default AuthErrorBoundary