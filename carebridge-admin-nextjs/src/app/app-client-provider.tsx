"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import appThemes from "@/themes/app_themes";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth_store";
import AuthService from "@/lib/api/auth-service";
import { usePathname, useRouter } from "next/navigation";

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
    useEffect(() => {
        if (accessToken && isAuthPath) {
            router.push("/dashboard/home");
            return;
        }
        const fetchRefreshToken = async () => {
            try {
                const res = await AuthService.refreshToken();
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
        };

        if (!accessToken) {
            fetchRefreshToken();
        }
    }, [accessToken, isAuthPath]);


    return (
        <AppRouterCacheProvider options={{ key: "mui" }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}