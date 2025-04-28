import AppLogo from "@/components/app_logo";

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-3 items-center  min-h-screen">
            <AppLogo size="medium" />
            <h1 className="text-primary-500">Login Page</h1>
            <p>This is the login page.</p>
        </div>
    );
}