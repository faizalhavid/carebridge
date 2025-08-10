import { getNestedValue } from './get-nested-value';

export function createComparator<T>(orderBy: keyof T, order: 'asc' | 'desc' = 'asc'): (a: T, b: T) => number {
  return (a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  };
}

/**
 * Enhanced comparator that handles nested properties using dot notation
 * Supports sorting by nested object properties like 'user.profile.name'
 *
 * @param orderBy - The property path to sort by (supports dot notation)
 * @param order - Sort order ('asc' or 'desc')
 * @returns Comparator function for sorting
 */
export function createNestedComparator<T>(orderBy: string, order: 'asc' | 'desc' = 'asc'): (a: T, b: T) => number {
  return (a: T, b: T) => {
    const aValue = getNestedValue(a, orderBy);
    const bValue = getNestedValue(b, orderBy);

    // Handle null/undefined values
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    // Convert to string for comparison if needed
    const aComp = typeof aValue === 'object' ? String(aValue) : aValue;
    const bComp = typeof bValue === 'object' ? String(bValue) : bValue;

    if (aComp < bComp) return order === 'asc' ? -1 : 1;
    if (aComp > bComp) return order === 'asc' ? 1 : -1;
    return 0;
  };
}
