"use client'"

import React from 'react'
import NavbarLanding from './components/navbar'

import './landing.css'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavbarLanding />
            {children}
        </div>
    )
}
