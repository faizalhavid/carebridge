"use client"
import React from 'react'
import SidebarDashboard from './_components/sidebar'
import DashboardFooter from './_components/footer'
import NavbarDashboard from './_components/navbar'
import { Menu } from '@/interfaces/models/menu'
import { ChevronLeft } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const menus: Menu[] = [
        {
            id: 1,
            name: 'Home',
            smallIcon: 'home',
            bigIcon: 'home',
            url: '/dashboard/home',
            parentId: null
        }
    ];

    const [isExpand, setIsExpand] = React.useState(true);

    return (
        <main className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex flex-row flex-1">
                <div className="w-64 bg-gray-800 text-white">
                    {/* Sidebar component */}
                    <SidebarDashboard items={menus} isExpand={isExpand} onClikcButtonExpand={() => setIsExpand(!isExpand)} />
                </div>
                <div className="flex-1 flex flex-col p-4">
                    {/* Navbar component */}
                    <NavbarDashboard />
                    <Box sx={{ width: 250 }}>
                        <IconButton onClick={() => setIsExpand(!isExpand)} className="absolute top-4 left-4 z-10">
                            <ChevronLeft />
                        </IconButton>
                    </Box>
                    {children}
                </div>
            </div>
            {/* Footer component */}
            <DashboardFooter />
        </main>

    )
}