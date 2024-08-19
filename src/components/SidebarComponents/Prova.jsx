import React, { useState } from 'react';
import { IconButton, Modal, Box, Typography, TextField, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import '../../rendering/components/HeaderComponents/AddWarehouseComponent.css'

const libraries = ['places'];

const NewWarehouseIcon = ({ onCreate }) => {
    const [open, setOpen] = useState(false);
    const [warehouseName, setWarehouseName] = useState('');
    const [description, setDescription] = useState('');
    const [coordinates, setCoordinates] = useState([]);
    const [autocomplete, setAutocomplete] = useState(null);
    const [lsAdminsId, setLsAdminsId] = useState('');
    const [lsUsersId, setLsUsersId] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreate = () => {
        if (onCreate && warehouseName && coordinates.length > 0) {
            onCreate({
                name: warehouseName,
                description,
                location: {
                    type: 'Point',
                    coordinates,
                },
            });
            handleClose(); // Chiude la modale dopo aver creato il magazzino
        } else {
            console.log("Errore: Informazioni incomplete");
        }
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAFWH8opVo0QTRo7ChM-P0hCqvmd6cq8Tw', // Sostituisci con la tua API key
        libraries: libraries,
    });

    const onLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    const handlePlaceSelect = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place && place.geometry) {
                const locationCoordinates = [
                    place.geometry.location.lng(), // Longitudine
                    place.geometry.location.lat()  // Latitudine
                ];
                setCoordinates(locationCoordinates);
                console.log("Coordinate selezionate: ", locationCoordinates);
            } else {
                console.log("Errore: place o place.geometry non definito");
            }
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <IconButton
                color="inherit"
                aria-label="add warehouse"
                onClick={handleOpen}
                sx={{ position: 'fixed', top: 5, left: 10 }}
            >
                <AddCircleOutlineIcon style={{ fontSize: 40 }} />
            </IconButton>

            <Typography
                variant="body1"
                sx={{ position: 'fixed', bottom: 20, right: 20 }}
            >
                Crea Magazzino
            </Typography>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="new-warehouse-modal-title"
                aria-describedby="new-warehouse-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="new-warehouse-modal-title" variant="h6" component="h2">
                        Crea un Nuovo Magazzino
                    </Typography>
                    <TextField
                        fullWidth
                        label="Nome del Magazzino"
                        variant="outlined"
                        value={warehouseName}
                        onChange={(e) => setWarehouseName(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Descrizione"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ mt: 2 }}
                    />

                    {isLoaded && (
                        <Autocomplete
                            onLoad={onLoad}
                            onPlaceChanged={handlePlaceSelect}
                        >
                            <TextField
                                fullWidth
                                label="Posizione del Magazzino"
                                variant="outlined"
                                sx={{ mt: 2 }}
                            />
                        </Autocomplete>
                    )}

                    <TextField
                        fullWidth
                        label="IDs degli Amministratori (separati da virgola)"
                        variant="outlined"
                        value={lsAdminsId}
                        onChange={(e) => setLsAdminsId(e.target.value)}
                        sx={{ mt: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="IDs degli Utenti (separati da virgola)"
                        variant="outlined"
                        value={lsUsersId}
                        onChange={(e) => setLsUsersId(e.target.value)}
                        sx={{ mt: 2 }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleCreate}
                    >
                        Crea
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default NewWarehouseIcon;
