import { RepositoryRestResource } from '@/types/api';
import { ResourceComponentInterface } from '@/types/components/resources';
import { BaseEntity } from '@/types/models/base-entity';
import React, { createContext, useContext, ReactNode, useMemo, useCallback, useState } from 'react';


interface ResourceContextValue<T extends BaseEntity> {
    // Data
    title: string;
    data: T[];
    resource?: RepositoryRestResource<T[]> | null;
    headCells: ResourceComponentInterface.ResourceTableHeadCell<T>[];

    // Configuration
    showActions?: boolean;
    columnComponents?: { [id: string]: React.ComponentType<{ value: any; row: T }> };
    customTableAction?: (row: T) => React.ReactNode;
    formBuilder?: React.ReactNode;

    // State
    dialogState: ResourceComponentInterface.DialogState<T>;
    tableState: ResourceComponentInterface.TableState<T>;

    // Actions
    setDialogState: React.Dispatch<React.SetStateAction<ResourceComponentInterface.DialogState<T>>>;
    setTableState: React.Dispatch<React.SetStateAction<ResourceComponentInterface.TableState<T>>>;

    // Computed/Derived State (Memoized)
    visibleRows: T[];
    emptyRows: number;
    isIndeterminate: boolean;
    isAllSelected: boolean;
    numSelected: number;
    rowCount: number;

    // Memoized Handlers
    handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRequestSort: (event: React.MouseEvent<unknown>, property: keyof T | string) => void;
    handleRowClick: (e: React.MouseEvent, row: T, isItemSelected: boolean) => void;
    handleCheckboxClick: (e: React.MouseEvent, row: T, isItemSelected: boolean) => void;
    handleOpenDialog: (e: React.MouseEvent, mode: any, id: number) => void;
    handleCloseDialog: () => void;
    handleSubmitDialog: (data: any) => void;
    handleAddClick: () => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    getCellValue: (row: T, col: any) => any;
    searchInRow: (row: any, searchTerm: string) => boolean;
    renderActions: (row: T) => React.ReactNode;

    // Event Handlers
    onSearch?: (value: string) => void;
    onFilterClick?: () => void;
    onAddClick?: () => void;
    onPageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
    onSubmitForm?: (data: any) => void;
    onActionClick?: (mode: ResourceComponentInterface.DialogState<T>['mode'], data: T) => void;
    onCloseDialog?: () => void;
}

const ResourceContext = createContext<ResourceContextValue<any> | null>(null);

interface ResourceProviderProps<T extends BaseEntity> {
    children: ReactNode;
    // Basic props
    title: string;
    data: T[];
    resource?: RepositoryRestResource<T[]> | null;
    headCells: ResourceComponentInterface.ResourceTableHeadCell<T>[];
    showActions?: boolean;
    columnComponents?: { [id: string]: React.ComponentType<{ value: any; row: T }> };
    customTableAction?: (row: T) => React.ReactNode;
    formBuilder?: React.ReactNode;
    // Event handlers
    onSearch?: (value: string) => void;
    onFilterClick?: () => void;
    onAddClick?: () => void;
    onPageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
    onSubmitForm?: (data: any) => void;
    onActionClick?: (mode: ResourceComponentInterface.DialogState<T>['mode'], data: T) => void;
    onCloseDialog?: () => void;
}

export function ResourceProvider<T extends BaseEntity>({
    children,
    title,
    data,
    resource,
    headCells,
    showActions = true,
    columnComponents = {},
    customTableAction,
    formBuilder,
    onSearch,
    onFilterClick,
    onAddClick,
    onPageChange,
    onSubmitForm,
    onActionClick,
    onCloseDialog
}: ResourceProviderProps<T>) {
    // Internal state
    const [dialogState, setDialogState] = useState<ResourceComponentInterface.DialogState<T>>({
        open: false,
        mode: 'create',
        selectedModelResource: null,
    });

    const [tableState, setTableState] = useState<ResourceComponentInterface.TableState<T>>({
        order: 'asc',
        orderBy: undefined,
        selected: [],
        page: 0,
        dense: false,
        rowsPerPage: 10,
        search: '',
    });

    // Memoized cell value getter
    const getCellValue = useCallback((row: T, col: any) => {
        if (col.key) {
            return col.key.split('.').reduce(
                (acc: any, part: string) => acc && acc[part],
                row
            );
        }
        return row[col.id as keyof T];
    }, []);

    // Helper function to extract all values from nested objects
    const extractAllValues = useCallback((obj: any): string => {
        if (obj === null || obj === undefined) return '';
        if (typeof obj === 'string' || typeof obj === 'number') return String(obj);
        if (Array.isArray(obj)) return obj.map(extractAllValues).join(' ');
        if (typeof obj === 'object') {
            return Object.values(obj).map(extractAllValues).join(' ');
        }
        return String(obj);
    }, []);

    // Enhanced search function
    const searchInRow = useCallback((row: any, searchTerm: string): boolean => {
        if (!searchTerm.trim()) return true;

        const keyValuePattern = /(\w+):([^\s]+)/g;
        const keyValueMatches = Array.from(searchTerm.matchAll(keyValuePattern));

        if (keyValueMatches.length > 0) {
            return keyValueMatches.every(match => {
                const [, key, value] = match;
                const rowValue = getCellValue(row, { key });
                if (rowValue === null || rowValue === undefined) return false;
                const searchableValue = extractAllValues(rowValue).toLowerCase();
                return searchableValue.includes(value.toLowerCase());
            });
        } else {
            const searchableText = extractAllValues(row).toLowerCase();
            return searchableText.includes(searchTerm.toLowerCase());
        }
    }, [extractAllValues, getCellValue]);

    // Enhanced comparator that handles nested properties
    const createNestedComparator = useCallback((orderBy: string, order: 'asc' | 'desc') => {
        return (a: T, b: T) => {
            const getNestedValue = (obj: any, path: string) => {
                if (!path) return obj;
                return path.split('.').reduce(
                    (acc: any, part: string) => acc && acc[part],
                    obj
                );
            };

            const aValue = getNestedValue(a, orderBy);
            const bValue = getNestedValue(b, orderBy);

            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return 1;
            if (bValue == null) return -1;

            const aComp = typeof aValue === 'object' ? String(aValue) : aValue;
            const bComp = typeof bValue === 'object' ? String(bValue) : bValue;

            if (aComp < bComp) return order === 'asc' ? -1 : 1;
            if (aComp > bComp) return order === 'asc' ? 1 : -1;
            return 0;
        };
    }, []);

    // Memoized filtered and sorted data
    const visibleRows = useMemo(() => {
        let filteredData = data;
        if (tableState.search.trim()) {
            filteredData = data.filter((row) => searchInRow(row, tableState.search));
        }
        return [...filteredData]
            .sort(createNestedComparator(tableState.orderBy || '', tableState.order))
            .slice(
                tableState.page * tableState.rowsPerPage,
                tableState.page * tableState.rowsPerPage + tableState.rowsPerPage
            );
    }, [data, tableState.order, tableState.orderBy, tableState.page, tableState.rowsPerPage, tableState.search, searchInRow, createNestedComparator]);

    // Computed values
    const emptyRows = useMemo(() =>
        tableState.rowsPerPage - Math.min(tableState.rowsPerPage, data.length - tableState.page * tableState.rowsPerPage),
        [tableState.rowsPerPage, data.length, tableState.page]
    );

    const numSelected = useMemo(() => tableState.selected.length, [tableState.selected.length]);
    const rowCount = useMemo(() => data.length, [data.length]);

    const isIndeterminate = useMemo(() =>
        numSelected > 0 && numSelected < rowCount,
        [numSelected, rowCount]
    );

    const isAllSelected = useMemo(() =>
        rowCount > 0 && numSelected === rowCount,
        [numSelected, rowCount]
    );

    // Memoized handlers
    const handleSelectAllClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n: T) => Number(n.id));
            setTableState(prev => ({ ...prev, selected: newSelecteds }));
        } else {
            setTableState(prev => ({ ...prev, selected: [] }));
        }
    }, [data]);

    const handleRequestSort = useCallback((event: React.MouseEvent<unknown>, property: keyof T | string) => {
        const headCell = headCells.find(cell => (cell.key || cell.id) === property);
        const sortKey = headCell?.key || String(property);

        const isAsc = tableState.orderBy === sortKey && tableState.order === 'asc';
        setTableState(prev => ({
            ...prev,
            order: isAsc ? 'desc' : 'asc',
            orderBy: sortKey
        }));
    }, [headCells, tableState.orderBy, tableState.order]);

    const handleOpenDialog = useCallback((e: React.MouseEvent, mode: any, id: number) => {
        e.stopPropagation();
        const modelResource = visibleRows.find((item: T) => (item as any).id === id);
        if (modelResource) {
            onActionClick?.(mode, modelResource as unknown as T);
        }
        setDialogState({
            open: true,
            mode,
            selectedModelResource: modelResource,
        });
    }, [visibleRows, onActionClick]);

    const handleCloseDialog = useCallback(() => {
        setTableState(prev => ({ ...prev, selected: [] }));
        setDialogState(prev => ({ ...prev, open: false }));
        onCloseDialog?.();
    }, [onCloseDialog]);

    const handleSubmitDialog = useCallback((data: any) => {
        if (dialogState.mode === "delete") {
            // Handle delete logic
            console.log("Deleting item:", dialogState.selectedModelResource);
        } else {
            // Handle create/edit logic
            onSubmitForm?.(data);
        }
        handleCloseDialog();
    }, [dialogState.mode, dialogState.selectedModelResource, onSubmitForm, handleCloseDialog]);

    const handleAddClick = useCallback(() => {
        setDialogState({
            open: true,
            mode: 'create',
            selectedModelResource: null,
        });
        onAddClick?.();
    }, [onAddClick]);

    const handleRowClick = useCallback((e: React.MouseEvent, row: T, isItemSelected: boolean) => {
        const rowId = Number(row.id);
        setTableState((prev) => ({
            ...prev,
            selected: isItemSelected
                ? prev.selected.filter((id) => id !== rowId)
                : [...prev.selected, rowId],
        }));
        handleOpenDialog(e, "view", rowId);
    }, [handleOpenDialog]);

    const handleCheckboxClick = useCallback((e: React.MouseEvent, row: T, isItemSelected: boolean) => {
        e.stopPropagation();
        const rowId = Number(row.id);
        setTableState((prev) => ({
            ...prev,
            selected: isItemSelected
                ? prev.selected.filter((id) => id !== rowId)
                : [...prev.selected, rowId],
        }));
    }, []);

    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTableState((prev) => ({
            ...prev,
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0,
        }));
    }, []);

    const renderActions = useCallback((row: T) => {
        if (customTableAction) {
            return customTableAction(row);
        }

        const { ButtonGroup, Tooltip, IconButton } = require('@mui/material');
        const { Delete, Edit } = require('@mui/icons-material');

        return React.createElement(ButtonGroup, null,
            React.createElement(Tooltip, { title: "Edit" },
                React.createElement(IconButton, {
                    color: "warning",
                    onClick: (e: React.MouseEvent) => handleOpenDialog(e, "edit", row.id as any),
                    size: "small"
                }, React.createElement(Edit, { fontSize: "small" }))
            ),
            React.createElement(Tooltip, { title: "Delete" },
                React.createElement(IconButton, {
                    color: "error",
                    onClick: (e: React.MouseEvent) => handleOpenDialog(e, "delete", row.id as any),
                    size: "small"
                }, React.createElement(Delete, { fontSize: "small" }))
            )
        );
    }, [customTableAction, handleOpenDialog]);

    // Memoized context value
    const contextValue = useMemo<ResourceContextValue<T>>(() => ({
        // Data
        title,
        data,
        resource,
        headCells,

        // Configuration
        showActions,
        columnComponents,
        customTableAction,
        formBuilder,

        // State
        dialogState,
        tableState,
        setDialogState,
        setTableState,

        // Computed/Derived State
        visibleRows,
        emptyRows,
        isIndeterminate,
        isAllSelected,
        numSelected,
        rowCount,

        // Memoized Handlers
        handleSelectAllClick,
        handleRequestSort,
        handleRowClick,
        handleCheckboxClick,
        handleOpenDialog,
        handleCloseDialog,
        handleSubmitDialog,
        handleAddClick,
        handleChangeRowsPerPage,
        getCellValue,
        searchInRow,
        renderActions,

        // Event Handlers
        onSearch,
        onFilterClick,
        onAddClick,
        onPageChange,
        onSubmitForm,
        onActionClick,
        onCloseDialog,
    }), [
        title, data, resource, headCells, showActions, columnComponents, customTableAction, formBuilder,
        dialogState, tableState, visibleRows, emptyRows, isIndeterminate, isAllSelected, numSelected, rowCount,
        handleSelectAllClick, handleRequestSort, handleRowClick, handleCheckboxClick, handleOpenDialog,
        handleCloseDialog, handleSubmitDialog, handleAddClick, handleChangeRowsPerPage, getCellValue, searchInRow, renderActions,
        onSearch, onFilterClick, onAddClick, onPageChange, onSubmitForm, onActionClick, onCloseDialog
    ]);

    return (
        <ResourceContext.Provider value={contextValue}>
            {children}
        </ResourceContext.Provider>
    );
}

export function useResourceContext<T extends BaseEntity>(): ResourceContextValue<T> {
    const context = useContext(ResourceContext);
    if (!context) {
        throw new Error('useResourceContext must be used within a ResourceProvider');
    }
    return context as ResourceContextValue<T>;
}

export type { ResourceContextValue };
