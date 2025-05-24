import { BaseEntity } from "@/interfaces/models/base-entity";
import { RepositoryRestResource } from "@/interfaces/server-res";

namespace ResourceComponentInterface {
    type DialogMode = 'create' | 'edit' | 'view' | 'delete';


    export interface DialogState<T> {
        open: boolean;
        mode: DialogMode;
        selectedModelResource?: T | null;
    }

    export interface TableState<T> {
        order: 'asc' | 'desc';
        orderBy?: string | undefined;
        selected: number[];
        page: number;
        dense: boolean;
        rowsPerPage: number;
        search: string;
    }
    export interface ResourceTableToolbarProps<T> {
        numSelected: number;
        title: string;
        tableState: TableState<T>;
        setTableState: React.Dispatch<React.SetStateAction<TableState<T>>>;
        setDialogState: React.Dispatch<React.SetStateAction<DialogState<T>>>;
        onSearch?: (searchTerm: string) => void;
        onFilterClick?: () => void;
    }

    export interface ResourceTableHeadCell<T extends BaseEntity> {
        id: keyof T;
        label: string;
        numeric: boolean;
        disablePadding: boolean;
        key?: string | undefined; // for nested properties
    }


    export interface ResourceTableProps<T extends BaseEntity> {
        title: string;
        resource?: RepositoryRestResource<T[]> | null;
        data: T[];
        headCells: ResourceTableHeadCell<T>[];
        columnComponents?: { [id: string]: React.ComponentType<{ value: any; row: T }> };
        showActions?: boolean;
        dialogState: DialogState<T>;
        tableState: TableState<T>;
        setDialogState: React.Dispatch<React.SetStateAction<DialogState<T>>>;
        setTableState: React.Dispatch<React.SetStateAction<TableState<T>>>;
        customTableAction?: (row: T) => React.ReactNode;
        onActionClick?: (mode: DialogMode, data: T) => void;
        onSearch?: (searchTerm: string) => void;
        onFilterClick?: () => void;
        onAddClick?: () => void;
        onPageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
        onSubmitForm?: (data: any) => void;
        formBuilder: React.ReactNode;
    }

    export interface ResourceTableHeadProps<T extends BaseEntity> {
        numSelected: number;
        orderBy?: string;
        rowCount: number;
        showActions?: boolean;
        onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
        onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
        order: 'asc' | 'desc';
        headCells: ResourceTableHeadCell<T>[];
    }

    export interface ResourceViewProps<T extends BaseEntity> {
        title: string;
        resource?: RepositoryRestResource<T[]> | null;
        headCells: ResourceTableHeadCell<T>[];
        showActions?: boolean;
        columnComponents?: { [id: string]: React.ComponentType<{ value: any; row: T }> };
        onSearch?: (value: string) => void;
        onFilterClick?: () => void;
        onAddClick?: () => void;
        onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
        customTableAction?: (row: T) => React.ReactNode;
        onSubmitForm?: (data: any) => void;
        onActionClick?: (mode: DialogMode, data: T) => void;
        formBuilder: React.ReactNode;
    }


}

export type { ResourceComponentInterface };
