import React from 'react';
import {useNavigate} from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import logo from '../../images/HomeImages/warehouseLogo-removebg-preview-fotor-2024081683521.png'

import '../../rendering/components/HeaderComponents/HeaderComponent.css'

import UserInfo from "../HomeHeaderComponents/UserInfoComponent";


function HeaderProva() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/home');
    };

    return (
        <AppBar position="static">
            <Container maxWidth="100vw">
                <Toolbar disableGutters>
                    <Box className="headerBar">
                        <img
                            className="headerLogo"
                            src={logo}
                            alt="logo"
                            onClick={handleLogoClick}
                        />
                        <UserInfo className="headerAvatar"/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default HeaderProva;