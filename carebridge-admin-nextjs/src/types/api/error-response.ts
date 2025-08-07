export interface ErrorDetails {
    field: string;
    message: string;
}

export interface ServerErrorResponse {
    timestamp: string;
    status: string | number;
    message: string;
    errors: ErrorDetails[];
}

export interface ErrorResponse {
    status: number;
    headers: any;
    name: string;
    error: ServerErrorResponse;
    url: string;
}
