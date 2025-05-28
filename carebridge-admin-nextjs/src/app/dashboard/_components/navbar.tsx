<<<<<<< HEAD
import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Theme, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import AppLogo from "@/components/app-logo";
import { Menu as MenuInterface } from "@/interfaces/models/menu";
import pages from "next/dist/build/templates/pages";

interface NavbarDashboardProps {
    isSidebarExpanded: boolean;
    toggleSidebar?: () => void
    items: Array<MenuInterface>;
}

export default function NavbarDashboard({ isSidebarExpanded, items, toggleSidebar }: NavbarDashboardProps) {

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [scrolled, setScrolled] = React.useState(false);

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (

        <AppBar style={{ position: "fixed" }}
            sx={{
                transition: "background-color 0.3s, backdrop-filter 0.3s",
                backgroundColor: scrolled
                    ? "rgba(244, 244, 244, 0.38)"
                    : "primary.main",
                backdropFilter: scrolled ? "blur(6px)" : "none",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar>
                {isMobile && (
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleSidebar}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Box sx={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start", alignItems: "center", flexGrow: isMobile ? 1 : 0 }}>
                    {(isMobile || !isSidebarExpanded) && <AppLogo size="small" variant={scrolled ? 'dark' : 'light'} />}
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {items.map((item, index) => (
                        <Button
                            key={index}
                            onClick={() => console.log(item.url)}
                            sx={{ my: 2, color: scrolled ? 'primary' : 'white', display: 'block' }}
                        >
                            {item.name}
                        </Button>
                    ))}
                </Box>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    sx={{
                        marginLeft: "auto",

                        display: { xs: 'none', md: 'flex' },
                    }}
                >
                    <AccountCircle sx={{
                        color: scrolled ? "black" : "white",
                    }} />
                </IconButton>


                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>


            </Toolbar>
        </AppBar>

=======


export default function NavbarDashboard() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="flex-none gap-2">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V7M3 7l9 5m0 0l9-5m-9 5V3" />
                    </svg>
                </button>
            </div>
        </div>
>>>>>>> 1046b01 (feat: Refactor dashboard layout with sidebar, navbar, and footer components; add home page and OTP fields component)
    )
}
