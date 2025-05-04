"use client"
import React, { useEffect } from "react";
import SidebarDashboard from "./_components/sidebar";
import DashboardFooter from "./_components/footer";
import NavbarDashboard from "./_components/navbar";
import { Menu } from "@/interfaces/models/menu";
import { ChevronLeft } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery, Theme } from "@mui/material";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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

    const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    useEffect(() => {
        setIsSidebarExpanded(!isMobile);
    }, [isMobile]);



    return (
        <main className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex flex-row flex-1 relative">
                <SidebarDashboard
                    items={menus}
                    isExpand={isSidebarExpanded}
                    onClickButtonExpand={() => setIsSidebarExpanded((prev) => !prev)}
                />
                <div className="flex-1 flex flex-col">
                    <NavbarDashboard isSidebarExpanded items={menuNavbar} toggleSidebar={() => setIsSidebarExpanded((prev) => !prev)} />
                    {!isMobile && (
                        <Box
                            sx={{
                                width: 250,
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                zIndex: 1301,
                            }}
                        >
                            <IconButton
                                onClick={() => setIsSidebarExpanded((prev) => !prev)}
                                className="absolute right-[12px] top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md"
                                sx={{
                                    transition: "transform 0.3s ease-in-out",
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