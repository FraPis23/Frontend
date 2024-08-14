import React from 'react';
import LoadingPage from "../pages/LoadingPage";
import {Avatar} from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const UserInfo = ({user}) => {
    if(!user){
        return <LoadingPage />
    }

    return (
        <div className='userInfo'>
            <h2>User Information</h2>
            <Avatar alt="Profile Image" src={user.picture}/>
            <p><PersonOutlineIcon /> {user.nickname}</p>
            <p><MailOutlineIcon /> {user.email}</p>
            <p></p>
        </div>
    )
}

export default UserInfo;