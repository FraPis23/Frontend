import React from 'react';
import Bin from './BinComponent';
import '../../../rendering/components/MainComponents/MainComponent.css';
import {useContext} from "react";
import {UserContext} from "../../../contexts/UserContext";



const Warehouse = ({ selectedWarehouse }) => {
    return (
        <main className="main">

            {selectedWarehouse ? (
                <div>
                    <h1>{selectedWarehouse.name}</h1>

                </div>
            ) : (
                <p>DioPorco, non va ancora</p>
            )}
        </main>
    );
}

export default Warehouse;