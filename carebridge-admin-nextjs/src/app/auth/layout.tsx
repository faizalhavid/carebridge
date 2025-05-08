"use client";

import AppLogo from '@/components/app_logo';
import { useAuthStore } from '@/lib/stores/auth_store';
import { redirect } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    // Check if the user is authenticated
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isAuthenticated) {
        redirect('/');
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100 overflow-hidden">
            <div
                className="block md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat blur-xs grayscale"
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
                className="relative flex flex-col justify-center flex-1 px-6 md:px-12 py-12 md:py-28 h-full gap-3 w-full bg-white/ md:bg-opacity-100"
            >
                <AppLogo size="large" />
                {children}
            </main>
        </div>
    );
}