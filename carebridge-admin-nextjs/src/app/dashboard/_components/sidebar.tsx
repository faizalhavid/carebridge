
import AppLogo from "@/components/app_logo";
import { Menu } from "@/interfaces/models/menu"
import { AppButton } from "@/themes/mui_components/app_button";
import { Box, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Theme, useMediaQuery } from "@mui/material";
import { redirect, usePathname, useRouter } from "next/navigation";

interface SidebarDashboardProps {
    items: Array<Menu>;
    isExpand?: boolean;
    onClickButtonExpand?: () => void;
}


export default function SidebarDashboard({ items, isExpand = true, onClickButtonExpand }: SidebarDashboardProps) {
    const currentPath = `/${usePathname().split("/")[2]}`;

    const DrawerList = (
        <Box sx={{ width: 250, paddingY: 2, display: "flex", flexDirection: "column", height: "100%" }} role="presentation">
            <ListItem sx={{ mb: 1, justifyContent: "center", display: "flex" }} disablePadding>
                <AppLogo />
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ flex: 1, overflowY: "auto" }}>
                <List>
                    {items.map((item) => (
                        <ListItem key={item.name} onClick={() => redirect(`/dashboard/${item.url}`)} disablePadding>
                            <ListItemButton selected={currentPath.includes(item.url)} sx={{ borderRadius: 1 }}>
                                <ListItemIcon>
                                    <Icon color={currentPath.includes(item.url) ? "primary" : "disabled"} sx={{ fontSize: 20 }}>
                                        {item.smallIcon}
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ color: currentPath.includes(item.url) ? "primary.main" : "neutral" }}
                                    primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <ListItem sx={{ mt: 2 }}>
                <AppButton backgroundColor="error" isFitParent variant="contained" size="small" onClick={() => console.log("test")}>
                    Logout
                </AppButton>
            </ListItem>
        </Box >
    );
    return (
        <Drawer
            open={isExpand}
            anchor="left"
            onClose={onClickButtonExpand}
            variant="persistent"
            ModalProps={{ keepMounted: true }}
            sx={{
                width: isExpand ? 250 : 0,
                display: { xs: "none", sm: "block" },
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isExpand ? 250 : 0,
                    boxSizing: 'border-box',
                    transition: 'width 2s ease-in-out',
                },
            }}
        >
            {DrawerList}
        </Drawer>
    );
}
