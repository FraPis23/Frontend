import React, {useContext, useEffect} from 'react';
import axios from 'axios';
import {UserContext} from "../../contexts/UserContext";

import '../../rendering/components/MainComponents/MainComponent.css';
import ViewYourWarehouses from "../SidebarComponents/ViewYourWarehousesComponent";

const Main = () => {
    const {token, sub, setWarehouses, warehouses} = useContext(UserContext);
    const api_url = process.env.REACT_APP_API_URL;

    useEffect(() => {
        setWarehouses([]); //
            axios
                .post(
                    `${api_url}/users/returnWarehouse`,
                    {
                        sub: sub
                    },
                    {
                        withCredentials: true,
                        headers: {
                            authorization: `Bearer ${token}`,
                        }
                    }
                )
                .then((response) => {
                    console.log("ciao", response.data);
                    response.data.forEach((element) => {
                        axios
                            .get(
                                `${api_url}/warehouses/${element}`,
                                {
                                    withCredentials: true,
                                    headers: {
                                        authorization: `Bearer ${token}`,
                                    }
                                }
                            )
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