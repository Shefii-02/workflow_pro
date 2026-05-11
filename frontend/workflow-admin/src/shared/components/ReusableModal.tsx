import * as React from 'react'
import { cn } from '../../shared/utils/helpers'

export interface ReusableModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  variant?: 'default' | 'danger' | 'success' | 'warning'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  footer?: React.ReactNode
  actions?: React.ReactNode
}

const sizeStyles = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
}

const variantStyles = {
  default: 'border-slate-200',
  danger: 'border-rose-200',
  success: 'border-emerald-200',
  warning: 'border-amber-200',
}

export function ReusableModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  variant = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  footer,
  actions,
}: ReusableModalProps) {
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeOnEscape, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-white rounded-3xl shadow-2xl border max-h-[90vh] overflow-hidden',
          sizeStyles[size],
          variantStyles[variant],
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-6 border-b border-slate-200">
            <div className="min-w-0">
              {title && (
                <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-slate-600 mt-1">{description}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 transition-colors"
              >
                <span className="text-slate-400 text-xl">×</span>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {children}
        </div>

        {/* Footer */}
        {(footer || actions) && (
          <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
            <div>{footer}</div>
            <div className="flex gap-3">
              {actions}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Modal trigger hook
export function useModal() {
  const [isOpen, setIsOpen] = React.useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(prev => !prev)

  return { isOpen, open, close, toggle }
}