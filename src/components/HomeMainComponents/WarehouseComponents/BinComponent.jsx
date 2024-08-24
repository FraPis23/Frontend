import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../../rendering/components/WarehouseComponent/TrashBin.css';


// metti la funzione DeleteWarehouse :() 8=====D
function TrashCan() {
    const handleDelete = () => {
        alert("Cestino cliccato!");
    };

    return (
        <IconButton
            onClick={handleDelete}
            className="trash-can"
        >
            <DeleteIcon sx={{ color: 'white', fontSize: '28px' }} />
        </IconButton>
    );
}

export default TrashCan;
