import * as React from 'react'
import { Button } from './Button'
import { Card } from './Card'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; retry?: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })
    this.props.onError?.(error, errorInfo)

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} retry={this.handleRetry} />
      }

      return (
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-lg font-semibold text-slate-950 mb-2">Something went wrong</h2>
            <p className="text-slate-600">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
          </div>

          {this.state.error && import.meta.env.DEV && (
            <details className="mb-6 text-left bg-slate-50 p-4 rounded-lg">
              <summary className="cursor-pointer font-medium text-slate-700 mb-2">
                Error Details (Development)
              </summary>
              <pre className="text-xs text-slate-600 whitespace-pre-wrap">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}

          <div className="flex gap-3 justify-center">
            <Button onClick={this.handleRetry} variant="primary">
              Try Again
            </Button>
            <Button onClick={() => window.location.reload()} variant="secondary">
              Refresh Page
            </Button>
          </div>
        </Card>
      )
    }

    return this.props.children
  }
}

// Hook version for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: { componentStack?: string }) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo)

    // You can integrate with error reporting services here
    // Example: Sentry.captureException(error)
  }
}