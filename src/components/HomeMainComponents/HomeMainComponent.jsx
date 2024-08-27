import React, {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {UserContext} from "../../contexts/UserContext";

import {getWarehousesId, getWarehouse, addWarehouse} from "../../services/HomePageSetupService";

import '../../rendering/components/MainComponents/MainComponent.css';

import Loading from "../../pages/LoadingPage";
import AddWarehouseCard from "./AddWarehouseComponents/AddWarehouseCard";
import WarehouseCard from "./WarehouseCardComponent";

const HomeMain = () => {
    const {sub, token, setWarehouses, warehouses, account} = useContext(UserContext);

    const handleCreateWarehouse = async (newWarehouse) => {
        const addedWarehouse = await addWarehouse(account, newWarehouse, token);
        setWarehouses((prevWarehouses) => [...prevWarehouses, addedWarehouse]);
    };

    useEffect(() => {
        setWarehouses([]); //Reset the list
        getWarehousesId(sub, token)
            .then((list) => {
                const warehousePromises = list.map((element) => {
                    return getWarehouse(element, token);
                });
                Promise.all(warehousePromises)
                    .then((warehouses) => {
                        setWarehouses(warehouses);
                    })
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        (warehouses) ? (
        <main className="main">
            I miei Magazzini

            <div className="mainWarehouses">
                {warehouses.map((warehouse, index) => (
                    <WarehouseCard
                        warehouse={warehouse}
                        key={index}
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

export default HomeMain;