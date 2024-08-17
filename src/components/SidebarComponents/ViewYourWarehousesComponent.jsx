import React, { useState } from 'react';
import { IconButton, Modal, Box, Typography, TextField, Button } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import '../../rendering/components/MainComponents/MainComponent.css';


const ViewYourWarehouses = () => {
    return (
        <div>
            {/* Icona cliccabile */}
            <IconButton
                color="primary"
                aria-label="add warehouse"
               // sx={{ position: 'absolute', top: 330, left: 65}}
            >
                <StoreIcon style={{ fontSize: 220 }} />
            </IconButton>

            <Typography
                variant="body1"
                className="warehouseName"
                //sx={{ position: 'absolute', top: 430, left: 65 }}
            >
                Jany
            </Typography>
        </div>
    );
};
export default ViewYourWarehouses