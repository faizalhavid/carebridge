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
                    {(isMobile || !isSidebarExpanded) && <AppLogo size="small" variant="light" />}
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
                        color: scrolled ? "primary" : "white",
                        display: { xs: 'none', md: 'flex' },
                    }}
                >
                    <AccountCircle />
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

    )
}
