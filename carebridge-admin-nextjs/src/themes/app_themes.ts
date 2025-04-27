import { createTheme } from '@mui/material/styles';
import { AppColors } from './app_colors';

const appThemes = createTheme({
    palette: {
        primary: {
            light: AppColors.primary[300],
            main: AppColors.primary[500],
            dark: AppColors.primary[700],
            contrastText: AppColors.neutral[0],
        },
        secondary: {
            light: AppColors.secondary[300],
            main: AppColors.secondary[500],
            dark: AppColors.secondary[400],
            contrastText: AppColors.neutral[100],
        },
        error: {
            light: AppColors.error[10],
            main: AppColors.error[20],
            dark: AppColors.error[30],
            contrastText: AppColors.neutral[0],
        },
        warning: {
            light: AppColors.warning[10],
            main: AppColors.warning[20],
            dark: AppColors.warning[30],
            contrastText: AppColors.neutral[100],
        },
        info: {
            light: AppColors.info[10],
            main: AppColors.info[20],
            dark: AppColors.info[30],
            contrastText: AppColors.neutral[0],
        },
        success: {
            light: AppColors.success[10],
            main: AppColors.success[20],
            dark: AppColors.success[30],
            contrastText: AppColors.neutral[0],
        },
        background: {
            default: AppColors.background,
            paper: AppColors.neutral[10],
        },
        text: {
            primary: AppColors.neutral[80],
            secondary: AppColors.neutral[60],
            disabled: AppColors.neutral[40],
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
                    backgroundColor: AppColors.primary[500],
                    color: AppColors.neutral[0],
                    boxShadow: 'none',
                    padding: '0 16px',
                },
            },
        },
    },
});

export default appThemes;