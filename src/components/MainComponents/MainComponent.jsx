import React, {useContext, useEffect} from 'react';
import {UserContext} from "../../contexts/UserContext";

import {getWarehousesId, getWarehouses} from "../../services/HomePageSetupService";

import '../../rendering/components/MainComponents/MainComponent.css';
import ViewYourWarehouses from "../SidebarComponents/ViewYourWarehousesComponent";

const Main = () => {
    const {token, sub, setWarehouses, warehouses} = useContext(UserContext);

    useEffect(() => {
            setWarehouses([]); //Reset the list
            getWarehousesId(sub, token)
                .then((list) => {
                    list.forEach(async (element) => {
                        const warehouse = getWarehouses(element, token);
                        setWarehouses(prevWarehouses => [...prevWarehouses, warehouse]);
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
    }, []);

    return (
        <main className="main">
            I miei Magazzini
            <div className="warehouses">
                {warehouses.map(() => (
                    <ViewYourWarehouses />
                ))}
            </div>
        </main>
    )
}

export default Main;