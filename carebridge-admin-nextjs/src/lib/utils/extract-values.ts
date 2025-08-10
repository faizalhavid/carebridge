/**
 * Helper function to extract all values from nested objects recursively
 * Prevents circular references and handles arrays and objects
 *
 * @param obj - The object to extract values from
 * @param visited - Set to track visited objects (prevents circular references)
 * @returns A string containing all extracted values separated by spaces
 */
export function extractAllValues(obj: any, visited = new Set()): string {
  if (obj === null || obj === undefined) return '';

  // Prevent circular references
  if (visited.has(obj)) return '';
  visited.add(obj);

  const values: string[] = [];

  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      // Handle arrays
      obj.forEach((item) => {
        values.push(extractAllValues(item, visited));
      });
    } else {
      // Handle objects - extract all property values recursively
      Object.values(obj).forEach((value) => {
        if (typeof value === 'string' || typeof value === 'number') {
          values.push(String(value));
        } else if (typeof value === 'object') {
          values.push(extractAllValues(value, visited));
        }
      });
    }
  } else {
    values.push(String(obj));
  }

  return values.filter((v) => v.trim()).join(' ');
}
