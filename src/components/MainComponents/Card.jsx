import React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'; // Usa Button invece di IconButton
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';
import { alpha } from '@mui/material/styles';

import logo from '../../images/HomeImages/WarehouseCardImages/warehouse_2066616.png';

export default function MediaControlCard() {
    const theme = useTheme();

    const handleClick = () => {
        // Aggiungi la logica per gestire il clic qui
        console.log('Pulsante cliccato');
    };

    return (
        <Card
            sx={{
                display: 'flex',
                boxShadow: 0,
                borderRadius: 5,
                border: '2px solid rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
            }}
        >
            <CardContent sx={{ flex: 1 }}>
                <CardMedia
                    component="img"
                    sx={{
                        width: 150,
                        objectFit: 'cover',

                    }}
                    image={logo}
                    alt="icona"
                />
                <Typography component="div" variant="h5" sx={{ textAlign: 'left' }}>
                    Magazino dei piu forti
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ textAlign: 'left' }}>
                    Mattia e figo
                </Typography>
                <Button
                    onClick={handleClick} // Gestisce il clic
                    variant="contained"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#1976D2',
                        borderRadius: '50px',
                        padding: '8px 16px',
                        width: 'fit-content',
                        marginTop: '15px',
                        textTransform: 'none',
                        boxShadow: 0,
                        height: '45px',
                        '&:hover': {
                            backgroundColor: alpha('#1976D2', 0.8),
                        },
                    }}
                >
                    <PlaceIcon sx={{ height: 38, width: 38, color: 'white'  }} />
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


