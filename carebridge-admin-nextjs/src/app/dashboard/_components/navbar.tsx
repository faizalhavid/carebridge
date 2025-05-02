

export default function NavbarDashboard() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="flex-none gap-2">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V7M3 7l9 5m0 0l9-5m-9 5V3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
