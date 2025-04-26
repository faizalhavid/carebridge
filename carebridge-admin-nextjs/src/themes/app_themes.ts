import { createTheme } from '@mui/material/styles';
import { AppColors } from './app_colors';
import { appFonts } from './app_fonts';
import appTypography from './mui_components/app_typhography';
import { AppButton } from './mui_components/app_button';

const theme = createTheme({
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
    // typography: {
    //     fontFamily: 'Inter, Arial, sans-serif',
    //     h1: appFonts.title.copyWith({ fontSize: 32 }).ts,
    //     h2: appFonts.titleSmall.copyWith({ fontSize: 24 }).ts,
    //     subtitle1: appFonts.subtitle.ts,
    //     body1: appFonts.body.ts,
    //     caption: appFonts.caption.ts,
    //     button: appFonts.body.bold.ts,
    // },
    components: {
        MuiTypography: appTypography,
        MuiButton: AppButton,
    },
});

export default theme;