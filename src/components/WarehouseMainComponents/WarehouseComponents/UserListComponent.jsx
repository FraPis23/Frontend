import React, {useContext, useEffect, useState} from 'react';
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

import {getUsers, deleteUser} from "../../../services/WarehousePageSetupService";

import {UserContext} from "../../../contexts/UserContext";

function UserList({type, list, control}) {
    const {token, account, selectedWarehouse} = useContext(UserContext);
    const {upgradedUserList, setUpgradedUserList, upgradedWarehouseList} = useContext(UserContext);
    const [usersList, setUsersList] = useState([]);

    const handleDeleteUser = async (type, sub) => {
        const warehouseUpgraded = await deleteUser(type, sub, selectedWarehouse._id, token);
        await sessionStorage.setItem("warehouse", JSON.stringify(warehouseUpgraded));
        switch (type) {
            case 1:
                console.log("liste", warehouseUpgraded.lsAdminsId)
                setUsersList(warehouseUpgraded.lsAdminsId)
                break
            case 2:
                setUsersList(warehouseUpgraded.lsUsersId)
                break
        }
        setUpgradedUserList(upgradedUserList+1)
    }

    console.log("primo",token)

    useEffect(() => {
        getUsers(list, token)
            .then((response) => {
                setUsersList(response);
            })
    }, [list, upgradedWarehouseList]);

    let keyU = 0;
    return (
        <List className="usersList" sx={{bgcolor: 'background.paper' }}>
            {usersList && usersList.map((user) => {
                keyU = keyU +1
                return (
                    <ListItem
                        key={keyU}
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar`}
                                src={user.picture}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={user.nickname} className="itemText" />
                        {type === 1 && account.sub === list[0] && user.sub !== list[0] &&
                            <Tooltip title="Rimuovi" placement="left">
                                <IconButton
                                    aria-label="delete admin"
                                    onClick={() => handleDeleteUser(1, user.sub)}
                                >
                                    <PersonRemoveIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        {type === 2 && account.sub === control[0] &&
                            <Tooltip title="Rimuovi" placement="left">
                                <IconButton
                                    aria-label="delete admin"
                                    onClick={() => handleDeleteUser(2, user.sub)}
                                >
                                    <PersonRemoveIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        {type === 1 && account.sub === list[0] && user.sub !== list[0] &&
                            <Tooltip title="Declassa" placement="right">
                                <IconButton aria-label="delete admin">
                                    <VisibilityOffIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        {type === 2 && account.sub === control[0] &&
                            <Tooltip title="Promuovi" placement="right">
                                <IconButton aria-label="delete admin">
                                    <VisibilityIcon />
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
