import React, {useContext, useEffect, useState} from 'react';
import Cookies from "js-cookie";

import './WarehouseComponent.css';

import {UserContext} from "../../../contexts/UserContext";

import { Box, Grid } from "@mui/material";

import Bin from "./BinComponent";
import UserList from "./UserListComponent";
import Object from "../WarehouseObjectComponent/ObjectCardComponent";
import AddObjectCard from "../WarehouseObjectComponent/AddObjectCardComponent"
import AddUserToList from "./AddUserToListComponent";
import Loading from "../../../pages/LoadingPage";

import {getUsers, createThing} from "../../../services/WarehousePageSetupService";

const Warehouse = () => {
    const {selectedWarehouse, setSelectedWarehouse} = useContext(UserContext);
    const {upgradedWarehouseList, setUpgradedWarehouseList, upgradedUserList} = useContext(UserContext);
    const {setList} = useContext(UserContext);
    const {token, account} = useContext(UserContext);
    const [upgradedObjects, setUpgradedObjects] = useState(0);

    const [ready, setReady] = useState(false);

    const handleCreateThing = async (newThing) => {
        if (!selectedWarehouse._id || !token) {
            console.error("warehouseId or token is not available.");
            return;
        }
        console.log("Creating a new thing with:", newThing, selectedWarehouse._id, token);
        try {
            const addedThing = await createThing(newThing, selectedWarehouse._id, token);
            const warehouse = JSON.parse(sessionStorage.getItem("warehouse"));
            warehouse.lsThings.push(addedThing);
            sessionStorage.setItem("warehouse", JSON.stringify(warehouse));
            console.log("warehouse : ", warehouse);
            setUpgradedObjects(upgradedObjects+1)
        } catch (error) {
            console.error("Error creating thing:", error);
        }
    };

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
    }, [upgradedUserList, upgradedObjects]);

    return (
        <div>
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
                        <Grid className = "warehouseIntroContainer">
                            <h2 className="warehouseIntro">Benvenuti, questo è il magazzino </h2>

                           <h2 className="warehouseName">{selectedWarehouse.name}</h2>
                            {selectedWarehouse.lsAdminsId[0] === account.sub && (
                                <Bin />
                            )}
                        </Grid>
                        <Grid className = "warehouseThingsContainer">
                            <h2 className="warehouseUserListTitle">Inventario</h2>
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
                                    <AddObjectCard onCreate={handleCreateThing}/>
                                </div>
                        </Grid>
                    </Grid>

                    <Grid className="warehouseUsers">
                        <Grid className="warehouseUsersList">
                            <h2 className="warehouseUserListTitle">Amministratori [{selectedWarehouse.lsAdminsId.length}]</h2>
                            <div className="warehouseUserListComponent">
                                <UserList type={1} list={selectedWarehouse.lsAdminsId} control={selectedWarehouse.lsAdminsId}/>
                            </div>
                        </Grid>
                        <Grid className="warehouseUsersList">
                            <div className="AddUsersTitleBox">
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
        </div>
    );
}

export default Warehouse;