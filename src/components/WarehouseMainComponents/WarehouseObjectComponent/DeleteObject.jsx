import React, {useContext} from 'react';
import Cookies from "js-cookie";

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import './ObjectCardComponent.css';
import {UserContext} from "../../../contexts/UserContext";
import {deleteThing} from "../../../services/WarehousePageSetupService";

function DeleteObject() {
    const {setThings, things, selectedWarehouse, token, setUpgradeObjects, upgradeObjects} = useContext(UserContext);

    const handleDelete = async () =>{
        const warehouse = await deleteThing(JSON.parse(sessionStorage.getItem("warehouse"))._id, things._id,Cookies.get("token"));
        await sessionStorage.setItem("warehouse", JSON.stringify(warehouse));
        setUpgradeObjects(upgradeObjects + 1)
    };

    return (
        <IconButton
            onClick={handleDelete}
            className="binComponent"
        >
            <DeleteIcon sx={{ color: 'grey', fontSize: '30px' }} />
        </IconButton>
    );
}

export default DeleteObject;