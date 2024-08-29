import React, {useContext, useEffect} from 'react';

import './WarehouseComponent.css';

import {UserContext} from "../../../contexts/UserContext";
import { Box, Grid } from "@mui/material";
import Bin from "./BinComponent";
import UserList from "./UserListComponent";
import Object from "../WarehouseObjectComponent/ObjectCardComponent";
import AddObjectCard from "../WarehouseObjectComponent/AddObjectCardComponent"

const Warehouse = () => {
    const {selectedWarehouse, setSelectedWarehouse} = useContext(UserContext);

    useEffect(() => {
            setSelectedWarehouse(JSON.parse(sessionStorage.getItem("warehouse")));
            //console.log(selectedWarehouse);
    }, []);

    return (
        <div>
            {selectedWarehouse &&
                <Box
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
                            <h2 className="warehouseIntro">Ciao famiglia Jany, Benvenuti nel magazzino: </h2>

                           <h2 className="warehouseName">{selectedWarehouse.name}</h2>
                            <Bin />
                        </Grid>
                        <Grid className = "warehouseThingsContainer">
                            <h2 className="warehouseUserListTitle">VITO:</h2>
                            <div className="warehouseThings">
                                <Object />
                                <Object />
                                <AddObjectCard />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid className="warehouseUsers">
                        <Grid className="warehouseUsersList">
                            <h2 className="warehouseUserListTitle">Amministratori:</h2>
                            <div className="warehouseUserListComponent">
                                <UserList type={1} list={selectedWarehouse.lsAdminsId} control={selectedWarehouse.lsAdminsId}/>
                            </div>
                        </Grid>
                        <Grid className="warehouseUsersList">
                            <h2 className="warehouseUserListTitle">Utenti:</h2>
                            <div className="warehouseUserListComponent">
                                <UserList type={2} list={selectedWarehouse.lsUsersId}control={selectedWarehouse.lsAdminsId}/>
                            </div>
                        </Grid>
                    </Grid>

                </Box>
            }
        </div>
    );
}

export default Warehouse;