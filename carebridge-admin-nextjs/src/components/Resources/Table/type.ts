import { BaseEntity } from '@/types/models/base-entity';

export interface ResourceTableHeadCell<T extends BaseEntity> {
  id?: keyof T;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
  key: string | undefined;
  visible: boolean;
}

export interface TableSortingState {
  order: 'asc' | 'desc';
  orderBy?: string | undefined;
}

export interface TablePaginationState {
  page: number;
  rowsPerPage: number;
  emptyRows: number;
}

export interface TableDisplayState<T extends BaseEntity> {
  dense: boolean;
  headCells: ResourceTableHeadCell<T>[];
  visibleRows: T[];
  showTableActions?: boolean;
}

export interface TableSelectionState {
  selectedIdData: number[];
  isIndeterminate: boolean;
  isAllSelected: boolean;
  numSelected: number;
  rowCount: number;
}

export interface TableState<T extends BaseEntity> {
  sorting: TableSortingState;
  pagination: TablePaginationState;
  display: TableDisplayState<T>;
  selection: TableSelectionState;
  search: string;
}
