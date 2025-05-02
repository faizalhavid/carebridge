import React from "react";
import { Button, ButtonProps, Icon, Typography } from "@mui/material";
import { appFonts } from "../app_fonts";
import { appColors } from "../app_colors";



interface AppButtonProps extends Omit<ButtonProps, "color" | "onClick"> {
    customColor?: string;
    onTap?: () => void;
    isDisabled?: boolean;
    text?: string;
    textStyle?: React.CSSProperties;
    icon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    adjustIconSize?: number;
    buttonType?: "normal" | "big" | "small";
    isFitParent?: boolean;
    backgroundColor?: string;
    children?: React.ReactNode;
    variant?: "text" | "outlined" | "contained";
}

export const AppButton: React.FC<AppButtonProps> = function AppButton({
    customColor: color,
    onTap,
    isDisabled = false,
    text,
    textStyle,
    icon,
    suffixIcon,
    adjustIconSize = 0,
    buttonType = "normal",
    isFitParent = false,
    backgroundColor,
    variant = "contained",
    children,
    ...props
}): React.ReactElement {
    const borderRadius = 100;

    const getPadding = (): React.CSSProperties["padding"] => {
        if (icon && !text) {
            switch (buttonType) {
                case "normal":
                    return "8px";
                case "big":
                    return "10px";
                case "small":
                    return "8px";
                default:
                    return undefined;
            }
        } else {
            switch (buttonType) {
                case "normal":
                    return "16px 30px";
                case "big":
                    return "8px 18px";
                case "small":
                    return "6px 12px";
                default:
                    return undefined;
            }
        }
    };

    // Icon size
    const getIconSize = (): number => {
        switch (buttonType) {
            case "small":
                return (appFonts.caption.ts.fontSize ?? 12) + 1 + adjustIconSize;
            default:
                return (appFonts.body.ts.fontSize ?? 14) + 1 + adjustIconSize;
        }
    };

    // Icon color
    const getIconColor = (): string => {
        return isDisabled ? appColors.neutral[40] : appColors.neutral[0];
    };

    // Text style
    const getTextStyle = (): React.CSSProperties => {
        if (isDisabled) {
            switch (buttonType) {
                case "small":
                    return { ...appFonts.caption.ts, color: appColors.neutral[40] };
                default:
                    return { ...appFonts.body.ts, color: appColors.neutral[40] };
            }
        } else {
            switch (buttonType) {
                case "small":
                    return { ...appFonts.caption.ts, color: appColors.primary[500] };
                default:
                    return { ...appFonts.body.ts, color: appColors.primary[500] };
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
            {
                text && (
                    <Typography style={{ ...getTextStyle(), ...textStyle }}>
                        {text}
                    </Typography>
                )
            }

        </div >
    );

    return (
        <Button
            {...props}
            onClick={onTap}
            disabled={isDisabled}
            startIcon={icon && <Icon style={{ fontSize: getIconSize(), color: getIconColor() }}>{icon}</Icon>}
            endIcon={suffixIcon && <Icon style={{ fontSize: getIconSize(), color: getIconColor() }}>{suffixIcon}</Icon>}
            style={{
                // width: isFitParent ? "100%" : "auto",
                ...props.style,
            }}
            variant={variant}
        >
            {children || renderButtonChild()}

        </Button>
    );
};