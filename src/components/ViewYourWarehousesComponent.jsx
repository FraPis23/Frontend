import React, { useState } from 'react';
import { IconButton, Modal, Box, Typography, TextField, Button } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';


const ViewYourWarehouses = () => {
    return (
        <div>
            {/* Icona cliccabile */}
            <IconButton
                color="primary"
                aria-label="add warehouse"
                sx={{ position: 'absolute', top: 300, left: 65}}
            >
                <StoreIcon style={{ fontSize: 100 }} />
            </IconButton>

            <Typography
                variant="body1"
                sx={{ position: 'absolute', top: 400, left: 65 }}
            >
                Crea Magazzino
            </Typography>
        </div>
    );
};
export default ViewYourWarehouses