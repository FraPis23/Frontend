import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserInfo from '../components/UserInfoComponent';



const SidebarMenu = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    return (
        <div>
            {/* Icona del menu in alto a destra */}
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ position: 'fixed', top: 10, left: 10 }}
            >
                <MenuIcon />
            </IconButton>


            {/* Sidebar */}

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
            >
                <div
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    style={{ width: 250}}
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
