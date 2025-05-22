"use client"
import React, { useEffect, useRef } from "react";
import SidebarDashboard from "./_components/sidebar";
import DashboardFooter from "./_components/footer";
import NavbarDashboard from "./_components/navbar";
import { Menu } from "@/interfaces/models/menu";
import { ChevronLeft, Dashboard } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery, Theme } from "@mui/material";
import { useAuthStore, useIsAuthenticated } from "@/lib/stores/auth_store";
import DashboardService from "@/lib/api/dashboard-service";
import { fetcher } from "@/lib/utils/fetcher";
import { RepositoryRestResource } from "@/interfaces/server-res";
import { createApiStore } from "@/lib/stores/api_store";



const menus: Menu[] = [
    {
        id: 1,
        name: "Home",
        smallIcon: "home_icon",
        bigIcon: "home",
        url: "/dashboard/home",
        parentId: null,
    },
];

const menuNavbar: Menu[] = [
    {
        id: 1,
        name: "Home",
        smallIcon: "home_icon",
        bigIcon: "home",
        url: "/dashboard/home",
        parentId: null,
    },
];
const useMenuStore = createApiStore<RepositoryRestResource<Menu[]>>(
    () => fetcher('/admin/menus', { method: 'GET' }, true)
);

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const { data, loading, error, fetchData } = useMenuStore();
    useEffect(() => {
        setIsSidebarExpanded(!isMobile);
    }, [isMobile]);


    useEffect(() => {
        // menuStore.fetchMenus();
        fetchData();
    }, []);



    return (
        <main className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex flex-row flex-1">
                <SidebarDashboard
                    items={data?._embedded.menus.flat() || menus}
                    isExpand={isSidebarExpanded}
                    onClickButtonExpand={() => setIsSidebarExpanded((prev) => !prev)}
                />
                <div className="flex-1 flex flex-col">
                    <NavbarDashboard isSidebarExpanded={isSidebarExpanded} items={menuNavbar} toggleSidebar={() => setIsSidebarExpanded((prev) => !prev)} />
                    {!isMobile && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                zIndex: 1301,

                            }}
                        >
                            <IconButton
                                onClick={() => setIsSidebarExpanded((prev) => !prev)}
                                className="absolute right-[12px] top-1/2 transform -translate-y-1/2 z-99 shadow-md"
                                sx={{
                                    transition: "transform 0.3s ease-in-out",
                                    bgcolor: "white",
                                    "&:hover": {
                                        bgcolor: "grey.200",
                                    },
                                }}
                            >
                                <ChevronLeft
                                    sx={{
                                        transform: !isSidebarExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.3s ease-in-out",
                                    }}
                                />
                            </IconButton>
                        </Box>
                    )}
                    {children}
                </div>
            </div>
            {/* Footer component */}
            <DashboardFooter />
        </main>
    );
}