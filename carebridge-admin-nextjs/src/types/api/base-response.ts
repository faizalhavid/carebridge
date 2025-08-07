import type { ErrorResponse } from './error-response';

interface BaseServerResponse {
    timestamp: string;
    status: string | number;
    message: string;
}

export interface SuccessResponse<T = any> extends BaseServerResponse {
    data: T;
}

export interface ServerResponse {
    success: SuccessResponse;
    error: ErrorResponse;
}
