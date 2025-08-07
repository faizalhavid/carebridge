import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { useAuthStore } from "../stores/auth_store";
import { ErrorResponse, ServerErrorResponse } from "@/types/api";

const baseURL = process.env.NEXT_PUBLIC_API_URL!;
const version = process.env.NEXT_PUBLIC_API_VERSION!;
const pathPattern = `/api/${version}`;

const api: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add Authorization header
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        if (config.headers) {
            if (typeof config.headers.set === "function") {
                config.headers.set('Authorization', `Bearer ${token}`);
            } else {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
    }
    return config;
});

// Response interceptor to handle 401/403 and refresh token
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403) &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refreshRes = await axios.post(
                    `${baseURL}${pathPattern}/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );
                const { data: accessToken } = refreshRes.data;
                useAuthStore.setState({ accessToken });
                // Update Authorization header and retry original request
                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${accessToken}`,
                };
                return api(originalRequest);
            } catch {
                useAuthStore.getState().logout();
                throw new Error("Session expired. Please login again.");
            }
        }
        // Format error response
        const errorResponse: ErrorResponse = {
            status: error.response?.status ?? 500,
            headers: error.response?.headers ?? {},
            name: "FetchError",
            error: error.response?.data as ServerErrorResponse,
            url: error.config?.url ?? "",
        };
        throw errorResponse;
    }
);

// Utility methods
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await api.get<T>(url, config);
    return res.data;
};

export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const res = await api.post<T>(url, data, config);
    return res.data;
};

export const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const res = await api.put<T>(url, data, config);
    return res.data;
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await api.delete<T>(url, config);
    return res.data;
};

export { api };