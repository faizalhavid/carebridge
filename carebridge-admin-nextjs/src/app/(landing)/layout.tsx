"use client'"

import React from 'react'
import LandingNavbar from './components/landing_navbar'

import './landing.css'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <LandingNavbar />
            {children}
        </div>
    )
}
