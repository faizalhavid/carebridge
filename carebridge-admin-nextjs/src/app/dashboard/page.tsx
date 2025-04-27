'use client'

import { useAuthStore } from '@/stores/auth_store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function DashboardPage() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login') // Redirect to login if not authenticated
        }
    }, [isAuthenticated, router])

    return (
        <div>DashboardPage</div>
    )
}