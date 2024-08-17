import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddWarehouse from "./AddWarehouseComponent";
import ViewYourWarehouse from "./ViewYourWarehousesComponent";
import '../rendering/components/SidebarMenuComponent.css'
import {blue} from "@mui/material/colors";


const SidebarMenu = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1301 }} //Ho messo il ManuIcon in rilievo su ase Z per poterlo sempre cliccare
            >
                <MenuIcon />
            </IconButton>



            <Drawer
                anchor="left"
                open={isDrawerOpen}
                ModalProps={{
                    //hideBackdrop:true //per non opacizzare lo sfondo quando apri la tendina
                }}
                PaperProps={{
                    style: { top: '64px', height: 'calc(100% - 64px)' } // Regola la posizione sotto l'header (considerato alto 64)
                }}

            >
                <div
                    role="presentation"
                    style={{ width: 250}}
                >

                    <List>
                        <ListItem>
                            <ListItemText className="SidebarHeader" primary="Gestione Magazzini"/>
                            <AddWarehouse />
                            <ViewYourWarehouse />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default SidebarMenu;
