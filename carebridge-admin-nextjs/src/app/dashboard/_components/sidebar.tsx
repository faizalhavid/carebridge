import AppLogo from "@/components/app_logo";
import { Menu } from "@/interfaces/models/menu"
import { ChevronLeft } from "@mui/icons-material";
import { Box, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface SidebarDashboardProps {
    items: Array<Menu>;
    isExpand?: boolean;
    onClikcButtonExpand?: () => void;
}


export default function SidebarDashboard({ items, isExpand = true, onClikcButtonExpand }: SidebarDashboardProps) {

    const DrawerList = (
        <Box sx={{ width: 250, paddingY: 2 }} role="presentation" onClick={onClikcButtonExpand}>
            <List>
                <ListItem sx={{ mb: 2 }} disablePadding>
                    <AppLogo />
                </ListItem>
                <Divider sx={{ my: 1 }} />
                {items.map((item) => (
                    <ListItem key={item.id} onClick={() => console.log(item.url)} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon>{item.smallIcon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>

    );
    return (
        <Drawer
            open={isExpand}
            anchor="left"
            onClose={onClikcButtonExpand}
            variant="persistent"
            sx={{
                width: isExpand ? 250 : 0,
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
    )
}
