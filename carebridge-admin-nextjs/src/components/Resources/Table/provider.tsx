import { RepositoryRestResource } from '@/types/api';
import { BaseEntity } from '@/types/models/base-entity';
import React, { createContext, useContext, ReactNode, useMemo, useCallback, useState } from 'react';
import { ResourceTableHeadCell, TableState } from './type';

export interface TableInterface {
  title: string;
  size: 'small' | 'medium' | 'large';
}

interface ResourceTableContextValue<T extends BaseEntity> {
  children: ReactNode;
  tableInterface: TableInterface;
  resource?: RepositoryRestResource<T> | null;
  tableState: TableState<T>;
  setTableState: React.Dispatch<React.SetStateAction<TableState<T>>>;

  customColumnComponents?: { [id: string]: React.ComponentType<{ value: any; row: T }> };
  // by default, show the actions colums is false
  customTableAction?: (row: T) => React.ReactNode;

  // Event Handlers
  onSearch?: (value: string) => void;
  onFilterClick?: () => void;
  onAddClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const ResourceTableContext = createContext<ResourceTableContextValue<any> | null>(null);

export function ResourceTableProvider<T extends BaseEntity>({ children, tableInterface, resource, tableState, setTableState, customColumnComponents, customTableAction, onSearch, onFilterClick, onAddClick, onPageChange }: ResourceTableContextValue<T>) {
  const contextValue = useMemo<ResourceTableContextValue<T>>(
    () => ({
      children,
      tableInterface,
      resource,
      tableState,
      setTableState,
      customColumnComponents,
      customTableAction,
      onSearch,
      onFilterClick,
      onAddClick,
      onPageChange,
    }),
    [children, tableInterface, resource, tableState, setTableState, customColumnComponents, customTableAction, onSearch, onFilterClick, onAddClick, onPageChange]
  );

  return <ResourceTableContext.Provider value={contextValue}>{children}</ResourceTableContext.Provider>;
}

export function useResourceTableContext<T extends BaseEntity>(): ResourceTableContextValue<T> {
  const context = useContext(ResourceTableContext);
  if (!context) {
    throw new Error('useResourceContext must be used within a ResourceProvider');
  }
  return context as ResourceTableContextValue<T>;
}

export type { ResourceTableContextValue };
