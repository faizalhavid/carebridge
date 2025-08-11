import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { useAuthStore } from "../stores/auth_store";
import { ErrorResponse, RepositoryRestResource, ServerErrorResponse, SuccessResponse } from "@/types/api";

const baseURL = process.env.NEXT_PUBLIC_API_URL!;
const version = process.env.NEXT_PUBLIC_API_VERSION!;
const pathPattern = `/api/${version}`;

// Shared axios configuration
const sharedConfig = {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
};

// Default API instance (with version path)
const api: AxiosInstance = axios.create({
    baseURL: `${baseURL}${pathPattern}`,
    ...sharedConfig,
});

// REST Resource API instance (direct baseURL)
const restApi: AxiosInstance = axios.create({
    baseURL,
    ...sharedConfig,
});

// Shared interceptor setup function
const setupInterceptors = (instance: AxiosInstance) => {
    // Request interceptor for auth
    instance.interceptors.request.use((config) => {
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

    // Response interceptor for token refresh
    instance.interceptors.response.use(
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
                    return instance(originalRequest);
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
};

// Apply interceptors to both instances
setupInterceptors(api);
setupInterceptors(restApi);

// Simple utility methods - choose the right instance
export const get = async <T>(url: string, config?: AxiosRequestConfig, isRestResourcePath: boolean = false): Promise<T> => {
    const instance = isRestResourcePath ? restApi : api;
    const res = await instance.get(url, config);
    return res.data;
};

export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig, isRestResourcePath: boolean = false): Promise<T> => {
    const instance = isRestResourcePath ? restApi : api;
    const res = await instance.post(url, data, config);
    return res.data;
};

export const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig, isRestResourcePath: boolean = false): Promise<T> => {
    const instance = isRestResourcePath ? restApi : api;
    const res = await instance.put(url, data, config);
    return res.data;
};

export const patch = async <T>(url: string, data?: any, config?: AxiosRequestConfig, isRestResourcePath: boolean = false): Promise<T> => {
    const instance = isRestResourcePath ? restApi : api;
    const res = await instance.patch(url, data, config);
    return res.data;
};

export const del = async <T>(url: string, config?: AxiosRequestConfig, isRestResourcePath: boolean = false): Promise<T> => {
    const instance = isRestResourcePath ? restApi : api;
    const res = await instance.delete(url, config);
    return res.data;
};

export { api, restApi };