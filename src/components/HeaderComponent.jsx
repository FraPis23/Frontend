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
    const { logout, isLoading } = useAuth0();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleAddWarehouse = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

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