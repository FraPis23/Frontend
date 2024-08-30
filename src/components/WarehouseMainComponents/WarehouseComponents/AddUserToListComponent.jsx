import React, {useState} from 'react';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import {Box, Card, CardContent, Typography} from "@mui/material";

import SearchDinamically from "../../SearchDinamicallyComponent";

import "./AddUserToListComponent.css"

function AddUserToList() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="AddUserButton">
            <IconButton
                onClick={handleOpen}
            >
                <AddIcon />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
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
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Aggiungi Nuovo Utente
                            </Typography>
                            <SearchDinamically scope={"Utente"} />
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
}

export default AddUserToList;
