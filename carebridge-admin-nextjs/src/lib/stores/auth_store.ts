import { User } from "@/interfaces/models/user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";


interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;

    isAuthenticated: boolean;
    isLoading: boolean;
    isLogout: boolean;

    login(user: User, accessToken: string, refreshToken: string): void;
    logout(): void;
    setLoading(isLoading: boolean): void;
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
                        isAuthenticated: true,
                        isLoading: false,
                    });
                },
                logout: () => {
                    set({
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                },
                setLoading: (isLoading) => {
                    console.log("isLoading", isLoading);
                    set({ isLoading: isLoading });
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