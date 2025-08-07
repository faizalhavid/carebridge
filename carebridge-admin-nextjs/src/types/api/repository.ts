interface PageInterface {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}

export interface RepositoryRestResource<T> {
    _embedded: {
        [key: string]: T[];
    };
    _links: any;
    page: PageInterface;
}
