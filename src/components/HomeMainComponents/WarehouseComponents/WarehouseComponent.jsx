import React from 'react';
import Bin from './BinComponent';
import '../../../rendering/components/MainComponents/MainComponent.css';
import {useContext} from "react";
import {UserContext} from "../../../contexts/UserContext";



const Warehouse = () => {
    const {setAccount, setToken, setSub, token, selectedWarehouse} = useContext(UserContext);

    return (
        <main className="main">
            Porcamadonne

        </main>
    );

}

export default Warehouse;