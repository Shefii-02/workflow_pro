import * as React from 'react'
import { ReusableModal } from './ReusableModal'
import { Button } from './Button'

export interface ConfirmActionDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  onCancel?: () => void
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'default'
  isLoading?: boolean
  children?: React.ReactNode
}

const variantConfig = {
  danger: {
    confirmButton: 'danger' as const,
    icon: '⚠️',
  },
  warning: {
    confirmButton: 'secondary' as const,
    icon: '⚠️',
  },
  default: {
    confirmButton: 'primary' as const,
    icon: 'ℹ️',
  },
}

export function ConfirmActionDialog({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
  children,
}: ConfirmActionDialogProps) {
  const config = variantConfig[variant]

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      variant={variant}
      actions={
        <>
          <Button variant="secondary" onClick={onCancel || onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={config.confirmButton}
            onClick={handleConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="text-center">
        <div className="text-4xl mb-4">{config.icon}</div>
        {children && <div className="mb-4">{children}</div>}
        {description && (
          <p className="text-slate-600">{description}</p>
        )}
      </div>
    </ReusableModal>
  )
}

// Hook for confirmation dialogs
export function useConfirmDialog() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [config, setConfig] = React.useState<Partial<ConfirmActionDialogProps>>({})

  const confirm = (dialogConfig: Omit<ConfirmActionDialogProps, 'isOpen' | 'onClose'>) => {
    return new Promise<boolean>((resolve) => {
      setConfig({
        ...dialogConfig,
        onConfirm: () => {
          dialogConfig.onConfirm()
          resolve(true)
        },
      })
      setIsOpen(true)
    })
  }

  const close = () => {
    setIsOpen(false)
    setConfig({})
  }

  return {
    confirm,
    dialog: (
      <ConfirmActionDialog
        {...(config as ConfirmActionDialogProps)}
        isOpen={isOpen}
        onClose={close}
      />
    ),
  }
}