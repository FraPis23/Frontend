import React, {useContext, useEffect, useState} from 'react';
import Cookies from "js-cookie";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './UserListComponent.css'

import {getUsers, deleteUser, modifyPermissions} from "../../../services/WarehousePageSetupService";

import {UserContext} from "../../../contexts/UserContext";

function UserList({type, list, control}) {
    const {token, account, selectedWarehouse} = useContext(UserContext);
    const {upgradedUserList, setUpgradedUserList, upgradedWarehouseList} = useContext(UserContext);
    const [usersList, setUsersList] = useState([]);

    const handleDeleteUser = async (type, sub) => {
        const warehouseUpgraded = await deleteUser(type, sub, selectedWarehouse._id, token, JSON.parse(Cookies.get('sessionUser')).sub);
        await sessionStorage.setItem("warehouse", JSON.stringify(warehouseUpgraded));
        setUpgradedUserList(upgradedUserList+1)
    }

    const handleModifyPermissions = async (type, sub) => {
        const warehouseUpgraded = await modifyPermissions(type, sub, selectedWarehouse._id, token);
        await sessionStorage.setItem("warehouse", JSON.stringify(warehouseUpgraded));
        setUpgradedUserList(upgradedUserList+1);
    }

    useEffect(() => {
        getUsers(list, token)
            .then((response) => {
                setUsersList(response);
            })
    }, [list, upgradedWarehouseList]);

    return (
        <List className="usersList" sx={{bgcolor: 'background.paper' }}>
            {usersList && usersList.map((user, index) => {
                return (
                    <ListItem
                        key={index}
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar`}
                                src={user.picture}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={user.nickname} className="itemText" />
                        {type === 1 && JSON.parse(Cookies.get('sessionUser')).sub === list[0] && user.sub !== list[0] &&
                            <Tooltip title="Declassa" placement="right">
                                <IconButton
                                    aria-label="downgrade admin"
                                    onClick={() => handleModifyPermissions(1, user.sub)}
                                >
                                    <VisibilityOffIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        {type === 2 && JSON.parse(Cookies.get('sessionUser')).sub === control[0] &&
                            <Tooltip title="Promuovi" placement="right">
                                <IconButton
                                    aria-label="upgrade user"
                                    onClick={() => handleModifyPermissions(2, user.sub)}
                                >
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        {type === 1 && JSON.parse(Cookies.get('sessionUser')).sub === list[0] && user.sub !== list[0] &&
                            <Tooltip title="Rimuovi" placement="left">
                                <IconButton
                                    aria-label="delete admin"
                                    onClick={() => handleDeleteUser(1, user.sub)}
                                >
                                    <PersonRemoveIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        {type === 2 && control.includes(JSON.parse(Cookies.get('sessionUser')).sub) &&
                            <Tooltip title="Rimuovi" placement="left">
                                <IconButton
                                    aria-label="delete user"
                                    onClick={() => handleDeleteUser(2, user.sub)}
                                >
                                    <PersonRemoveIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    </ListItem>
                );
            })}
        </List>
    );
}

export default UserList;
