import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../contexts/UserContext";

import {getWarehousesId, getWarehouse, addWarehouse} from "../../services/HomePageSetupService";

import '../../rendering/components/MainComponents/MainComponent.css';

import Loading from "../../pages/LoadingPage";
import AddWarehouseCard from "./AddWarehouseComponents/AddWarehouseCard";
import WarehouseCard from "./WarehouseCardComponent";
import Warehouse from "./WarehouseComponents/WarehouseComponent"

const Main = () => {

    const {sub, token, setWarehouses, warehouses, account} = useContext(UserContext);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const handleCreateWarehouse = async (newWarehouse) => {
        await addWarehouse(account, newWarehouse, token);
    };

    useEffect(() => {
        setWarehouses([]); //Reset the list
        getWarehousesId(sub, token)
            .then((list) => {
                list.forEach((element) => {
                    getWarehouse(element, token)
                        .then((warehouse) => {
                            setWarehouses(prevWarehouses => [...prevWarehouses, warehouse]);
                    })
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleWarehouseClick = (warehouse) => {
        setSelectedWarehouse(warehouse);
    };

    if (selectedWarehouse) {
        return <Warehouse warehouse={selectedWarehouse} />;
    }

    return (
        (warehouses) ? (
        <main className="main">
            I miei Magazzini

            <div className="warehouses">
                {warehouses.map((warehouse, index) => (
                    <WarehouseCard
                        warehouse={warehouse}
                        key={index}
                        onClick={() => handleWarehouseClick(warehouse)}
                    />
                ))}
                <AddWarehouseCard onCreate={handleCreateWarehouse}/>
            </div>


        </main>
        ) : (
            <Loading />
        )
    )
}

export default Main;