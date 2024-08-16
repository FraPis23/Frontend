import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';

import Loading from '../pages/LoadingPage'
import UserInfo from '../components/UserInfoComponent'
import SidebarMenu from "./SidebarMenuComponent";

import logo from '../images/warehouseLogo-removebg-preview-fotor-2024081683521.png'

import '../rendering/components/HeaderComponent.css'


function Header() {
    const { isLoading } = useAuth0();

    if (isLoading)
        return <Loading />

    return (
        <AppBar position="static">
            <Container maxWidth="100vw">
                <Toolbar disableGutters>
                    <Box className="headerBar">
                        <SidebarMenu />
                        <img className="headerLogo" src={logo} alt="logo"/>
                        <UserInfo />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;