import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import UserInfo from './UserInfoComponent'

import logo from '../../images/HomeImages/warehouseLogo-removebg-preview-fotor-2024081683521.png'

import '../../rendering/components/HeaderComponents/HeaderComponent.css'


function HomeHeader() {
    return (
        <AppBar position="static">
            <Container maxWidth="100vw">
                <Toolbar disableGutters>
                    <Box className="headerBar">
                        <img className="headerLogo" src={logo} alt="logo"/>
                        <UserInfo className="headerAvatar"/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default HomeHeader;