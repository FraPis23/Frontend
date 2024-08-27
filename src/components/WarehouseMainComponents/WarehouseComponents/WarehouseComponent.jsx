import React, {useContext, useEffect} from 'react';

import '../../../rendering/components/MainComponents/MainComponent.css';

import {UserContext} from "../../../contexts/UserContext";
import Bin from "./BinComponent";

const Warehouse = () => {
    const {selectedWarehouse, setSelectedWarehouse} = useContext(UserContext);

    useEffect(() => {
            setSelectedWarehouse(JSON.parse(sessionStorage.getItem("warehouse")));
    }, []);

    return (
        <main className="main">

            {selectedWarehouse ? (
                <div>
                    <h1>{selectedWarehouse.name}</h1>
                    <Bin />

                </div>
            ) : (
                <p>DioPorco, non va ancora</p>
            )}
        </main>
    );
}

export default Warehouse;