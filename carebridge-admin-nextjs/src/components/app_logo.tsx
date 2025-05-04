import Link from "next/link";




interface ColorLogoProps {

    primaryText: string;
    secondaryText: string;
    dotColor: string;
    dotHoverColor: string;

}

interface AppLogoProps {

    variant?: 'dark' | 'light' | 'default';
    size?: 'small' | 'medium' | 'large';
}

const AppLogo = ({
    variant = 'default',
    size = 'medium',
}: AppLogoProps) => {
    const sizeClasses = {
        small: {
            dot: "w-1 h-1",
            text: "text-xl",
        },
        medium: {
            dot: "w-1.25 h-1.25",
            text: "text-3xl",
        },
        large: {
            dot: "w-1.5 h-1.5",
            text: "text-4xl",
        },
    };
    const variantClasses = {
        dark: {
            primaryText: "text-neutral-700",
            secondaryText: "text-neutral-700",
            dotColor: "bg-yellow-500",
            dotHoverColor: "bg-yellow-300",
        },
        light: {
            primaryText: "text-white",
            secondaryText: "text-white",
            dotColor: "bg-yellow-500",
            dotHoverColor: "bg-yellow-300",
        },
        default: {
            primaryText: "text-primary-500",
            secondaryText: "text-neutral-700",
            dotColor: "bg-yellow-500",
            dotHoverColor: "bg-yellow-300",
        },
    };


    const colors: ColorLogoProps = variantClasses[variant];

    const currentSize = sizeClasses[size];



    return (
        <Link href="/" className="w-auto no-underline group p-0 m-0">
            <div className="inline-flex items-center justify-start transform transition-transform duration-300 group-hover:scale-105">
                <div className="flex flex-row gap-0.5 relative left-4.25 z-10">
                    <span
                        className={`${currentSize.dot} bg-yellow-300 rounded-full transition-colors duration-300 group-hover:bg-yellow-200`}
                    ></span>
                    <span
                        className={`${currentSize.dot} bg-yellow-300 rounded-full transition-colors duration-300 group-hover:bg-yellow-200`}
                    ></span>
                    <span
                        className={`${currentSize.dot} bg-yellow-300 rounded-full transition-colors duration-300 group-hover:bg-yellow-200`}
                    ></span>
                </div>
                <div className="px-0.5 flex">
                    <span
                        className={`font-semibold ${currentSize.text} transition-colors duration-300 opacity-100 group-hover:opacity-80 ${colors.primaryText} animate-fade`}
                        style={{ animationDelay: "0ms" }}
                    >
                        C
                    </span>
                    <span
                        className={`font-semibold ${currentSize.text} transition-colors duration-300 opacity-100 group-hover:opacity-80 ${colors.primaryText} animate-fade`}
                        style={{ animationDelay: "100ms" }}
                    >
                        a
                    </span>
                    <span
                        className={`font-semibold ${currentSize.text} transition-colors duration-300 opacity-100 group-hover:opacity-80 ${colors.primaryText} animate-fade`}
                        style={{ animationDelay: "200ms" }}
                    >
                        r
                    </span>
                    <span
                        className={`font-semibold ${currentSize.text} transition-colors duration-300 opacity-100 group-hover:opacity-80 ${colors.primaryText} animate-fade`}
                        style={{ animationDelay: "300ms" }}
                    >
                        e
                    </span>
                    <span
                        className={`${colors.secondaryText} font-semibold ${currentSize.text} transition-colors duration-300 group-hover:opacity-80 ${colors.secondaryText} opacity-100`}
                    >
                        Bridge
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default AppLogo;