export type QueryParamsData = {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filter?: string;
    search?: string;
    searchFields?: string[];
    include?: string[];
    exclude?: string[];
    [key: string]: any;
};
