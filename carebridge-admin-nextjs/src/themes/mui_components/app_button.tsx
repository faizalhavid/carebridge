import React from "react";
import { Button, ButtonProps, Icon, Typography } from "@mui/material";
import { appFonts } from "../app_fonts";
import { AppColors } from "../app_colors";

enum AppButtonType {
    normal = "normal",
    big = "big",
    small = "small",
}

interface AppButtonProps extends Omit<ButtonProps, "color" | "onClick"> {
    customColor?: string;
    onTap?: () => void;
    isDisabled?: boolean;
    text?: string;
    textStyle?: React.CSSProperties;
    icon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    adjustIconSize?: number;
    buttonType?: AppButtonType;
    isFitParent?: boolean;
    backgroundColor?: string;
    children?: React.ReactNode;
}

const AppButton: React.FC<AppButtonProps> = function AppButton({
    customColor: color,
    onTap,
    isDisabled = false,
    text,
    textStyle,
    icon,
    suffixIcon,
    adjustIconSize = 0,
    buttonType = AppButtonType.normal,
    isFitParent = false,
    backgroundColor,
    children,
    ...props
}): React.ReactElement {
    // Border radius
    const borderRadius = 100;

    // Padding based on button type
    const getPadding = (): React.CSSProperties["padding"] => {
        if (icon && !text) {
            switch (buttonType) {
                case AppButtonType.normal:
                    return "8px";
                case AppButtonType.big:
                    return "10px";
                case AppButtonType.small:
                    return "8px";
                default:
                    return undefined;
            }
        } else {
            switch (buttonType) {
                case AppButtonType.normal:
                    return "16px 30px";
                case AppButtonType.big:
                    return "8px 18px";
                case AppButtonType.small:
                    return "6px 12px";
                default:
                    return undefined;
            }
        }
    };

    // Icon size
    const getIconSize = (): number => {
        switch (buttonType) {
            case AppButtonType.small:
                return (appFonts.caption.ts.fontSize ?? 12) + 1 + adjustIconSize;
            default:
                return (appFonts.body.ts.fontSize ?? 14) + 1 + adjustIconSize;
        }
    };

    // Icon color
    const getIconColor = (): string => {
        return isDisabled ? AppColors.neutral[40] : AppColors.neutral[0];
    };

    // Text style
    const getTextStyle = (): React.CSSProperties => {
        if (isDisabled) {
            switch (buttonType) {
                case AppButtonType.small:
                    return { ...appFonts.caption.ts, color: AppColors.neutral[40] };
                default:
                    return { ...appFonts.body.ts, color: AppColors.neutral[40] };
            }
        } else {
            switch (buttonType) {
                case AppButtonType.small:
                    return { ...appFonts.caption.ts, color: AppColors.primary[500] };
                default:
                    return { ...appFonts.body.ts, color: AppColors.primary[500] };
            }
        }
    };

    // Button child content
    const renderButtonChild = () => (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: getPadding(),
            }}
        >
            {icon && (
                <Icon
                    style={
                        {
                            fontSize: getIconSize(),
                            color: getIconColor(),
                            marginRight: text ? 4 : 0,
                        }
                    }
                >
                    {icon}
                </Icon>
            )}
            {
                text && (
                    <Typography style={{ ...getTextStyle(), ...textStyle }}>
                        {text}
                    </Typography>
                )
            }
            {
                suffixIcon && (
                    <Icon
                        style={
                            {
                                fontSize: getIconSize() - 2,
                                color: getIconColor(),
                                marginLeft: text ? 4 : 0,
                            }
                        }
                    >
                        {suffixIcon}
                    </Icon>
                )
            }
        </div>
    );

    return (
        <Button
            {...props}
            onClick={onTap}
            disabled={isDisabled}
            style={{
                backgroundColor: isDisabled
                    ? AppColors.neutral[40]
                    : backgroundColor || AppColors.primary[500],
                borderRadius,
                padding: 0,
                width: isFitParent ? "100%" : "auto",
                ...props.style,
            }}
        >
            {children || renderButtonChild()}
        </Button>
    );
};

export { AppButton, AppButtonType };