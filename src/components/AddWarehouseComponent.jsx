import React, { useState } from 'react';
import { IconButton, Modal, Box, Typography, TextField, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AddWarehouse = ({ onCreate }) => {
    const [open, setOpen] = useState(false);
    const [warehouseName, setWarehouseName] = useState('');
    const [warehouseDescription, setWarehouseDescription] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreate = () => {
        if (onCreate && warehouseName && warehouseDescription) {
            onCreate(warehouseName && warehouseDescription);
            handleClose(); // Chiude la modale dopo aver creato il magazzino
        }
    };

    return (
        <div>
            {/* Icona cliccabile */}
            <IconButton
                color="primary"
                aria-label="add warehouse"
                onClick={handleOpen}
                sx={{ position: 'absolute', top: 130, left: 65}}
            >
                <AddCircleOutlineIcon style={{ fontSize: 100 }} />
            </IconButton>

            <Typography
                variant="body1"
                sx={{ position: 'absolute', top: 240, left: 65 }}
            >
                Crea Magazzino
            </Typography>

            {/* Finestra Modale per la creazione del magazzino */}
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
                        zIndex: 1301,
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
                        label="Descrizione del Magazzino"
                        variant="outlined"
                        value={warehouseDescription}
                        onChange={(e) => setWarehouseDescription(e.target.value)}
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

export default AddWarehouse;
