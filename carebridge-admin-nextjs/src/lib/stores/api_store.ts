import { create } from "zustand";

type State<TData, TEntity> = {
    data: TData | null;
    loading: boolean;
    error: string | null;
    lastFetch: number | null;
    fetchData: (force?: boolean) => Promise<void>;
    postData?: (data: TEntity) => Promise<void>;
    putData?: (data: TEntity) => Promise<void>;
    deleteData?: (id: string | number) => Promise<void>;
    patchData?: (id: string | number, data: Partial<TEntity>) => Promise<void>;
    clearData: () => void;
};

type ApiStoreOptions<TData, TEntity> = {
    fetchFn: () => Promise<TData>;
    postFn?: (data: TEntity) => Promise<any>;
    putFn?: (data: TEntity) => Promise<any>;
    deleteFn?: (id: string | number) => Promise<any>;
    patchFn?: (id: string | number, data: Partial<TEntity>) => Promise<any>;
    ttl?: number;
};

export function createApiStore<TData, TEntity>({
    fetchFn,
    postFn,
    putFn,
    deleteFn,
    patchFn,
    ttl = 5 * 60 * 1000,
}: ApiStoreOptions<TData, TEntity>) {
    return create<State<TData, TEntity>>((set, get) => ({
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
        postData: postFn
            ? async (data: TEntity) => {
                set({ loading: true, error: null });
                try {
                    await postFn(data);
                    await get().fetchData(true);
                } catch (error) {
                    set({ loading: false, error: (error as Error).message });
                }
            }
            : undefined,
        putData: putFn
            ? async (data: TEntity) => {
                set({ loading: true, error: null });
                try {
                    await putFn(data);
                    await get().fetchData(true);
                } catch (error) {
                    set({ loading: false, error: (error as Error).message });
                }
            }
            : undefined,
        deleteData: deleteFn
            ? async (id: string | number) => {
                set({ loading: true, error: null });
                try {
                    await deleteFn(id);
                    await get().fetchData(true);
                } catch (error) {
                    set({ loading: false, error: (error as Error).message });
                }
            }
            : undefined,
        patchData: patchFn
            ? async (id: string | number, data: Partial<TEntity>) => {
                set({ loading: true, error: null });
                try {
                    await patchFn(id, data);
                    await get().fetchData(true);
                } catch (error) {
                    set({ loading: false, error: (error as Error).message });
                }
            }
            : undefined,
        clearData: () => set({ data: null, error: null }),
    }));
}