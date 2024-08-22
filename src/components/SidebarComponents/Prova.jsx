import React, { useState, useContext } from 'react';

import { IconButton, Modal, Box, Typography, TextField, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

import '../../rendering/components/HeaderComponents/AddWarehouseComponent.css'

import IconChoose from "./IconChoose";
import SearchDinamically from "../SearchDinamicallyComponent";

import {UserContext} from "../../contexts/UserContext";


const NewWarehouseIcon = ({ onCreate }) => {
    const [open, setOpen] = useState(false);
    const [warehouseName, setWarehouseName] = useState('');
    const [description, setDescription] = useState('');
    const [coordinates, setCoordinates] = useState([]);
    const [autocomplete, setAutocomplete] = useState(null);
    const [lsAdminsNickname, setLsAdminsNickname] = useState([]);
    const [lsUsersNickname, setLsUsersNickname] = useState([]);
    const {newNickname, setNewNickname} = useContext(UserContext);
    const {selectedImage, setSelectedImage} = useContext(UserContext);

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
        if (newNickname.trim()) { // Check if input is not empty
            setLsAdminsNickname([...lsAdminsNickname, newNickname]);
            setNewNickname('');
            console.log('Final Admins List:', lsAdminsNickname)// Clear the input field after adding
        }
    };

    const handleAddUser = () => {
        if (newNickname.trim()) { // Check if input is not empty
            setLsUsersNickname([...lsUsersNickname, newNickname]);
            setNewNickname(''); // Clear the input field after adding
            console.log('Final Users List:', lsUsersNickname)
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
                coordinates: coordinates,
                lsUsersNickname : lsUsersNickname,
                lsAdminsNickname :lsAdminsNickname,
                selectedImage: selectedImage
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

                    <SearchDinamically scope="Amministratori"/>

                    <IconButton
                        color="primary"
                        aria-label="add Admin"
                        onClick={handleAddAdmin}
                        sx={{ position: 'fixed', top: 296, right: 35 }}
                    >
                        <AddCircleOutlineIcon style={{ fontSize: 40 }} />
                    </IconButton>

                    <SearchDinamically scope="Utenti"/>

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

/*
                    <TextField
                        fullWidth
                        label="IDs degli Amministratori"
                        variant="outlined"
                        value={newAdminNickname}
                        onChange={(e) => setNewAdminNickname(e.target.value)}
                        sx={{ mt: 2}}
                    />

                    <TextField
                        fullWidth
                        label="IDs degli Utenti"
                        variant="outlined"
                        value={newUserNickname}
                        onChange={(e) => setNewUserNickname(e.target.value)}
                        sx={{ mt: 2}}
                    />
*/