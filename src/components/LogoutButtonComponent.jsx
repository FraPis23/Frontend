import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout';

import '../rendering/components/LogoutButtonComponent.css'

function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <Button
            variant="outlined"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            startIcon={<LogoutIcon />}
            sx={{
                color: '#e2e2e2',
                borderColor: '#e2e2e2',
                '&:hover': {
                    backgroundColor: '#7d7574'
                }
            }}
            className='logoutButton'
        >
            Esci
        </Button>
    );
}

export default LogoutButton;