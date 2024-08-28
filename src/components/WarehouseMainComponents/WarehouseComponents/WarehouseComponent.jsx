import React, {useContext, useEffect} from 'react';

import './WarehouseComponent.css';

import {UserContext} from "../../../contexts/UserContext";
import { Box, Grid } from "@mui/material";
import Bin from "./BinComponent";
import UserList from "./UserListComponent";

const Warehouse = () => {
    const {selectedWarehouse, setSelectedWarehouse, account} = useContext(UserContext);

    useEffect(() => {
            setSelectedWarehouse(JSON.parse(sessionStorage.getItem("warehouse")));
            console.log(selectedWarehouse);
    }, [selectedWarehouse]);

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

                    <Grid className = "user-container">
                        <Grid className = "name-container">

                            <h1>Benvenuto {account.nickname} nel tuo magazzino Jany: {selectedWarehouse.name}</h1>
                        </Grid>
                        <Grid className = "object-container">
                            <h1>VITO</h1>
                        </Grid>
                    </Grid>

                    <Grid className="user-container">
                        <Grid className="userListConteiner">
                            <h2 className="userListTitle">Amministratori:</h2>
                            <div className="userListComponent">
                                <UserList type={1} list={selectedWarehouse.lsAdminsId} control={selectedWarehouse.lsAdminsId}/>
                            </div>
                        </Grid>
                        <Grid className="userListConteiner">
                            <h2 className="userListTitle">Utenti:</h2>
                            <div className="userListComponent">
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