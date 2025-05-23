import { create } from "zustand";

type State<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    lastFetch: number | null;
    fetchData: (force?: boolean) => Promise<void>;
    clearData: () => void;
}


export function createApiStore<T>(fetchFn: () => Promise<T>, ttl: number = 5 * 60 * 1000) {
    return create<State<T>>((set, get) => ({
        data: null,
        loading: false,
        error: null,
        lastFetch: null,
        fetchData: async (force = false) => {
            const { data, lastFetch } = get();
            const now = Date.now();

            if (!force && data && lastFetch && now - lastFetch < ttl) {
                return;
            }

            set({ loading: true, error: null });

            try {
                const response = await fetchFn();
                set({ data: response, loading: false, lastFetch: now });
            } catch (error) {
                set({ loading: false, error: (error as Error).message });
            }
        },
        clearData: () => set({ data: null, error: null }),
    }));
}