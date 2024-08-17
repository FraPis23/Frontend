import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const SidebarMenu = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen); // Inverte lo stato di apertura/chiusura della sidebar
    };

    return (
        <div>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ position: 'fixed', top: 10, left: 10 }}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer} // Ripristina l'onClose per il pulsante
                PaperProps={{
                    style: { top: '64px', height: 'calc(100% - 64px)' } // Posiziona sotto l'header
                }}

            >
                <div
                    role="presentation"
                    style={{ width: 250 }}
                >
                    <List>
                        <ListItem>
                            <ListItemText primary="PiscopoGaty" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default SidebarMenu;
