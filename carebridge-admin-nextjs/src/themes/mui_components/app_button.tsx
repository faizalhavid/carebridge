import React from "react";
import { Button, ButtonProps, Icon, Typography } from "@mui/material";
import { appFonts } from "../app_fonts";
import { appColors } from "../app_colors";



interface AppButtonProps extends Omit<ButtonProps, "color" | "onClick"> {
    onClick?: () => void;
    isDisabled?: boolean;
    text?: string;
    textStyle?: React.CSSProperties;
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    adjustIconSize?: number;
    buttonType?: "normal" | "big" | "small";
    isFitParent?: boolean;
    backgroundColor?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
    children?: React.ReactNode;
    variant?: "text" | "outlined" | "contained";
}

export const AppButton: React.FC<AppButtonProps> = function AppButton({
    onClick: onTap,
    isDisabled = false,
    text,
    textStyle,
    icon,
    endIcon,
    adjustIconSize = 0,
    buttonType = "normal",
    isFitParent = false,
    backgroundColor,
    variant = "contained",
    children,
    ...props
}): React.ReactElement {




    return (
        <Button
            {...props}
            onClick={onTap}
            disabled={isDisabled}
            startIcon={icon}
            endIcon={endIcon}
            style={{
                ...(isFitParent ? { width: "100%" } : {}),
            }}
            variant={variant}
        >
            {children}
        </Button>
    );
};