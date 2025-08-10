/**
 * Core types for the unified resource management system
 * This provides the bridge between table and dialog components
 */

import { BaseEntity } from '@/types/models/base-entity';
import { RepositoryRestResource } from '@/types/api';
import { TableState, ResourceTableHeadCell } from '@/components/Resources/Table/type';
import { DialogState } from '@/components/Resources/Dialog/type';

// Re-export types for convenience
export type { TableState, ResourceTableHeadCell, DialogState };

/**
 * Core resource configuration interface
 */
export interface ResourceConfig<T extends BaseEntity> {
  /** Display title for the resource */
  title: string;
  /** Table column definitions */
  headCells: ResourceTableHeadCell<T>[];
  /** Whether to show action buttons */
  showActions?: boolean;
  /** Custom column components */
  columnComponents?: { [id: string]: React.ComponentType<{ value: any; row: T }> };
  /** Custom action renderer */
  customTableAction?: (row: T) => React.ReactNode;
  /** Form builder for create/edit operations */
  formBuilder?: React.ReactNode;
}

/**
 * Resource data interface
 */
export interface ResourceData<T extends BaseEntity> {
  /** Raw data array */
  data: T[];
  /** Repository resource (for pagination, etc.) */
  resource?: RepositoryRestResource<T[]> | null;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
}

/**
 * Resource event handlers interface
 */
export interface ResourceEventHandlers<T extends BaseEntity> {
  /** Search handler */
  onSearch?: (value: string) => void;
  /** Filter button click */
  onFilterClick?: () => void;
  /** Add button click */
  onAddClick?: () => void;
  /** Page change */
  onPageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  /** Form submission */
  onSubmitForm?: (data: any) => void;
  /** Action click (edit, delete, view) */
  onActionClick?: (mode: DialogState<T>['mode'], data: T) => void;
  /** Dialog close */
  onCloseDialog?: () => void;
  /** Item selection change */
  onSelectionChange?: (selectedIds: number[]) => void;
  /** Sort change */
  onSortChange?: (orderBy: string, order: 'asc' | 'desc') => void;
}

/**
 * Shared resource context interface that bridges table and dialog
 */
export interface SharedResourceContext<T extends BaseEntity> {
  // Configuration
  config: ResourceConfig<T>;

  // Data
  data: ResourceData<T>;

  // Event handlers
  handlers: ResourceEventHandlers<T>;

  // Computed values
  selectedItems: T[];
  selectedCount: number;
  totalCount: number;

  // Utilities
  getItemById: (id: number) => T | undefined;
  refreshData: () => Promise<void>;
  validateItem: (item: Partial<T>) => { isValid: boolean; errors: string[] };
}

/**
 * Table-specific context interface
 */
export interface TableContextValue<T extends BaseEntity> extends SharedResourceContext<T> {
  // Table state
  tableState: TableState<T>;
  setTableState: React.Dispatch<React.SetStateAction<TableState<T>>>;

  // Table-specific computed values
  visibleRows: T[];
  emptyRows: number;
  isIndeterminate: boolean;
  isAllSelected: boolean;

  // Table handlers
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRequestSort: (property: string) => void;
  handleRowClick: (event: React.MouseEvent, row: T, isSelected: boolean) => void;
  handleCheckboxClick: (event: React.MouseEvent, row: T, isSelected: boolean) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Bridge to dialog
  openDialog: (mode: DialogState<T>['mode'], item?: T) => void;
}

/**
 * Dialog-specific context interface
 */
export interface DialogContextValue<T extends BaseEntity> extends SharedResourceContext<T> {
  // Dialog state
  dialogState: DialogState<T>;
  setDialogState: React.Dispatch<React.SetStateAction<DialogState<T>>>;

  // Dialog handlers
  handleOpenDialog: (mode: DialogState<T>['mode'], item?: T) => void;
  handleCloseDialog: () => void;
  handleSubmitDialog: (data: any) => void;

  // Dialog-specific computed values
  currentItem: T | null;
  isCreateMode: boolean;
  isEditMode: boolean;
  isViewMode: boolean;
  isDeleteMode: boolean;
  dialogTitle: string;
  submitLabel: string;

  // Bridge to table
  updateTableSelection: (selectedIds: number[]) => void;
  refreshTable: () => void;
}

/**
 * Combined resource context interface
 */
export interface ResourceContextValue<T extends BaseEntity> extends TableContextValue<T>, DialogContextValue<T> {
  // Additional shared utilities
  performBulkAction: (action: string, items: T[]) => Promise<void>;
  exportData: (format: 'csv' | 'json' | 'xlsx') => void;
  importData: (file: File) => Promise<void>;
}
