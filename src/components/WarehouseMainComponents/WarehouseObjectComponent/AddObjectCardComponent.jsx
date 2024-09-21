import React, { useState, useContext } from 'react';

import { Card, CardContent, CardActions, Typography, TextField, Button, IconButton, Modal, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ObjectIcon from "./ObjectIcon";
import { UserContext } from "../../../contexts/UserContext";
import './AddObjectCardComponent.css';



const AddObjectCard = ({ onCreate }) => {
    const [open, setOpen] = useState(false);
    const [minQuantity, setMinQuantity] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [objectName, setObjectName] = useState('');
    const { selectedPicture, setSelectedPicture } = useContext(UserContext);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreate = () => {
        if (onCreate && objectName) {
            onCreate({
                name: objectName,
                minQuantity: minQuantity,
                quantity: quantity,
                picture: selectedPicture
            });
            setObjectName('');
            setQuantity(0);
            setMinQuantity(0);
            setSelectedPicture(null);

            handleClose();
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
                className="addObjectCardBotton"
            >
                <AddCircleOutlineIcon
                    className="addObjectCartIcon"

                    style={{ fontSize: 100}} />
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
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Crea un Nuovo Oggetto
                            </Typography>
                            <TextField
                                fullWidth
                                label="Nome Oggetto"
                                variant="outlined"
                                value={objectName}
                                onChange={(e) => setObjectName(e.target.value)}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Inserisci numero minimo oggetti"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={minQuantity}
                                onChange={(e) => setMinQuantity(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: 0,
                                    step: 1
                                }}
                                sx={{ mt: 2}}
                            />

                            <TextField
                                label="Inserisci numero oggetti"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: 0,
                                    step: 1
                                }}
                                sx={{ mt: 2}}
                            />
                        </CardContent>
                        <ObjectIcon />
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreate}
                            >
                                Crea
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
};

export default AddObjectCard;
