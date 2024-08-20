import React, {useContext, useEffect} from 'react';
import {UserContext} from "../../contexts/UserContext";

import {getWarehousesId, getWarehouse} from "../../services/HomePageSetupService";

import '../../rendering/components/MainComponents/MainComponent.css';

import ViewYourWarehouses from "./ViewYourWarehousesComponent";
import Loading from "../../pages/LoadingPage";

const Main = () => {
    const {sub, token, setWarehouses, warehouses} = useContext(UserContext);

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
                    <ViewYourWarehouses warehouse={warehouse} key={index} />
                ))}
            </div>
        </main>
        ) : (
            <Loading />
        )
    )
}

export default Main;