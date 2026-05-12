export function normalizeAccessList<T>(value: T | readonly T[]): readonly T[] {
  return Array.isArray(value) ? (value as readonly T[]) : [value as T]
}

export function hasRequiredAccess<T>(
  ownedValues: readonly T[],
  requiredValues: readonly T[],
  requireAll = true,
) {
  if (requiredValues.length === 0) {
    return true
  }

  return requireAll
    ? requiredValues.every((value) => ownedValues.includes(value))
    : requiredValues.some((value) => ownedValues.includes(value))
}

export function hasAllowedAccess<T>(currentValue: T | undefined, allowedValues: readonly T[]) {
  if (!currentValue) {
    return false
  }

  return allowedValues.includes(currentValue)
}
