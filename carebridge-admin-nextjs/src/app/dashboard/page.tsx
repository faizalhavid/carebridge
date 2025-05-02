'use client'

import { useAuthStore } from '@/stores/auth_store'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function DashboardPage() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const router = useRouter()

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         router.push('/auth/login')
    //     }
    // }, [isAuthenticated, router])

    redirect('/dashboard/home');
}