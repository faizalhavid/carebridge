"use client";

import AppLogo from '@/components/app_logo';
import { useAuthStore, useIsAuthenticated } from '@/lib/stores/auth_store';
import { log } from 'console';
import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100 overflow-hidden">
            <div
                className="block md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat blur-[2px] grayscale"
                style={{ backgroundImage: "url('/images/auth-hero-1.jpg')" }}
            >
                <div className="absolute inset-0 bg-white opacity-25"></div>
            </div>
            <img
                src="/images/auth-hero-1.jpg"
                alt="Logo"
                className="hidden md:block object-cover md:w-1/2 h-full"
            />
            <main
                className="flex flex-col justify-center md:items-stretch flex-1 px-6 md:px-12 py-12 md:py-28 h-full w-full md:bg-opacity-100 relative z-10"
            >
                <AppLogo size="large" />
                {children}
            </main>
        </div>
    );
}