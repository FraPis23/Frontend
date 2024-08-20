import React from 'react';
import img1 from '../../images/HomeImages/WarehouseCardImages/building.png'
import img2 from '../../images/HomeImages/WarehouseCardImages/dick.png'
import img3 from '../../images/HomeImages/WarehouseCardImages/warehouse.png'
import img4 from '../../images/HomeImages/WarehouseCardImages/warehouse-management.png'




const IconChoose = () => {

    const handleImageClick = (output) => {
        console.log(output);
        alert(`Hai cliccato: ${output}`);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3>Seleziona un'Icona</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <img
                    src={img1}
                    alt="Immagine 1"
                    onClick={() => handleImageClick(1)}
                    style={{ cursor: 'pointer', width: '50px', height: '50px' }}
                />
                <img
                    src={img2}
                    alt="Immagine 2"
                    onClick={() => handleImageClick(3)}
                    style={{ cursor: 'pointer', width: '50px', height: '50px' }}
                />
                <img
                    src={img3}
                    alt="Immagine 3"
                    onClick={() => handleImageClick(3)}
                    style={{ cursor: 'pointer', width: '50px', height: '50px' }}
                />
                <img
                    src={img4}
                    alt="Immagine 4"
                    onClick={() => handleImageClick(4)}
                    style={{ cursor: 'pointer', width: '50px', height: '50px' }}
                />
            </div>
        </div>
    );
};

export default IconChoose;