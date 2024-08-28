import React, { useState, useContext } from 'react';

import { Card, CardContent, CardActions, Typography, TextField, Button, IconButton, Modal, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import ObjectIcon from "./ObjectIcon";
import { UserContext } from "../../../contexts/UserContext";
import './AddObjectCardComponent.css';




const AddObjectCard = ({ onCreate }) => {
    const [open, setOpen] = useState(false);
    const [firstValue, setFirstValue] = useState(0);




    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleFirstValueChange = (event) => {
        setFirstValue(Number(event.target.value));
    };


    return (
        <div style={{ textAlign: 'center' }}>
            <IconButton
                color="primary"
                aria-label="add warehouse"
                onClick={handleOpen}
                className="CardCont"
            >
                <AddCircleOutlineIcon
                    className="Add"

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
                                label="Nome Ogetto"
                                variant="outlined"

                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Inserisci numero minimo oggetti"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={firstValue}
                                onChange={handleFirstValueChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: 0,   // Valore minimo
                                    step: 1   // Incremento dei valori
                                }}
                                sx={{ mt: 2}}
                            />

                            <TextField
                                label="Inserisci numero oggetti"
                                type="number"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: firstValue,
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
