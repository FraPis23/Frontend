import React from 'react';
import { Card, CardContent, Typography, IconButton, CardMedia } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

import '../../rendering/components/MainComponents/WarehouseCardComponent.css';

const WarehouseCard = ({ warehouse }) => {
    const apiKey = "AIzaSyAFWH8opVo0QTRo7ChM-P0hCqvmd6cq8Tw";
    const zoomLevel = 22;

    // Costruisci l'URL dell'immagine della mappa
    //const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${warehouse.location[1]},${warehouse.location[0]}&zoom=15&size=150x150&maptype=roadmap&markers=color:red%7C${warehouse.location[1]},${warehouse.location[0]}&style=element:geometry%7Ccolor:0xe3f2fd&style=element:labels.text.stroke%7Ccolor:0xe3f2fd&style=element:labels.text.fill%7Ccolor:0x37474f&style=feature:road%7Celement:geometry%7Ccolor:0xb0bec5&style=feature:water%7Celement:geometry%7Ccolor:0x64b5f6&style=feature:landscape%7Ccolor:0xc8e6c9&key=${apiKey}`;

    return (
        <Card className="warehouseCardContainer">
            <CardContent>
                <IconButton color="primary" aria-label="add warehouse">
                    <StoreIcon className="warehouseCardIcon" />
                </IconButton>
                <Typography variant="h5" className="warehouseCardName">
                    {warehouse.name}
                </Typography>
                <Typography variant="h6" className="warehouseCardDescription">
                    {warehouse.description}
                </Typography>
                <CardMedia
                    className="warehouseCardMap"
                    component="img"
                    alt="Mappa del magazzino"
                    //image={mapUrl}
                    title="Mappa del magazzino"
                />
            </CardContent>
        </Card>
    );
};

export default WarehouseCard;
