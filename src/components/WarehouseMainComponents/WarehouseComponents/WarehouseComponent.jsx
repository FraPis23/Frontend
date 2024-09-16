import React, {useContext, useEffect, useState} from 'react';
import Cookies from "js-cookie";
import { socket } from '../../../socket';
import {useNavigate} from "react-router-dom";

import './WarehouseComponent.css';

import {UserContext} from "../../../contexts/UserContext";

import {Box, Grid, Modal} from "@mui/material";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Bin from "./BinComponent";
import UserList from "./UserListComponent";
import Object from "../WarehouseObjectComponent/ObjectCardComponent";
import AddObjectCard from "../WarehouseObjectComponent/AddObjectCardComponent"
import AddUserToList from "./AddUserToListComponent";
import Loading from "../../../pages/LoadingPage";

import {getWarehouse} from "../../../services/HomePageSetupService";
import {getUsers, createThing} from "../../../services/WarehousePageSetupService";

const Warehouse = () => {
    const {selectedWarehouse, setSelectedWarehouse} = useContext(UserContext);
    const {upgradedWarehouseList, setUpgradedWarehouseList, upgradedUserList} = useContext(UserContext);
    const {setList} = useContext(UserContext);
    const {token, account} = useContext(UserContext);
    const {upgradeObjects, setUpgradeObjects} = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const {userDeleted, setUserDeleted} = useContext(UserContext);
    const [ready, setReady] = useState(false);
    const navigate = useNavigate();


    const handleCreateThing = async (newThing) => {
        try {
            if (isNaN(parseFloat(newThing.quantity))) {
                newThing.quantity = 0;
            } else {
                newThing.quantity = parseFloat(newThing.quantity);  // Converti a numero se è una stringa valida
            }

            if (isNaN(parseFloat(newThing.minQuantity))) {
                newThing.minQuantity = 0;
            } else {
                newThing.minQuantity = parseFloat(newThing.minQuantity);  // Converti a numero se è una stringa valida
            }

            const warehouse = await createThing(newThing, JSON.parse(sessionStorage.getItem("warehouse"))._id, Cookies.get("sessionToken"), JSON.parse(Cookies.get('sessionUser')).sub);
            sessionStorage.setItem("warehouse", JSON.stringify(warehouse));
            setUpgradeObjects(upgradeObjects + 1);
            socket.emit('addThing', {
                warehouseId: warehouse._id,
                warehouse,
            });
        } catch (error) {
            console.error("Error creating thing:", error);
        }
    };

    useEffect(() => {
        if (selectedWarehouse?._id) {
            socket.connect();

            socket.emit('joinWarehouse', selectedWarehouse._id);

            socket.on('deleteWarehouse', () => {
                setOpen(true);
            });

            socket.on('addThing', (data) => {
                sessionStorage.setItem("warehouse", JSON.stringify(data.warehouse));
                setUpgradeObjects(upgradeObjects + 1);
            });

            socket.on('deleteThing', (data) => {
                sessionStorage.setItem("warehouse", JSON.stringify(data.newWarehouse));
                setUpgradeObjects(upgradeObjects + 1);
            });

            socket.on('modifyQuantity', (data) => {
                sessionStorage.setItem("warehouse", JSON.stringify(data.warehouse));
                setUpgradeObjects(upgradeObjects + 1);
            });

            return () => {
                socket.off('modifyPermissions');
            };

            return () => {
                socket.emit('leaveWarehouse', selectedWarehouse._id);
                socket.off('deleteWarehouse');
                socket.disconnect();
            };
        }
    }, [selectedWarehouse]);


    useEffect(() => {
        setSelectedWarehouse(JSON.parse(sessionStorage.getItem("warehouse")));
        setUpgradedWarehouseList(upgradedWarehouseList + 1);
        const array = [ ...JSON.parse(sessionStorage.getItem("warehouse")).lsAdminsId, ...JSON.parse(sessionStorage.getItem("warehouse")).lsUsersId];
        getUsers(array, Cookies.get('sessionToken'))
            .then((usersList) => {
                const nicknames = usersList.map(user => user.nickname);
                setList(nicknames);
            });
        if (JSON.parse(sessionStorage.getItem("warehouse")) && JSON.parse(sessionStorage.getItem("warehouse")).lsThings) {
            setReady(true);
        }
    }, [upgradedUserList]);

    useEffect(() => {
        setSelectedWarehouse(JSON.parse(sessionStorage.getItem("warehouse")));
        if (JSON.parse(sessionStorage.getItem("warehouse")) && JSON.parse(sessionStorage.getItem("warehouse")).lsThings) {
            setReady(true);
        }
    }, [upgradeObjects]);

    useEffect(() => {
        getWarehouse(JSON.parse(sessionStorage.getItem("warehouse"))._id, Cookies.get("sessionToken"))
            .then((response) => {
                console.log("ciao",response);
                if(!response)
                    setOpen(true);
            })
    }, []);

    return (
        <div>
            {selectedWarehouse &&
            <Grid className = "warehouseIntroContainer">
                <h2 className="warehouseName">{selectedWarehouse.name}</h2>
                {selectedWarehouse.lsAdminsId[0] === account.sub && (
                    <Bin className = "warehouseBin"/>
                )}
            </Grid>
            }
            {selectedWarehouse &&
                <Box
                    className="warehouseBox"
                    sx={{
                        margin: 0,
                        // bgcolor: "grey",
                        // borderRadius: 5,
                        padding: 3,
                    }}
                >
                    <Grid
                        container
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginX: 3,
                            borderRadius: 2,
                            padding: 0,
                        }}
                    >

                    </Grid>

                    <Grid className = "warehouseUsers">
                        <Grid className = "warehouseThingsContainer">
                            <div className="warehouseInventorBox">
                            <h2 className="warehouseUsersListTitle">Inventario</h2>
                            </div>
                                <div className="warehouseThings">
                                    {ready ? (
                                        selectedWarehouse.lsThings.map((thing, index) => (
                                            <div>
                                                <Object
                                                    thing={thing}
                                                    key={index}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <Loading/>
                                    )}
                                    {selectedWarehouse.lsAdminsId.includes(account.sub) &&
                                        <AddObjectCard onCreate={handleCreateThing}/>
                                    }
                                </div>
                        </Grid>
                    </Grid>



                    <Grid className="warehouseUsers">

                        <Grid className="warehouseUsersList">
                            <h2 className="warehouseUserListTitle">Amministratori</h2>
                            <div className="warehouseUserListComponent">
                                <UserList className = "userListClass" type={1} list={selectedWarehouse.lsAdminsId} control={selectedWarehouse.lsAdminsId}/>
                            </div>
                        </Grid>

                        <Grid className="warehouseUsersList" >
                            <div className="AddUsersTitleBox" >
                                <h2 className="warehouseUserListTitle">
                                    Utenti
                                </h2>
                                {selectedWarehouse.lsAdminsId.includes(account.sub) && (
                                    <AddUserToList />
                                )}
                            </div>
                            <div className="warehouseUserListComponent">
                                <UserList type={2} list={selectedWarehouse.lsUsersId} control={selectedWarehouse.lsAdminsId}/>
                            </div>
                        </Grid>

                    </Grid>


                </Box>
            }
            <Modal
                open={open}
                className="warehouseDeleteWarning"
            >
                <Stack sx={{ width: '330px' }}>
                    <Alert severity="warning"
                           action={
                               <Button
                                   color="inherit"
                                   size="small"
                                   onClick={(event) => {
                                       event.stopPropagation();
                                       navigate('/home');
                                   }}
                               >
                                   Return
                               </Button>
                           }
                    >
                        Il magazzino è stato eliminato
                    </Alert>
                </Stack>
            </Modal>
            <Modal
                open={userDeleted}
                className="warehouseDeleteWarning"
            >
                <Stack sx={{ width: '340px' }}>
                    <Alert severity="warning"
                           action={
                               <Button
                                   color="inherit"
                                   size="small"
                                   onClick={(event) => {
                                       event.stopPropagation();
                                       setUserDeleted(false);
                                       navigate('/home');
                                   }}
                               >
                                   Return
                               </Button>
                           }
                    >
                        Non fai più parte del magazzino
                    </Alert>
                </Stack>
            </Modal>
        </div>
    );
}

export default Warehouse;