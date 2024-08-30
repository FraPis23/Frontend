import React, {useState} from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import './ObjectCardComponent.css'
import logo from '../../../images/HomeImages/WarehouseCardImages/hammer.jpg'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from "@mui/material/IconButton";


const ObjectCard = ({thing}) => {

    const [inputValue, setInputValue] = useState(0);
    const [sumValue, setSumValue] = useState(0);

    console.log("Prova: ", thing)
    const handleInputChange = (event) => {
        setInputValue(Number(event.target.value));

    };
    const handleButtonClick = () => {
        setSumValue(prevSum => {
            const newSum = prevSum + inputValue ;
            return newSum >= 0 ? newSum : 0;
        });
    };

    return (
        <Card className='objectCard'>
            <CardContent>
                <IconButton className="objectBin">
                    <DeleteIcon />
                </IconButton>

                <div className='objectCardLogoContainer'>
                    <CardMedia className='objectCardLogo'
                               component="img"
                               height="250"
                               image={logo}
                               alt='chiodo'
                    />
                </div>
                <Typography gutterBottom variant="h5" className= 'objectName'>
                    {thing.name}
                </Typography>
                <div className='objectDataContainer'>
                    <div className= "objectQuantity">
                        <Typography variant="subtitle1" color="text.secondary" component='div' className='objectDescription'>
                            Quantità:
                        </Typography>
                        <Box className='objectQuantityContainer' variant='subtitle1' color='text.secondary'>
                            {sumValue}
                        </Box>
                    </div>
                    <div className='objectModifyQuantityContainer'>
                        <Box  className='objectChangeNumber'
                              component="form"
                              noValidate
                              autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="standard-number"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style:{
                                            textAlign: 'center'
                                        },
                                    }}
                                    variant="standard"
                                />
                            </div>
                        </Box>

                        <Button
                            className="objectCardButton"
                            onClick={handleButtonClick}
                        >

                            <Typography
                                sx={{
                                    alignItems: 'center',
                                }}
                                className='objectContent'
                            >
                                <AddCircleOutlineIcon/>
                            </Typography>
                        </Button>
                    </div>

                </div>
            </CardContent>
        </Card>


    );
}


export default ObjectCard;