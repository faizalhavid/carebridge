import type { SuccessResponse } from './base-response';

export interface PaginationMeta {
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginatedData<T> {
    [key: string]: any;
    items: T[] | null;
    meta: PaginationMeta;
}

export type PaginatedResponse<T> = SuccessResponse<PaginatedData<T>>;
