import React, {useContext, useState} from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import Loading from '../../pages/LoadingPage'

import {UserContext} from "../../contexts/UserContext";


import '../../rendering/components/HeaderComponents/UserInfoComponent.css'
import LogoutButton from "./LogoutButtonComponent";


const UserInfo = () => {
    const { account } = useContext(UserContext);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box className="headerAvatar" sx={{ flexGrow: 0 }}>
            <Tooltip title="Info Account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Immagine Profilo" src={account.picture} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                    style: {
                        width: '250px',
                    },
                }}
            >
                <MenuItem>
                    <Avatar className="headerSecondAvatar" sx={{ width: 80, height: 80 }} alt="Immagine Profilo" src={account.picture} />
                </MenuItem>
                <MenuItem>
                    <Typography className="headerNickname"><PersonOutlineIcon/> <span className="headerNicknameSpan">{account.nickname}</span></Typography>
                </MenuItem>
                <LogoutButton />
            </Menu>
        </Box>
    )
}

export default UserInfo;