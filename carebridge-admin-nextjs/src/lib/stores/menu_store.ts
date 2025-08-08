import { create } from "zustand";
import { Menu } from "@/types/models/menu";
import { getMenus } from "../services/apis/dashboard";

type MenuState = {
    menus: Menu[] | null;
    loading: boolean;
    error: string | null;
    fetchMenus: () => Promise<void>;
};

export const useMenuStore = create<MenuState>((set, get) => ({
    menus: null,
    loading: false,
    error: null,
    fetchMenus: async () => {
        if (get().menus) return;
        set({ loading: true, error: null });
        try {
            const res = await getMenus();
            const menus = res._embedded.menus.flat();
            set({ menus, loading: false });
        } catch (e: any) {
            set({ error: e.message, loading: false });
        }
    },
}));