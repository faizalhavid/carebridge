import { extractAllValues } from './extract-values';
import { getCellValue } from './get-nested-value';

/**
 * Interface for search chips representing key:value pairs
 */
export interface SearchChip {
  key: string;
  value: string;
}

/**
 * Result interface for parsed search input
 */
export interface ParsedSearchInput {
  chips: SearchChip[];
  remainingText: string;
}

/**
 * Options for configuring search input parsing
 */
export interface ParseSearchOptions {
  /** Custom regex pattern for matching key:value pairs. Default: /(\w+):([^\s]+)/g */
  pattern?: RegExp;
  /** Whether to trim whitespace from results. Default: true */
  trimResults?: boolean;
  /** Whether to allow duplicate keys in chips. Default: false */
  allowDuplicateKeys?: boolean;
}

/**
 * Parse search input for key:value patterns and extract chips
 *
 * @param input - The search input string to parse
 * @param options - Configuration options for parsing
 * @returns Object containing extracted chips and remaining text
 *
 * @example
 * ```typescript
 * // Basic usage
 * const result = parseSearchInput("user:john status:active some text");
 * // result: { chips: [{ key: "user", value: "john" }, { key: "status", value: "active" }], remainingText: "some text" }
 *
 * // Custom pattern for different formats
 * const customResult = parseSearchInput("user='john doe' status='active'", {
 *   pattern: /(\w+)='([^']+)'/g
 * });
 * ```
 */
export function parseSearchInput(input: string, options: ParseSearchOptions = {}): ParsedSearchInput {
  const { pattern = /(\w+):([^\s]+)/g, trimResults = true, allowDuplicateKeys = false } = options;

  // Reset regex lastIndex to ensure fresh matching
  pattern.lastIndex = 0;

  const matches = Array.from(input.matchAll(pattern));
  const chips: SearchChip[] = [];
  let remainingText = input;

  matches.forEach((match) => {
    const [fullMatch, key, value] = match;

    const processedKey = trimResults ? key.trim() : key;
    const processedValue = trimResults ? value.trim() : value;

    // Check for duplicate keys if not allowed
    if (!allowDuplicateKeys && chips.some((chip) => chip.key === processedKey)) {
      return; // Skip this match
    }

    chips.push({ key: processedKey, value: processedValue });
    remainingText = remainingText.replace(fullMatch, '').trim();
  });

  return {
    chips,
    remainingText: trimResults ? remainingText.trim() : remainingText,
  };
}

/**
 * Create a specialized parser function with predefined options
 * Useful for creating reusable parsers with specific configurations
 *
 * @param defaultOptions - Default options to use for parsing
 * @returns A parser function that uses the provided default options
 *
 * @example
 * ```typescript
 * // Create a parser for SQL-like syntax
 * const sqlParser = createSearchParser({
 *   pattern: /(\w+)\s*=\s*'([^']+)'/g
 * });
 *
 * // Use the specialized parser
 * const result = sqlParser("name = 'John Doe' status = 'active'");
 * ```
 */
export function createSearchParser(defaultOptions: ParseSearchOptions = {}) {
  return (input: string, options: ParseSearchOptions = {}) => {
    return parseSearchInput(input, { ...defaultOptions, ...options });
  };
}

/**
 * Combine chips and remaining text back into a search string
 *
 * @param chips - Array of search chips
 * @param remainingText - Remaining text after chip extraction
 * @param separator - Separator to use between chips and text. Default: " "
 * @returns Combined search string
 */
export function combineSearchInput(chips: SearchChip[], remainingText: string = '', separator: string = ' '): string {
  const chipStrings = chips.map((chip) => `${chip.key}:${chip.value}`);
  const allParts = [...chipStrings, remainingText].filter((part) => part.trim());
  return allParts.join(separator);
}

/**
 * Enhanced search function that handles both regular search and key:value filters
 * Supports structured search patterns like "name:john" or "status:active"
 *
 * @param row - The data row to search in
 * @param searchTerm - The search term (can be regular text or key:value pattern)
 * @param getCellValueFn - Function to extract cell values (optional, uses default if not provided)
 * @param extractValuesFn - Function to extract all values (optional, uses default if not provided)
 * @returns True if the row matches the search criteria
 */
export function searchInRow<T>(row: T, searchTerm: string, getCellValueFn: typeof getCellValue = getCellValue, extractValuesFn: typeof extractAllValues = extractAllValues): boolean {
  if (!searchTerm.trim()) return true;

  // Check for key:value patterns
  const keyValuePattern = /(\w+):([^\s]+)/g;
  const keyValueMatches = Array.from(searchTerm.matchAll(keyValuePattern));

  if (keyValueMatches.length > 0) {
    // Handle structured search (key:value format)
    return keyValueMatches.every((match) => {
      const [, key, value] = match;
      const rowValue = getCellValueFn(row, { key });

      if (rowValue === null || rowValue === undefined) return false;

      const searchableValue = extractValuesFn(rowValue).toLowerCase();
      return searchableValue.includes(value.toLowerCase());
    });
  } else {
    // Handle regular text search across all fields
    const searchableText = extractValuesFn(row).toLowerCase();
    return searchableText.includes(searchTerm.toLowerCase());
  }
}

/**
 * Create a search function with predefined getCellValue and extractAllValues functions
 * Useful for creating reusable search functions with specific configurations
 */
export function createSearchFunction<T>(getCellValueFn?: typeof getCellValue, extractValuesFn?: typeof extractAllValues) {
  return (row: T, searchTerm: string) => searchInRow(row, searchTerm, getCellValueFn, extractValuesFn);
}
