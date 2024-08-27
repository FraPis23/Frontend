import React, {useContext, useEffect} from 'react';

import '../../../rendering/components/WarehouseComponent/warehouseComponent.css';

import {UserContext} from "../../../contexts/UserContext";
import { Box, Grid } from "@mui/material";


const Warehouse = () => {
    const {selectedWarehouse, setSelectedWarehouse} = useContext(UserContext);

    useEffect(() => {
            setSelectedWarehouse(JSON.parse(sessionStorage.getItem("warehouse")));
    }, []);

    return (
        <div>
        <main className="main">

            {selectedWarehouse ? (
                <div>
                    <h1>{selectedWarehouse.name}</h1>

                </div>
            ) : (
                <p>DioPorco, non va ancora</p>
            )}
        </main>
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

                <Grid container sx={{ marginX: 3 }}>
                    <Grid className = "Troia">
                        Porca
                    </Grid>
                    <Grid item md={4}>
                        madonna
                    </Grid>
                </Grid>

                <Grid container sx={{ margin: 3 }}>
                    <Grid item md={6}>
                        lurida
                    </Grid>
                    <Grid item md={6}>
                        incrociata
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Warehouse;