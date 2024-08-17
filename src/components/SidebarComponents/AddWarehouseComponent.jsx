import React, { useState } from 'react';
import { IconButton, Modal, Box, Typography, TextField, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const NewWarehouseIcon = ({ onCreate }) => {
    const [open, setOpen] = useState(false);
    const [warehouseName, setWarehouseName] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreate = () => {
        if (onCreate && warehouseName) {
            onCreate(warehouseName);
            handleClose(); // Chiude la modale dopo aver creato il magazzino
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

            {/* Scritta sotto l'icona */}
            <Typography
                variant="body1"
                sx={{ position: 'fixed', bottom: 20, right: 20 }}
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
