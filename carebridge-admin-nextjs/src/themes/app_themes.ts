import { createTheme } from '@mui/material/styles';
import { appColors } from './app_colors';

const appThemes = createTheme({
    palette: {
        primary: {
            light: appColors.primary[300],
            main: appColors.primary[500],
            dark: appColors.primary[700],
            contrastText: appColors.neutral[0],
        },
        secondary: {
            light: appColors.secondary[300],
            main: appColors.secondary[500],
            dark: appColors.secondary[400],
            contrastText: appColors.neutral[100],
        },
        error: {
            light: appColors.error[10],
            main: appColors.error[20],
            dark: appColors.error[30],
            contrastText: appColors.neutral[0],
        },
        warning: {
            light: appColors.warning[10],
            main: appColors.warning[20],
            dark: appColors.warning[30],
            contrastText: appColors.neutral[100],
        },
        info: {
            light: appColors.info[10],
            main: appColors.info[20],
            dark: appColors.info[30],
            contrastText: appColors.neutral[0],
        },
        success: {
            light: appColors.success[10],
            main: appColors.success[20],
            dark: appColors.success[30],
            contrastText: appColors.neutral[0],
        },
        background: {
            default: appColors.background,
            paper: appColors.neutral[10],
        },
        text: {
            primary: appColors.neutral[80],
            secondary: appColors.neutral[60],
            disabled: appColors.neutral[40],
        },
        action: {
            // disabled: appColors.neutral[50],
            // disabledBackground: appColors.neutral[40],
            // hover: appColors.neutral[10],
            // hoverOpacity: 0.08,
        },

    },
    components: {
        MuiAppBar: {
            defaultProps: {
                position: 'static',
                color: 'primary',
            },
            styleOverrides: {
                root: {
                    backgroundColor: appColors.primary[500],
                    color: appColors.neutral[0],
                    boxShadow: 'none',
                    padding: '0 16px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    shadow: "none",
                    boxShadow: "none",

                },
            },
        },


    },
});

export default appThemes;