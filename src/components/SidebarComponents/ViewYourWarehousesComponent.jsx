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
                sx={{ position: 'absolute', top: 330, left: 65}}
            >
                <StoreIcon style={{ fontSize: 100 }} />
            </IconButton>

            <Typography
                variant="body1"
                sx={{ position: 'absolute', top: 430, left: 65 }}
            >
                I miei Magazzini
            </Typography>
        </div>
    );
};
export default ViewYourWarehouses