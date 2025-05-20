
import AppLogo from "@/components/app_logo";
import { Menu } from "@/interfaces/models/menu"
import { AppButton } from "@/themes/mui_components/app_button";
import { ChevronLeft } from "@mui/icons-material";
import { Box, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Theme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

interface SidebarDashboardProps {
    items: Array<Menu>;
    isExpand?: boolean;
    onClickButtonExpand?: () => void;
}


export default function SidebarDashboard({ items, isExpand = true, onClickButtonExpand: onClikcButtonExpand }: SidebarDashboardProps) {
    const router = useRouter();


    const DrawerList = (
        <Box sx={{ width: 250, paddingY: 2, display: "flex", flexDirection: "column", height: "100%" }} role="presentation">
            <List sx={{ flex: 1 }}>
                <ListItem sx={{ mb: 2 }} disablePadding>
                    <AppLogo />
                </ListItem>
                <Divider sx={{ my: 1 }} />
                {items.map((item) => (
                    <ListItem key={item.name} onClick={() => router.push(`/dashboard/${item.url}`)} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon>{item.smallIcon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <ListItem sx={{ mt: "auto", mb: 2 }}>
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
            onClose={onClikcButtonExpand}
            variant="persistent"
            ModalProps={
                { keepMounted: true }
            }
            sx={{
                width: isExpand ? 250 : 0,
                display: { xs: "none", sm: "block" },
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isExpand ? 250 : 0,
                    boxSizing: 'border-box',
                    transition: 'width 2s ease-in-out',
                },
            }
            }
        >
            {DrawerList}
        </ Drawer>
    )
}
