import { ErrorResponse, SuccessResponse } from "@/interfaces/server-res";
import { useAuthStore } from "../stores/auth_store";

export async function fetcher<T>(
    url: string,
    options?: RequestInit,
    isRestResourcePath: boolean = false,
    retry = true
): Promise<T> {
    const pathPattern = `/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
    const token = useAuthStore.getState().accessToken;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${isRestResourcePath ? '' : pathPattern}${url}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options?.headers,
            },
            credentials: "include",
        }
    );

    if ((res.status === 401 || res.status === 403) && retry) {
        // Refresh token
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${pathPattern}/auth/refresh-token`, {
            method: "POST",
            credentials: "include",
        });

        if (refreshRes.ok) {
            const { data: accessToken } = await refreshRes.json();
            useAuthStore.setState({ accessToken });
            // Retry request dengan token baru
            return fetcher<T>(url, options, isRestResourcePath, false);
        } else {
            useAuthStore.getState().logout();
            throw new Error("Session expired. Please login again.");
        }
    }

    if (!res.ok) {
        const errorResponse: ErrorResponse = {
            status: res.status,
            headers: res.headers,
            name: "FetchError",
            error: await res.json(),
            url: res.url,
        };
        throw errorResponse;
    }

    return res.json();
}