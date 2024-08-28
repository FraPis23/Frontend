import React, {useContext} from 'react';

import {useNavigate} from "react-router-dom";

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import './BinComponent.css';
import {UserContext} from "../../../contexts/UserContext";
import {deleteWarehouse} from "../../../services/WarehousePageSetupService";

function Bin() {
    const {setWarehouses, warehouses, selectedWarehouse, token} = useContext(UserContext);
    const navigate = useNavigate();

    const handleDelete = async () => {
        const updatedWarehouses = await warehouses.filter(warehouse => warehouse._id !== selectedWarehouse);
        setWarehouses(updatedWarehouses);
        deleteWarehouse(selectedWarehouse, token)
            .then(() => {
                navigate('/home');
            })
    };

    return (
        <IconButton
            onClick={handleDelete}
            className="trash-can"
        >
            <DeleteIcon sx={{ color: 'grey', fontSize: '40px' }} />
        </IconButton>
    );
}

export default Bin;
