export function createComparator<T>(
    orderBy: keyof T,
    order: 'asc' | 'desc' = 'asc'
): (a: T, b: T) => number {
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