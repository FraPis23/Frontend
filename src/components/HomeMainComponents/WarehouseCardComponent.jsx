import React from 'react';
import {useNavigate} from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';

import './WarehouseCardComponent.css';

import logo3 from '../../images/HomeImages/WarehouseCardImages/warehouse.png';
import logo2 from '../../images/HomeImages/WarehouseCardImages/dick.png';
import logo1 from '../../images/HomeImages/WarehouseCardImages/building.png';
import logo4 from '../../images/HomeImages/WarehouseCardImages/warehouse-management.png';

const WarehouseCard = ({ warehouse }) => {
    const navigate = useNavigate();

    const handleWarehouseClick = () => {
        sessionStorage.setItem("warehouse", JSON.stringify(warehouse));
        navigate(`/home/warehouse/${warehouse._id}`);
    };

    const handleLocationClick = () => {
        if (warehouse.coordinates && warehouse.coordinates.length === 2) {
            const [latitude, longitude] = warehouse.coordinates;
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${longitude},${latitude}`;
            window.open(googleMapsUrl, '_blank');
        } else {
            console.log('Coordinate non disponibili');
        }
    };


    const getLogo = (selectedImage) => {
        console.log("Immagine ", selectedImage);
        switch(selectedImage) {
            case 1:
                return logo1;
            case 2:
                return logo2;
            case 3:
                return logo3;
            case 4:
                return logo4;
            default:
                return null;
        }
    };
    const logo = getLogo(warehouse.icon);



    return (
        <Card
            className="warehouseCardConteiner"
        >
            <CardContent >
                <CardMedia
                    onClick={handleWarehouseClick}
                    className="icon"
                    component="img"
                    image={logo}
                    alt="icona"
                />
                <Typography component="div" variant="h5" className="warehouseCardName">
                    {warehouse.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div" className="warehouseCardDescription">
                    {warehouse.description}
                </Typography>


                <Button
                    className="placeBox"
                    onClick={handleLocationClick}
                    variant="contained"
                >
                    <PlaceIcon className="place" />
                    <Typography
                        sx={{
                            color: 'white',
                            marginLeft: '8px',
                            alignItems: 'center',
                        }}
                    >
                        Geolocalizza
                    </Typography>
                </Button>
            </CardContent>

        </Card>
    );
}

export default WarehouseCard;
