import { BaseEntity } from '@/types/models/base-entity';
import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { DialogInterface, DialogMode, DialogState } from './type';

interface ResourceDialogContextValue<T extends BaseEntity> {
  children: ReactNode;
  dialogInterface: DialogInterface;
  formBuilder?: React.ReactNode;
  onOpenDialog: (e: React.MouseEvent<HTMLButtonElement | HTMLTableRowElement>, mode: any, id: number) => void;
  onCloseDialog: (event?: React.MouseEvent, reason?: 'backdropClick' | 'escapeKeyDown') => Promise<boolean | void>;
  onSubmitDialog: (data: any, dialogMode: keyof typeof DialogMode) => void;
  dialogState: DialogState<T>;
  setDialogState: React.Dispatch<React.SetStateAction<DialogState<T>>>;
}

const ResourceContext = createContext<ResourceDialogContextValue<any> | null>(null);

export function ResourceProvider<T extends BaseEntity>({ children, dialogInterface, formBuilder, onOpenDialog, onCloseDialog, onSubmitDialog, dialogState, setDialogState }: ResourceDialogContextValue<T>) {
  const contextValue = useMemo<ResourceDialogContextValue<T>>(
    () => ({
      children,
      dialogInterface,
      formBuilder,
      onOpenDialog,
      onCloseDialog,
      onSubmitDialog,
      dialogState,
      setDialogState,
    }),
    [children, dialogInterface, formBuilder, onOpenDialog, onCloseDialog, onSubmitDialog, dialogState]
  );

  return <ResourceContext.Provider value={contextValue}>{children}</ResourceContext.Provider>;
}

export function useResourceDialogContext<T extends BaseEntity>(): ResourceDialogContextValue<T> {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error('useResourceContext must be used within a ResourceProvider');
  }
  return context as ResourceDialogContextValue<T>;
}

export type { ResourceDialogContextValue };
