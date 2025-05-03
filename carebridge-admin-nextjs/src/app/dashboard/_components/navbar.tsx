import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Theme, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import AppLogo from "@/components/app_logo";
import { Menu as MenuInterface } from "@/interfaces/models/menu";
import pages from "next/dist/build/templates/pages";

interface NavbarDashboardProps {
    isSidebarExpanded: boolean;
    items: Array<MenuInterface>;
}

export default function NavbarDashboard({ isSidebarExpanded, items: menuNavbar }: NavbarDashboardProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    return (
        <Box sx={{ flexGrow: 1 }}>

            <AppBar position="static">
                <Toolbar>
                    {!isSidebarExpanded && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Box component="div" sx={{ flexGrow: 1 }}>
                        {
                            !isSidebarExpanded && (
                                <AppLogo />
                            )
                        }
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {menuNavbar.map((item, index) => (
                            <Button
                                key={index}
                                onClick={() => console.log(item.url)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Box>

                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
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
                    </div>

                </Toolbar>
            </AppBar>
        </Box>
    )
}
