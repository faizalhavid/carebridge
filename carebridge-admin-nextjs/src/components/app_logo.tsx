import Link from "next/link";

interface AppLogoProps {
    colors?: {
        primaryText: string;
        secondaryText: string;
        dotColor: string;
        dotHoverColor: string;
    };
    size?: 'small' | 'medium' | 'large';
}

const AppLogo = ({
    colors = {
        primaryText: "text-primary-500",
        secondaryText: "text-neutral-800",
        dotColor: "bg-yellow-400",
        dotHoverColor: "bg-yellow-500",
    },
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

    const currentSize = sizeClasses[size];

    return (
        <Link href="/" className="w-auto no-underline group p-0 m-0">
            <div className="inline-flex items-center justify-start transform transition-transform duration-300 group-hover:scale-105">
                <div className="flex flex-row gap-0.5 relative left-4.25">
                    <span
                        className={`${currentSize.dot} ${colors.dotColor} rounded-full transition-colors duration-300 group-hover:${colors.dotHoverColor}`}
                    ></span>
                    <span
                        className={`${currentSize.dot} ${colors.dotColor} rounded-full transition-colors duration-300 group-hover:${colors.dotHoverColor}`}
                    ></span>
                    <span
                        className={`${currentSize.dot} ${colors.dotColor} rounded-full transition-colors duration-300 group-hover:${colors.dotHoverColor}`}
                    ></span>
                </div>
                <div className="px-0.5">
                    <span
                        className={`font-semibold ${currentSize.text} transition-colors duration-300 opacity-100 group-hover:opacity-80 ${colors.primaryText}`}
                    >
                        Care
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