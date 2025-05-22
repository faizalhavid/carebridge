'use client'

import { useAuthStore, useIsAuthenticated } from '@/lib/stores/auth_store'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function DashboardPage() {
    const isAuthenticated = useIsAuthenticated();
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login')
        } else {
            router.push('/dashboard/home')
        }
    }, [router])

    // router.push('/dashboard/home');
}