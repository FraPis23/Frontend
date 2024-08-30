import React, {useState, useContext} from 'react';
import image1 from '../../../images/HomeImages/WarehouseCardImages/hammer.jpg';
import image2 from '../../../images/HomeImages/WarehouseCardImages/screw.jpg';
import image3 from '../../../images/HomeImages/WarehouseCardImages/brick.jpg';
import image4 from '../../../images/HomeImages/WarehouseCardImages/saw.jpg';
import {UserContext} from "../../../contexts/UserContext";



const IconChoose = () => {

    const {selectedPicture, setSelectedPicture} = useContext(UserContext);
    const handleImageClick = (imageId) => {
        setSelectedPicture(imageId); // Aggiorna lo stato con l'immagine cliccata
        console.log(`Hai cliccato sull'immagine ${imageId}`);
    };

    const baseStyle = {
        cursor: 'pointer',
        width: '50px',
        height: '50px',
        transition: 'opacity 0.3s ease',
    };


    const getImageStyle = (imageId) => {if (selectedPicture) {
        return selectedPicture === imageId
            ? { ...baseStyle } // Stile di base
            : { ...baseStyle, opacity: 0.5 }; // Opacizza le altre immagini
    } else {
        return baseStyle;
    }
    };


    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3>Seleziona un'Icona</h3>
            <div className="icons" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <img
                    src={image1}
                    alt="Immagine 1"
                    onClick={() => handleImageClick(1)}
                    style={ getImageStyle(1) }
                />
                <img
                    src={image2}
                    alt="Immagine 2"
                    onClick={() => handleImageClick(2)}
                    style={ getImageStyle(2) }
                />
                <img
                    src={image3}
                    alt="Immagine 3"
                    onClick={() => handleImageClick(3)}
                    style={ getImageStyle(3) }
                />
                <img
                    src={image4}
                    alt="Immagine 4"
                    onClick={() => handleImageClick(4)}
                    style={ getImageStyle(4) }
                />
            </div>
        </div>
    );
};

export default IconChoose;