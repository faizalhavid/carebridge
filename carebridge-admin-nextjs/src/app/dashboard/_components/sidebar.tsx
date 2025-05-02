import { Menu } from "@/interfaces/models/menu"
import { ChevronLeft } from "@mui/icons-material";
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon } from "@mui/material";


interface SidebarDashboardProps {
    items: Array<Menu>;
    isExpand?: boolean;
    onClikcButtonExpand?: () => void;
}


export default function SidebarDashboard({ items, isExpand: isOpen = true, onClikcButtonExpand }: SidebarDashboardProps) {

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={onClikcButtonExpand}>
            <List>
                {items.map((item) => (
                    <ListItem key={item.id} onClick={() => console.log(item.url)} disablePadding>
                        <ListItemIcon>
                            <ListItemIcon>{item.smallIcon}</ListItemIcon>
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
        </Box>

    );
    return (
        <>
            <Drawer open={isOpen} variant="persistent" anchor="left" onClose={onClikcButtonExpand}>
                {DrawerList}
            </Drawer>
        </>
    )
}
