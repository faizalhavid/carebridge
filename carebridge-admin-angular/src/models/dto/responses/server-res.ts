import e from "express";

interface BaseServerResponse {
    timestamp: string;
    status: string | number;
    message: string;
}

export interface SuccessResponse<T = any> extends BaseServerResponse {
    data: T;
}

interface ServerErrorResponse extends BaseServerResponse {
    errors: ErrorDetails[];
}

export interface ErrorResponse {
    status: number;
    headers: any;
    name: string;
    error: ServerErrorResponse;
    url: string;
}

export interface ErrorDetails {
    field: string;
    message: string;
}

export interface ServerResponse {
    success: SuccessResponse;
    error: ErrorResponse;
}

interface PageInterface {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}

interface LinkInterface {
    self: {
        href: string;
    };
    first: {
        href: string;
    };
    last: {
        href: string;
    };
    next: {
        href: string;
    };
    prev: {
        href: string;
    };
}

export interface RepositoryRestResource<T> {
    _embedded: {
        [key: string]: T[];
    };
    _links: any;
    page: PageInterface;
}

