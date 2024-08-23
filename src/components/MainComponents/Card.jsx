import React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'; // Usa Button invece di IconButton
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';
import { alpha } from '@mui/material/styles';
import '../../rendering/components/MainComponents/WarehouseCardComponent.css';

import logo3 from '../../images/HomeImages/WarehouseCardImages/warehouse.png';
import logo2 from '../../images/HomeImages/WarehouseCardImages/dick.png';
import logo1 from '../../images/HomeImages/WarehouseCardImages/building.png';
import logo4 from '../../images/HomeImages/WarehouseCardImages/warehouse-management.png';


const WarehouseCard = ({ warehouse }) => {
    const apiKey = "AIzaSyAFWH8opVo0QTRo7ChM-P0hCqvmd6cq8Tw";
    const theme = useTheme();


    const handleClick = () => {
        // Aggiungi la logica per gestire il clic qui
        console.log('Pulsante cliccato');
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
                return null; // Oppure un logo di default se preferisci
        }
    };
    const logo = getLogo(warehouse.icon);



    return (
        <Card className="warehouseCardConteiner">
            <CardContent >
                <CardMedia
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
                    onClick={handleClick} // Gestisce il clic
                    variant="contained"
                >
                    <PlaceIcon className="place" />
                    <Typography
                        sx={{
                            color: 'white',
                            marginLeft: '8px',// Spazio tra l'icona e il testo
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
