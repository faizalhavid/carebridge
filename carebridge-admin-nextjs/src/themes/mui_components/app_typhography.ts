import { Components, Theme } from "@mui/material";
import { appFonts } from "../app_fonts";

const appTyphography: Components<Theme> = {
    MuiTypography: {
        defaultProps: {
            variantMapping: {
                h1: 'h1',
                h2: 'h2',
                h3: 'h3',
                h4: 'h4',
                h5: 'h5',
                h6: 'h6',
                subtitle1: 'h6',
                subtitle2: 'h6',
                body1: 'p',
                body2: 'p',
                caption: 'span',
            },
        },
        styleOverrides: {
            root: {
                fontFamily: "Inter, Arial, sans-serif",
            },
        },
        variants: [
            {
                props: { variant: 'h1' },
                style: { ...appFonts.title.ts },
            },
            {
                props: { variant: 'h2' },
                style: { ...appFonts.titleSmall.ts },
            },
            {
                props: { variant: 'subtitle1' },
                style: { ...appFonts.subtitle.ts },
            },
            {
                props: { variant: 'body1' },
                style: { ...appFonts.body.ts },
            },
            {
                props: { variant: 'caption' },
                style: { ...appFonts.caption.ts },
            },
            {
                props: { variant: 'button' },
                style: { ...appFonts.body.bold.ts },
            },
        ],
    },
};
export default appTyphography;