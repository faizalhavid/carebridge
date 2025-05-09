import { User } from "@/interfaces/models/user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";


interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;

    isAuthenticated: boolean;
    isLogout: boolean;

    login(user: User, accessToken: string, refreshToken: string): void;
    logout(): void;
    setLogout(isLogout: boolean): void;
}


export const useAuthStore = create<AuthState>()(
    devtools(
        persist<AuthState>(
            (set) => ({
                user: null,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                isLoading: false,
                isLogout: false,

                login: (user, accessToken, refreshToken) => {
                    set({
                        user,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true
                    });
                },
                logout: () => {
                    set({
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        isAuthenticated: false
                    });
                },

                setLogout: (isLogout) => {
                    set({ isLogout });
                },
            }),
            {
                name: "auth-storage",
            }
        )
    )
);