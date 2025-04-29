"use client";

import AppLogo from '@/components/app_logo';
import { useAuthStore } from '@/stores/auth_store';
import { redirect } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    // Check if the user is authenticated
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    if (isAuthenticated) {
        redirect('/');
    }

    return (
        <div className="flex flex-row items-center justify-center h-screen bg-cover bg-center bg-no-repeat bg-gray-100 overflow-hidden">
            <img
                src="/images/auth-hero-1.jpg"
                alt="Logo"
                className="object-cover w-1/2 h-full"
            />
            <main
                className="flex flex-col justify-center flex-1 px-12 py-28 h-full gap-3"
            >
                {children}
            </main>
        </div>

    );
}