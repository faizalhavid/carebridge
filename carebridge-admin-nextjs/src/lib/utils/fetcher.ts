import { SuccessResponse, ErrorResponse } from "@/interfaces/server-res";

export async function fetcher<T>(url: string, options?: RequestInit): Promise<SuccessResponse<T>> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}${url}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        }
    );

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