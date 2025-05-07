

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        ...options,
        headers: {
            "Content-TYpe": "application/json",
            ...options?.headers,
        },
    });
    if (!res.ok) {
        const error = new Error("An error occurred while fetching the data.");
        // @ts-ignore
        error.info = await res.json();
        // @ts-ignore
        error.status = res.status;
        throw error;
    }
    return res.json();
}