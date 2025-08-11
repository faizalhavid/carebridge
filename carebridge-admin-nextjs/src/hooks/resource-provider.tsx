import React, { useContext, createContext, ReactNode, useState, useMemo, useCallback } from 'react';
import { ResourceProvider as ResourceDialogProvider } from '@/components/Resources/Dialog/provider';
import { ResourceTableProvider, TableInterface } from '@/components/Resources/Table/provider';
import { DialogState, DialogMode, DialogInterface } from '@/components/Resources/Dialog/type';
import { TableState } from '@/components/Resources/Table/type';
import { BaseEntity } from '@/types/models/base-entity';
import { ResourceTableHeadCell } from '@/components/Resources/Table/type';
import { RepositoryRestResource } from '@/types/api/repository';

// Props interface for the ResourceProvider component
export interface ResourceProviderProps<T extends BaseEntity> {
  children?: ReactNode;
  dialogInterface: DialogInterface;
  tableInterface: TableInterface;
  resource: RepositoryRestResource<T> | null;

  customColumnComponents?: { [key: string]: React.ComponentType<{ value: any; row: T }> };
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

  tableState: TableState<T>;
  setTableState: React.Dispatch<React.SetStateAction<TableState<T>>>;
  dialogState: DialogState<T>;
  setDialogState: React.Dispatch<React.SetStateAction<DialogState<T>>>;
  sharedData: SharedResourceData<T>;
  setSharedData: React.Dispatch<React.SetStateAction<SharedResourceData<T>>>;

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

  // Shared functions
  refreshData: () => Promise<void>;
  selectItem: (item: T) => void;
  selectMultipleItems: (items: T[]) => void;
  clearSelection: () => void;
  openDialogWithItem: (e: React.MouseEvent<HTMLButtonElement | HTMLTableRowElement>, mode: keyof typeof DialogMode, item?: T | number) => void;
  closeDialogAndRefresh: () => Promise<void>;
  handleError: (error: any) => void;
  handleSuccess: (message: string) => void;
  sharedData: SharedResourceData<T>;
  setSharedData: React.Dispatch<React.SetStateAction<SharedResourceData<T>>>;

}

const ResourceContext = createContext<ResourceContextValue<any> | null>(null);

// Main ResourceProvider component that acts as a bridge between table and dialog
export function ResourceProvider<T extends BaseEntity>({
  children,
  dialogInterface,
  tableInterface,
  resource,
  customColumnComponents: columnComponents,
  customTableAction,
  formBuilder,
  onRefreshData,
  onSubmitForm,
  onError,
  onSuccess,
  onSearch,
  onFilterClick,
  onAddClick,
  onPageChange,
  tableState,
  setTableState,
  dialogState,
  setDialogState,
  sharedData,
  setSharedData,
}: ResourceProviderProps<T>) {


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
    console.log('items', items)
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
    (e: React.MouseEvent<HTMLButtonElement | HTMLTableRowElement>, mode: keyof typeof DialogMode, item?: T | number) => {
      e.stopPropagation();
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

  const handleAddClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setDialogState({
      open: true,
      mode: DialogMode.CREATE,
      selectedModelResource: null,
      isLoading: false,
      hasValidationErrors: false,
    });
    setSharedData((prev) => ({
      ...prev,
      currentItem: null,
      lastAction: 'open_create_dialog',
    }));
    if (onAddClick) {
      onAddClick();
    }
  }, [onAddClick]);

  const closeDialogAndRefresh = useCallback(async () => {
    setDialogState((prev) => ({ ...prev, open: false }));
    setSharedData((prev) => ({
      ...prev,
      hasUnsavedChanges: false,
      lastAction: 'close_dialog',
    }));
    // await refreshData();
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
      tableInterface,
      resource,
      customColumnComponents: columnComponents,
      customTableAction,
      onSearch,
      onFilterClick,
      onAddClick: handleAddClick,
      onPageChange,
      tableState,
      setTableState,
    }),
    [tableInterface, resource, columnComponents, customTableAction, onSearch, onFilterClick, onAddClick, onPageChange, sharedData, setSharedData, setTableState, tableState]
  );

  const dialogContextValue = useMemo(
    () => ({
      dialogState,
      setDialogState,
      handleAddClick,
      dialogInterface,
      formBuilder,
      onOpenDialog: (e: React.MouseEvent<HTMLButtonElement | HTMLTableRowElement>, mode: keyof typeof DialogMode, id: number) => {
        openDialogWithItem(e, mode, id);
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
    [dialogState, dialogInterface, formBuilder, onSubmitForm, openDialogWithItem, closeDialogAndRefresh, handleError, handleSuccess, handleAddClick]
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
      handleAddClick,
      closeDialogAndRefresh,
      handleError,
      handleSuccess,
    }),
    [tableContextValue, dialogContextValue, sharedData, setSharedData, refreshData, selectItem, selectMultipleItems, clearSelection, openDialogWithItem, handleAddClick, closeDialogAndRefresh, handleError, handleSuccess]
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
    dialogState: context.dialogContextValue.dialogState as DialogState<T>,
    setDialogState: context.dialogContextValue.setDialogState as React.Dispatch<React.SetStateAction<DialogState<T>>>,
    dialogInterface: context.dialogContextValue.dialogInterface as DialogInterface,
    formBuilder: context.dialogContextValue.formBuilder as React.ReactNode,
    onOpenDialog: context.dialogContextValue.onOpenDialog as (
      e: React.MouseEvent<HTMLButtonElement | HTMLTableRowElement>,
      mode: keyof typeof DialogMode,
      id: number
    ) => void,
    onCloseDialog: context.dialogContextValue.onCloseDialog as () => Promise<boolean>,
    onSubmitDialog: context.dialogContextValue.onSubmitDialog as (
      formData: any,
      mode: keyof typeof DialogMode
    ) => Promise<void>,
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
