/**
 * Get value from nested object properties using dot notation
 *
 * @param row - The object to extract value from
 * @param col - Column configuration with either 'key' (dot notation) or 'id' property
 * @returns The extracted value or undefined if not found
 */
export function getCellValue<T>(row: T, col: { key?: string; id?: string | keyof T }): any {
  if (col.key) {
    return col.key.split('.').reduce((acc: any, part: string) => acc && acc[part], row);
  }
  return row[col.id as keyof T];
}

/**
 * Get nested value from object using dot notation path
 *
 * @param obj - The object to extract value from
 * @param path - Dot notation path (e.g., 'user.profile.name')
 * @returns The extracted value or undefined if not found
 */
export function getNestedValue(obj: any, path: string): any {
  if (!path) return obj;
  return path.split('.').reduce((acc: any, part: string) => acc && acc[part], obj);
}
