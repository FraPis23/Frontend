import React, {useState, useEffect, useContext} from 'react';

import {useNavigate} from "react-router-dom";

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import './BinComponent.css';
import {UserContext} from "../../../contexts/UserContext";
import {deleteWarehouse} from "../../../services/WarehousePageSetupService";
import {socket} from "../../../socket";

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
        socket.emit('deleteWarehouse', {
            warehouseId: selectedWarehouse._id,
            setWarehouses
        });
    };

    useEffect(() => {
        socket.on('deleteWarehouse', () => {
                navigate('/home');
        });

        return () => {
            socket.off('deleteWarehouse');
        };
    }, [selectedWarehouse, navigate]);

    return (
        <IconButton
            onClick={handleDelete}
            className="binComponent"
        >
            <DeleteIcon sx={{ color: 'grey', fontSize: '30px' }} />
        </IconButton>
    );
}

export default Bin;
