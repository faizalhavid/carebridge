import React, { useContext, createContext, ReactNode, useState, useMemo, useCallback } from 'react';
import { ResourceProvider as ResourceDialogProvider } from '@/components/Resources/Dialog/provider';
import { ResourceTableProvider } from '@/components/Resources/Table/provider';
import { DialogState, DialogMode } from '@/components/Resources/Dialog/type';
import { TableState } from '@/components/Resources/Table/type';
import { BaseEntity } from '@/types/models/base-entity';
import { ResourceTableHeadCell } from '@/components/Resources/Table/type';
import { RepositoryRestResource } from '@/types/api/repository';

// Props interface for the ResourceProvider component
export interface ResourceProviderProps<T extends BaseEntity> {
  children?: ReactNode;
  title: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  size?: 'small' | 'medium' | 'large';
  resource: RepositoryRestResource<T> | null;
  headCells: ResourceTableHeadCell<T>[];
  showActions?: boolean;
  columnComponents?: { [key: string]: React.ComponentType<{ value: any; row: T }> };
  customTableAction?: (row: T) => React.ReactNode;
  formBuilder?: React.ReactNode;

  // Callback functions
  onRefreshData?: () => Promise<any>;
  onSubmitForm?: (data: any, mode: keyof typeof DialogMode) => Promise<void>;
  onError?: (error: any) => void;
  onSuccess?: (message: string) => void;
  onSearch?: (value: string) => void;
  onFilterClick?: () => void;
  onAddClick?: () => void;
  onPageChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
}

// Shared data interface that both table and dialog can access
export interface SharedResourceData<T extends BaseEntity> {
  isLoading: boolean;
  selectedItems: T[];
  currentItem: T | null;
  hasUnsavedChanges: boolean;
  lastAction: string | null;
  filters: Record<string, any>;
}

// Context interfaces
export interface ResourceContextValue<T extends BaseEntity> {
  // Table context
  tableContextValue: any;

  // Dialog context
  dialogContextValue: any;

  // Shared state
  sharedData: SharedResourceData<T>;
  setSharedData: React.Dispatch<React.SetStateAction<SharedResourceData<T>>>;

  // Shared functions
  refreshData: () => Promise<void>;
  selectItem: (item: T) => void;
  selectMultipleItems: (items: T[]) => void;
  clearSelection: () => void;
  openDialogWithItem: (mode: keyof typeof DialogMode, item?: T | number) => void;
  closeDialogAndRefresh: () => Promise<void>;
  handleError: (error: any) => void;
  handleSuccess: (message: string) => void;
}

const ResourceContext = createContext<ResourceContextValue<any> | null>(null);

// Main ResourceProvider component that acts as a bridge between table and dialog
export function ResourceProvider<T extends BaseEntity>({ children, title, maxWidth = 'md', size = 'medium', resource, headCells, showActions = true, columnComponents, customTableAction, formBuilder, onRefreshData, onSubmitForm, onError, onSuccess, onSearch, onFilterClick, onAddClick, onPageChange }: ResourceProviderProps<T>) {
  console.log('ResourceProvider rendering with resource:', resource);

  // Initialize table state
  const [tableState, setTableState] = useState<TableState<T>>({
    search: '',
    sorting: { order: 'asc', orderBy: '' },
    pagination: { page: 0, rowsPerPage: 10, emptyRows: 0 },
    selection: { selectedIdData: [], isIndeterminate: false, isAllSelected: false, numSelected: 0, rowCount: 0 },
    display: {
      dense: false,
      headCells,
      visibleRows: [],
      showTableActions: showActions,
    },
  });

  // Initialize dialog state
  const [dialogState, setDialogState] = useState<DialogState<T>>({
    open: false,
    mode: DialogMode.CREATE,
    selectedModelResource: null,
    isLoading: false,
    hasValidationErrors: false,
  });

  // Initialize shared data state
  const [sharedData, setSharedData] = useState<SharedResourceData<T>>({
    isLoading: false,
    selectedItems: [],
    currentItem: null,
    hasUnsavedChanges: false,
    lastAction: null,
    filters: {},
  });

  // Shared functions
  const refreshData = useCallback(async () => {
    setSharedData((prev) => ({ ...prev, isLoading: true, lastAction: 'refresh' }));
    try {
      if (onRefreshData) {
        await onRefreshData();
        handleSuccess('Data refreshed successfully');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setSharedData((prev) => ({ ...prev, isLoading: false }));
    }
  }, [onRefreshData]);

  const selectItem = useCallback((item: T) => {
    setSharedData((prev) => ({
      ...prev,
      selectedItems: [item],
      currentItem: item,
      lastAction: 'select_item',
    }));
  }, []);

  const selectMultipleItems = useCallback((items: T[]) => {
    setSharedData((prev) => ({
      ...prev,
      selectedItems: items,
      lastAction: 'select_multiple',
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setSharedData((prev) => ({
      ...prev,
      selectedItems: [],
      currentItem: null,
      lastAction: 'clear_selection',
    }));
    setTableState((prev: TableState<T>) => ({
      ...prev,
      selection: { ...prev.selection, selectedIdData: [] },
    }));
  }, []);

  const openDialogWithItem = useCallback(
    (mode: keyof typeof DialogMode, item?: T | number) => {
      if (typeof item === 'number') {
        // Handle case where item is an ID
        let data: T[] = [];
        if (resource?._embedded) {
          const embeddedValues = Object.values(resource._embedded);
          if (embeddedValues.length > 0) {
            data = Array.isArray(embeddedValues[0]) ? (embeddedValues[0] as unknown as T[]) : [embeddedValues[0] as unknown as T];
          }
        }
        const foundItem = data.find((dataItem: any) => dataItem.id === item);

        setDialogState({
          open: true,
          mode,
          selectedModelResource: foundItem || null,
          isLoading: false,
          hasValidationErrors: false,
        });

        if (foundItem) {
          setSharedData((prev) => ({
            ...prev,
            currentItem: foundItem,
            lastAction: `open_${mode.toLowerCase()}_dialog`,
          }));
        }
      } else {
        // Handle case where item is the actual object
        setDialogState({
          open: true,
          mode,
          selectedModelResource: item || null,
          isLoading: false,
          hasValidationErrors: false,
        });

        if (item) {
          setSharedData((prev) => ({
            ...prev,
            currentItem: item,
            lastAction: `open_${mode.toLowerCase()}_dialog`,
          }));
        }
      }
    },
    [resource]
  );

  const closeDialogAndRefresh = useCallback(async () => {
    setDialogState((prev) => ({ ...prev, open: false }));
    setSharedData((prev) => ({
      ...prev,
      hasUnsavedChanges: false,
      lastAction: 'close_dialog',
    }));
    await refreshData();
  }, [refreshData]);

  const handleError = useCallback(
    (error: any) => {
      setSharedData((prev) => ({ ...prev, lastAction: 'error' }));
      if (onError) {
        onError(error);
      } else {
        console.error('Resource error:', error);
      }
    },
    [onError]
  );

  const handleSuccess = useCallback(
    (message: string) => {
      setSharedData((prev) => ({ ...prev, lastAction: 'success' }));
      if (onSuccess) {
        onSuccess(message);
      } else {
        console.log('Resource success:', message);
      }
    },
    [onSuccess]
  );

  // Table context value
  const tableContextValue = useMemo(
    () => ({
      tableState,
      setTableState,
      tableInterface: {
        title,
        headCells,
        showActions,
        size,
      },
      resource,
      customColumnComponents: columnComponents,
      customTableAction,
      onSearch,
      onFilterClick,
      onAddClick,
      onPageChange,
    }),
    [tableState, title, headCells, showActions, size, resource, columnComponents, customTableAction, onSearch, onFilterClick, onAddClick, onPageChange]
  );

  // Dialog context value
  const dialogContextValue = useMemo(
    () => ({
      dialogState,
      setDialogState,
      dialogInterface: {
        title,
        maxWidth,
        size,
      },
      formBuilder,
      onOpenDialog: (e: React.MouseEvent, mode: keyof typeof DialogMode, id: number) => {
        openDialogWithItem(mode, id);
      },
      onCloseDialog: async () => {
        await closeDialogAndRefresh();
        return true;
      },
      onSubmitDialog: async (formData: any, mode: keyof typeof DialogMode) => {
        if (onSubmitForm) {
          setDialogState((prev) => ({ ...prev, isLoading: true }));
          try {
            await onSubmitForm(formData, mode);
            await closeDialogAndRefresh();
            handleSuccess(`${mode} operation completed successfully`);
          } catch (error) {
            handleError(error);
          } finally {
            setDialogState((prev) => ({ ...prev, isLoading: false }));
          }
        }
      },
    }),
    [dialogState, title, maxWidth, size, formBuilder, onSubmitForm, openDialogWithItem, closeDialogAndRefresh, handleError, handleSuccess]
  );

  // Main context value that bridges table and dialog
  const contextValue = useMemo(
    () => ({
      tableContextValue,
      dialogContextValue,
      sharedData,
      setSharedData,
      refreshData,
      selectItem,
      selectMultipleItems,
      clearSelection,
      openDialogWithItem,
      closeDialogAndRefresh,
      handleError,
      handleSuccess,
    }),
    [tableContextValue, dialogContextValue, sharedData, refreshData, selectItem, selectMultipleItems, clearSelection, openDialogWithItem, closeDialogAndRefresh, handleError, handleSuccess]
  );

  return (
    <ResourceContext.Provider value={contextValue}>
      <ResourceTableProvider {...tableContextValue}>
        <ResourceDialogProvider {...dialogContextValue}>{children}</ResourceDialogProvider>
      </ResourceTableProvider>
    </ResourceContext.Provider>
  );
}

// Hook to access the full resource context
export function useResourceContext<T extends BaseEntity>(): ResourceContextValue<T> {
  const context = useContext(ResourceContext);
  if (!context) throw new Error('useResourceContext must be used within ResourceProvider');
  return context;
}

// Hook to access only table-related functionality
export function useResourceTable<T extends BaseEntity>() {
  const context = useResourceContext<T>();
  return {
    tableState: context.tableContextValue.tableState,
    setTableState: context.tableContextValue.setTableState,
    tableInterface: context.tableContextValue.tableInterface,
    resource: context.tableContextValue.resource,
    onSearch: context.tableContextValue.onSearch,
    onFilterClick: context.tableContextValue.onFilterClick,
    onAddClick: context.tableContextValue.onAddClick,
    onPageChange: context.tableContextValue.onPageChange,
  };
}

// Hook to access only dialog-related functionality
export function useResourceDialog<T extends BaseEntity>() {
  const context = useResourceContext<T>();
  return {
    dialogState: context.dialogContextValue.dialogState,
    setDialogState: context.dialogContextValue.setDialogState,
    dialogInterface: context.dialogContextValue.dialogInterface,
    formBuilder: context.dialogContextValue.formBuilder,
    onOpenDialog: context.dialogContextValue.onOpenDialog,
    onCloseDialog: context.dialogContextValue.onCloseDialog,
    onSubmitDialog: context.dialogContextValue.onSubmitDialog,
  };
}

// Hook to access shared data and functions
export function useSharedResourceData<T extends BaseEntity>() {
  const context = useResourceContext<T>();
  return {
    sharedData: context.sharedData,
    setSharedData: context.setSharedData,
  };
}

// Hook to access shared actions
export function useResourceActions<T extends BaseEntity>() {
  const context = useResourceContext<T>();
  return {
    refreshData: context.refreshData,
    selectItem: context.selectItem,
    selectMultipleItems: context.selectMultipleItems,
    clearSelection: context.clearSelection,
    openDialogWithItem: context.openDialogWithItem,
    closeDialogAndRefresh: context.closeDialogAndRefresh,
    handleError: context.handleError,
    handleSuccess: context.handleSuccess,
  };
}

// Alias for useResourceContext to maintain compatibility with existing ResourceTable usage
export function useResourceView<T extends BaseEntity>() {
  return useResourceContext<T>();
}
