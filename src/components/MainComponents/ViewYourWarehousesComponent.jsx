import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import '../../rendering/components/MainComponents/MainComponent.css';

const ViewYourWarehouses = ({warehouse}) => {


    return (
        <Card sx={{ maxWidth: 345, margin: 'auto' }}>
            <CardContent style={{ textAlign: 'center' }}>
                <IconButton color="primary" aria-label="add warehouse">
                    <StoreIcon style={{ fontSize: 150 }} />
                </IconButton>
                <Typography
                    variant="h5"
                    className="warehouseName"
                >
                    {warehouse.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ViewYourWarehouses;
