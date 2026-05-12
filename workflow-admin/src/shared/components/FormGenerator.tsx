import * as React from 'react'
import { cn } from '../../shared/utils/helpers'
import { Button } from './Button'

export type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'datetime'
  | 'file'
  | 'switch'

export interface FormField {
  name: string
  label: string
  type: FormFieldType
  placeholder?: string
  required?: boolean
  disabled?: boolean
  description?: string
  options?: { label: string; value: string | number }[]
  validation?: {
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    pattern?: string
    custom?: (value: any) => string | null
  }
  layout?: {
    width?: 'full' | '1/2' | '1/3' | '1/4'
    className?: string
  }
}

export interface FormGeneratorProps {
  fields: FormField[]
  onSubmit: (data: Record<string, any>) => void | Promise<void>
  onChange?: (data: Record<string, any>) => void
  initialData?: Record<string, any>
  isLoading?: boolean
  submitText?: string
  cancelText?: string
  onCancel?: () => void
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function FormGenerator({
  fields,
  onSubmit,
  onChange,
  initialData = {},
  isLoading = false,
  submitText = 'Submit',
  cancelText = 'Cancel',
  onCancel,
  columns = 1,
  className,
}: FormGeneratorProps) {
  const [formData, setFormData] = React.useState<Record<string, any>>(initialData)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && (!value || value === '')) {
      return `${field.label} is required`
    }

    if (field.validation) {
      const { validation } = field

      if (validation.min !== undefined && value < validation.min) {
        return `${field.label} must be at least ${validation.min}`
      }

      if (validation.max !== undefined && value > validation.max) {
        return `${field.label} must be at most ${validation.max}`
      }

      if (validation.minLength !== undefined && String(value).length < validation.minLength) {
        return `${field.label} must be at least ${validation.minLength} characters`
      }

      if (validation.maxLength !== undefined && String(value).length > validation.maxLength) {
        return `${field.label} must be at most ${validation.maxLength} characters`
      }

      if (validation.pattern && !new RegExp(validation.pattern).test(String(value))) {
        return `${field.label} format is invalid`
      }

      if (validation.custom) {
        return validation.custom(value)
      }
    }

    return null
  }

  const handleFieldChange = (field: FormField, value: any) => {
    const newFormData = { ...formData, [field.name]: value }
    setFormData(newFormData)
    onChange?.(newFormData)

    // Validate field if it has been touched
    if (touched[field.name]) {
      const error = validateField(field, value)
      setErrors(prev => ({ ...prev, [field.name]: error || '' }))
    }
  }

  const handleFieldBlur = (field: FormField) => {
    setTouched(prev => ({ ...prev, [field.name]: true }))
    const error = validateField(field, formData[field.name])
    setErrors(prev => ({ ...prev, [field.name]: error || '' }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Validate all fields
    const newErrors: Record<string, string> = {}
    const newTouched: Record<string, boolean> = {}

    fields.forEach(field => {
      newTouched[field.name] = true
      const error = validateField(field, formData[field.name])
      if (error) {
        newErrors[field.name] = error
      }
    })

    setErrors(newErrors)
    setTouched(newTouched)

    // If no errors, submit
    if (Object.keys(newErrors).length === 0) {
      try {
        await onSubmit(formData)
      } catch (error) {
        console.error('Form submission error:', error)
      }
    }
  }

  const renderField = (field: FormField) => {
    const value = formData[field.name] || ''
    const error = errors[field.name]
    const isTouched = touched[field.name]

    const fieldClassName = cn(
      'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
      error && isTouched
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
        : 'border-slate-300 focus:ring-brand-500 focus:border-brand-500',
      field.disabled && 'bg-slate-50 cursor-not-allowed',
      field.layout?.className
    )

    const widthClass = {
      full: 'col-span-full',
      '1/2': 'col-span-1 sm:col-span-1',
      '1/3': 'col-span-1',
      '1/4': 'col-span-1 sm:col-span-2 lg:col-span-1',
    }[field.layout?.width || 'full']

    const fieldElement = (
      <div className={cn(widthClass)}>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {field.type === 'textarea' && (
          <textarea
            name={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            onBlur={() => handleFieldBlur(field)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={cn(fieldClassName, 'resize-none')}
            rows={4}
          />
        )}

        {field.type === 'select' && (
          <select
            name={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            onBlur={() => handleFieldBlur(field)}
            disabled={field.disabled}
            className={fieldClassName}
          >
            <option value="">{field.placeholder || 'Select...'}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {field.type === 'checkbox' && (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name={field.name}
              checked={Boolean(value)}
              onChange={(e) => handleFieldChange(field, e.target.checked)}
              onBlur={() => handleFieldBlur(field)}
              disabled={field.disabled}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-sm text-slate-700">{field.description}</span>
          </label>
        )}

        {field.type === 'switch' && (
          <label className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleFieldChange(field, !value)}
              disabled={field.disabled}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                value ? 'bg-brand-600' : 'bg-slate-200',
                field.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  value ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
            <span className="text-sm text-slate-700">{field.description}</span>
          </label>
        )}

        {(field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number' || field.type === 'date' || field.type === 'datetime') && (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            onBlur={() => handleFieldBlur(field)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={fieldClassName}
          />
        )}

        {field.description && field.type !== 'checkbox' && field.type !== 'switch' && (
          <p className="mt-1 text-sm text-slate-500">{field.description}</p>
        )}

        {error && isTouched && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )

    return fieldElement
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      <div className={cn(
        'grid gap-4',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      )}>
        {fields.map(field => renderField(field))}
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
        )}
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {submitText}
        </Button>
      </div>
    </form>
  )
}