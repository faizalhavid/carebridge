/**
 * Table-related utility functions for selection, sorting, and data management
 */

import { BaseEntity } from '@/types/models/base-entity';
import { ResourceTableHeadCell, TableState } from '@/components/Resources/Table/type';

/**
 * Interface for selection state calculations
 */
export interface SelectionState {
  numSelected: number;
  rowCount: number;
  isIndeterminate: boolean;
  isAllSelected: boolean;
}

/**
 * Calculate selection state from data and selected IDs
 *
 * @param selectedIds - Array of selected item IDs
 * @param totalCount - Total number of items
 * @returns Calculated selection state
 */
export function calculateSelectionState(selectedIds: number[], totalCount: number): SelectionState {
  const numSelected = selectedIds.length;
  const isIndeterminate = numSelected > 0 && numSelected < totalCount;
  const isAllSelected = totalCount > 0 && numSelected === totalCount;

  return {
    numSelected,
    rowCount: totalCount,
    isIndeterminate,
    isAllSelected,
  };
}

/**
 * Create selection update function for table state
 *
 * @param data - Array of data items
 * @param setTableState - State setter function
 * @returns Function to handle select all changes
 */
export function createSelectAllHandler<T extends BaseEntity>(data: T[], setTableState: React.Dispatch<React.SetStateAction<TableState<T>>>) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedIds = event.target.checked ? data.map((item: T) => Number(item.id)) : [];

    const selectionState = calculateSelectionState(newSelectedIds, data.length);

    setTableState((prev) => ({
      ...prev,
      selection: {
        ...prev.selection,
        selectedIdData: newSelectedIds,
        ...selectionState,
      },
    }));
  };
}

/**
 * Create sort handler function for table columns
 *
 * @param setTableState - State setter function
 * @returns Function to handle sort requests
 */
export function createSortHandler<T extends BaseEntity>(setTableState: React.Dispatch<React.SetStateAction<TableState<T>>>) {
  return (property: string, currentOrderBy?: string, currentOrder?: 'asc' | 'desc') => {
    const isCurrentlyAsc = currentOrderBy === property && currentOrder === 'asc';
    const newOrder: 'asc' | 'desc' = isCurrentlyAsc ? 'desc' : 'asc';

    setTableState((prev) => ({
      ...prev,
      sorting: {
        ...prev.sorting,
        order: newOrder,
        orderBy: property,
      },
    }));
  };
}

/**
 * Get sort key from head cell configuration
 * Prioritizes 'key' over 'id' for nested property support
 *
 * @param headCell - Table head cell configuration
 * @returns Sort key string
 */
export function getSortKey<T extends BaseEntity>(headCell: ResourceTableHeadCell<T>): string {
  return headCell.key || String(headCell.id) || '';
}

/**
 * Extract data from repository resource structure
 *
 * @param resource - Repository resource with embedded data
 * @returns Array of data items
 */
export function extractResourceData<T>(resource?: { _embedded?: { [key: string]: T[] } } | null): T[] {
  if (!resource?._embedded) return [];
  return Object.values(resource._embedded).flat() as unknown as T[];
}

/**
 * Create a column sort handler with specific property
 *
 * @param property - Property to sort by
 * @param sortHandler - Sort handler function
 * @returns Click event handler
 */
export function createColumnSortHandler(property: string, sortHandler: (property: string) => void) {
  return (event: React.MouseEvent<unknown>) => {
    event.preventDefault();
    sortHandler(property);
  };
}

/**
 * Determine if actions column should be shown
 *
 * @param showTableActions - Setting from table state
 * @param showActionsOverride - Override value
 * @param defaultValue - Default value if neither is specified
 * @returns Boolean indicating if actions should be shown
 */
export function shouldShowActions(showTableActions?: boolean, showActionsOverride?: boolean, defaultValue: boolean = true): boolean {
  return showActionsOverride ?? showTableActions ?? defaultValue;
}

/**
 * Create memoized selection state calculator
 *
 * @param selectedIds - Array of selected IDs
 * @param dataLength - Length of data array
 * @returns Memoized selection state
 */
export function useMemoizedSelectionState(selectedIds: number[], dataLength: number): SelectionState {
  return calculateSelectionState(selectedIds, dataLength);
}
