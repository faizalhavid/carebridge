


import React from 'react'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1>Layout</h1>
            {children}
        </div>
    )
}
