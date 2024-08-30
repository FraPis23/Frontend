import React, {useContext, useEffect} from 'react';

import './WarehouseComponent.css';

import {UserContext} from "../../../contexts/UserContext";
import { Box, Grid } from "@mui/material";

import Bin from "./BinComponent";
import UserList from "./UserListComponent";
import ObjectCard from "../WarehouseObjectComponent/ObjectCardComponent";
import AddObjectCard from "../WarehouseObjectComponent/AddObjectCardComponent"
import AddUserToList from "./AddUserToListComponent";
import {getUsers} from "../../../services/WarehousePageSetupService";
import Cookies from "js-cookie";

const Warehouse = () => {
    const {selectedWarehouse, setSelectedWarehouse} = useContext(UserContext);
    const {upgradedWarehouseList, setUpgradedWarehouseList, upgradedUserList} = useContext(UserContext);
    const {setList} = useContext(UserContext)

    useEffect(() => {
        setSelectedWarehouse(JSON.parse(sessionStorage.getItem("warehouse")));
        setUpgradedWarehouseList(upgradedWarehouseList + 1);
        const array = [ ...JSON.parse(sessionStorage.getItem("warehouse")).lsAdminsId, ...JSON.parse(sessionStorage.getItem("warehouse")).lsUsersId];
        getUsers(array, Cookies.get('sessionToken'))
            .then((usersList) => {
                const nicknames = usersList.map(user => user.nickname);
                setList(nicknames);
            })
    }, [upgradedUserList]);

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
                            <Bin />
                        </Grid>
                        <Grid className = "warehouseThingsContainer">
                            <h2 className="warehouseUserListTitle">Inventario</h2>
                            <div className="warehouseThings">
                                <ObjectCard />
                                <ObjectCard />
                                <AddObjectCard />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid className="warehouseUsers">
                        <Grid className="warehouseUsersList">
                            <h2 className="warehouseUserListTitle">Amministratori</h2>
                            <div className="warehouseUserListComponent">
                                <UserList type={1} list={selectedWarehouse.lsAdminsId} control={selectedWarehouse.lsAdminsId}/>
                            </div>
                        </Grid>
                        <Grid className="warehouseUsersList">
                            <div className="AddUsersTitleBox">
                                <h2 className="warehouseUserListTitle">
                                    Utenti
                                </h2>
                                <AddUserToList />
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