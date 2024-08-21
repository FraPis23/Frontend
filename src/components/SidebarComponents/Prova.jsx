import React, { useState } from 'react';
import { IconButton, Modal, Box, Typography, TextField, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import '../../rendering/components/HeaderComponents/AddWarehouseComponent.css'
import IconChoose from "./IconChoose";


const NewWarehouseIcon = ({ onCreate }) => {
    const [open, setOpen] = useState(false);
    const [warehouseName, setWarehouseName] = useState('');
    const [description, setDescription] = useState('');
    const [coordinates, setCoordinates] = useState([]);
    const [autocomplete, setAutocomplete] = useState(null);
    const [lsAdminsId, setLsAdminsId] = useState([]);
    const [newAdminId, setNewAdminId] = useState('');
    const [lsUsersId, setLsUsersId] = useState([]);
    const [newUserId, setNewUserId] = useState('');

    const libraries = ['places'];

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAFWH8opVo0QTRo7ChM-P0hCqvmd6cq8Tw",
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

    const handleAddAdmin = () => {
        if (newAdminId.trim()) { // Check if input is not empty
            setLsAdminsId([...lsAdminsId, newAdminId]);
            setNewAdminId('');
            console.log('Final Admins List:', lsAdminsId)// Clear the input field after adding
        }
    };

    const handleAddUser = () => {
        if (newUserId.trim()) { // Check if input is not empty
            setLsUsersId([...lsUsersId, newUserId]);
            setNewUserId(''); // Clear the input field after adding
            console.log('Final Admins List:', lsUsersId)
        }
    };


    const handleCreate = () => {
        console.log('onCreate:', onCreate);
        console.log('warehouseName:', warehouseName);
        console.log('coordinates:', coordinates);
        if (onCreate && warehouseName && coordinates.length>0) {
            onCreate({
                name: warehouseName,
                description: description,
                location: {
                    type: 'Point',
                    coordinates,
                },
                lsUsersId : lsUsersId,
                lsAdminsId :lsAdminsId
            });
            handleClose(); // Chiude la modale dopo aver creato il magazzino
        } else {
            console.log("Errore: Informazioni incomplete");
        }
    };





    return (
        <div style={{ textAlign: 'center' }}>
            <IconButton
                color="primary"
                aria-label="add warehouse"
                onClick={handleOpen}

            >
                <AddCircleOutlineIcon style={{ fontSize: 130 }} />
            </IconButton>



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
                        label="IDs degli Amministratori"
                        variant="outlined"
                        value={newAdminId}
                        onChange={(e) => setNewAdminId(e.target.value)}
                        sx={{ mt: 2}}
                    />
                    <IconButton
                        color="primary"
                        aria-label="add Admin"
                        onClick={handleAddAdmin}
                        sx={{ position: 'fixed', top: 296, right: 35 }}
                    >
                        <AddCircleOutlineIcon style={{ fontSize: 40 }} />
                    </IconButton>


                    <TextField
                        fullWidth
                        label="IDs degli Utenti"
                        variant="outlined"
                        value={newUserId}
                        onChange={(e) => setNewUserId(e.target.value)}
                        sx={{ mt: 2}}
                    />
                    <IconButton
                        color="primary"
                        aria-label="add User"
                        onClick={handleAddUser}
                        sx={{ position: 'fixed', top: 368, right: 35 }}
                    >
                        <AddCircleOutlineIcon style={{ fontSize: 40 }} />
                    </IconButton>

                    <IconChoose />


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
