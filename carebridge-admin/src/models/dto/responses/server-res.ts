import e from "express";

interface BaseServerResponse {
    timestamp: string;
    status: number;
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