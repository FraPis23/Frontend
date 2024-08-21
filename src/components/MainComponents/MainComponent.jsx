import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../contexts/UserContext";

import {getWarehousesId, getWarehouse, addWarehouse} from "../../services/HomePageSetupService";

import '../../rendering/components/MainComponents/MainComponent.css';

import WarehouseCard from "./WarehouseCardComponent";
import Loading from "../../pages/LoadingPage";
import NewWarehouseIcon from "../SidebarComponents/Prova";



const Main = () => {

    const {sub, token, setWarehouses, warehouses, account} = useContext(UserContext);

    const handleCreateWarehouse = async (newWarehouse) => {
        const createdWarehouse = await addWarehouse(account, newWarehouse, token);
        console.log("Magazzino creato:", createdWarehouse);

        // Aggiungi il nuovo magazzino alla lista dei magazzini visualizzati
      //  setWarehouses(prevWarehouses => [...prevWarehouses, createdWarehouse]);
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

    return (
        (warehouses) ? (
        <main className="main">
            I miei Magazzini

            <div className="warehouses">
                {warehouses.map((warehouse, index) => (
                    <WarehouseCard warehouse={warehouse} key={index} />
                ))}


                <NewWarehouseIcon onCreate={handleCreateWarehouse}/>
            </div>


        </main>
        ) : (
            <Loading />
        )
    )
}

export default Main;