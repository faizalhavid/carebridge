import { create } from "zustand";

interface SelectedItemState<T> {
    selectedItem: T | null;
    setSelectedItem: (item: T | null) => void;
    clearSelectedItem: () => void;
}

// Factory function, harus dipanggil sekali per resource
export function createSelectedItemResourceStore<T>() {
    return create<SelectedItemState<T>>((set) => ({
        selectedItem: null,
        setSelectedItem: (item) => set({ selectedItem: item }),
        clearSelectedItem: () => set({ selectedItem: null }),
    }));
}