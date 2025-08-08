"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { QueryClientProvider } from '@tanstack/react-query';
import appThemes from "@/themes/app_themes";
import { useCallback, useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth_store";
import { usePathname, useRouter } from "next/navigation";
import { queryClient } from "@/lib/services/queries";
import { refreshToken } from "@/lib/services/apis/auth"

// @ts-ignore
const theme = createTheme(appThemes);

export default function AppClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const accessToken = useAuthStore((s) => s.accessToken);
    const isAuthPath = usePathname().includes("/auth");
    const router = useRouter();
    const fetchRefreshToken = useCallback(async () => {
        try {
            const res = await refreshToken();
            if (res.status === 200) {
                const data = res.data;
                useAuthStore.setState({ accessToken: data.accessToken });
                // router.push("/dashboard/home");
            }
        } catch (error) {
            console.error("Error fetching refresh token: ", error);
            if (!isAuthPath) {
                router.push("/auth/login");
            }
        }
    }, [isAuthPath, router]);

    useEffect(() => {
        if (accessToken && isAuthPath) {
            router.push("/dashboard/home");
            return;
        }

        if (!accessToken) {
            fetchRefreshToken();
        }
    }, [accessToken, isAuthPath]);


    return (
        <AppRouterCacheProvider options={{ key: "mui" }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <CssBaseline />
                    {children}
                </QueryClientProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}