import React, {useState, useContext, useEffect} from 'react';
import {socket} from "../../../socket";

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import './ObjectCardComponent.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from "@mui/material/IconButton";
import WarningIcon from '@mui/icons-material/Warning';
import {UserContext} from "../../../contexts/UserContext";

import {deleteThing} from "../../../services/WarehousePageSetupService";

import logo1 from "../../../images/HomeImages/WarehouseCardImages/hammer.jpg";
import logo2 from "../../../images/HomeImages/WarehouseCardImages/screw.jpg";
import logo3 from "../../../images/HomeImages/WarehouseCardImages/brick.jpg";
import logo4 from "../../../images/HomeImages/WarehouseCardImages/saw.jpg";
import Tooltip from "@mui/material/Tooltip";




const ObjectCard = ({thing}) => {


    const{selectedWarehouse, setSelectedWarehouse, token}=useContext(UserContext);
    const [inputValue, setInputValue] = useState(0);
    const [sumValue, setSumValue] = useState(0);
    const {upgradeObjects, setUpgradeObjects} = useContext(UserContext)
    const [showTriangle, setShowTriangle] = useState(false);



    const handleDelete = async () => {
        try {
            const updatedThings = selectedWarehouse.lsThings.filter(item => item._id !== thing._id);

            setSelectedWarehouse({
                ...selectedWarehouse,
                lsThings: updatedThings,
            });

            const newWarehouse = await deleteThing(selectedWarehouse._id, thing._id, token);
            console.log("NEW WAREHOUSE ", newWarehouse);
            sessionStorage.setItem("warehouse", JSON.stringify(newWarehouse));

            socket.emit('deletedThing', {
                warehouseId: newWarehouse._id,
                newWarehouse,
            });

            setUpgradeObjects(upgradeObjects + 1);

        } catch (error) {
            console.error("Error deleting the thing: ", error);
        }
    };

    console.log("Prova: ", thing)
    const handleInputChange = (event) => {
        setInputValue(Number(event.target.value));

    };
    const handleButtonClick = () => {
        setSumValue(prevSum => {
            const newSum = prevSum + inputValue;
            return newSum >= 0 ? newSum : 0;
        });

    };

    useEffect(() => {
        if (sumValue + thing.quantity <= thing.minQuantity) {
            setShowTriangle(true);
        }
        else
        {
            setShowTriangle(false);
        }
    });

    const getLogo = (selectedPic) => {
        console.log("Immagine ", selectedPic);
        switch(selectedPic) {
            case 1:
                return logo1;
            case 2:
                return logo2;
            case 3:
                return logo3;
            case 4:
                return logo4;
            default:
                return logo1;
        }
    };
    const logo = getLogo(thing.picture);

    return (
        <div>
        <Card className='objectCard'>

            <CardContent>
                {showTriangle && (
                    <Tooltip title={`Carenza di ${thing.name}`} >
                        <WarningIcon className="alert" />
                    </Tooltip>
                    )}


                <IconButton className="objectBin">
                    <DeleteIcon
                        onClick={handleDelete}
                    />
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
                            {sumValue+thing.quantity}
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
        </div>

    );
}


export default ObjectCard;