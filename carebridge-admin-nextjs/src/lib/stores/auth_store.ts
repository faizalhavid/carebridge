import { User } from "@/interfaces/models/user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isLogout: boolean;

    login(user: User, accessToken: string): void;
    logout(): void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                accessToken: null,
                isLogout: false,

                login: (user, accessToken) => {
                    set({ user, accessToken });
                },
                logout: () => {
                    set({ user: null, accessToken: null });
                }
            }),
            {
                name: "auth-storage",
                partialize: (state) => ({
                    user: state.user,
                    isLogout: state.isLogout,
                }),
            }
        )
    )
);


export const useIsAuthenticated = () =>
    useAuthStore((state) => !!state.accessToken);