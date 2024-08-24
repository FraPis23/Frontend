import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import LogoutIcon from '@mui/icons-material/Logout';

import '../../rendering/components/HeaderComponents/LogoutButtonComponent.css'

function LogoutButton() {
    const { logout } = useAuth0();

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

    return (
        <MenuItem onClick={handleLogout}>
            <Typography className="headerExit"><LogoutIcon /> Esci</Typography>
        </MenuItem>
    );
}

export default LogoutButton;