import React, {useContext, useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Route, Routes} from "react-router-dom";
import {UserContext} from "../contexts/UserContext";

import {postUser} from "../services/HomePageSetupService";

import '../rendering/pages/HomePage.css'

import Loading from "./LoadingPage";
import Header from "../components/HomeHeaderComponents/HeaderComponent";
import BinComponent from "../components/HomeMainComponents/WarehouseComponents/BinComponent";
import Warehouse from "../components/HomeMainComponents/WarehouseComponents/WarehouseComponent";
import Main from "../components/HomeMainComponents/MainComponent";

function WarehousePage() {
    const {setAccount, setToken, setSub, token, selectedWarehouse, setSelectedWarehouse } = useContext(UserContext);
    const {isAuthenticated, getAccessTokenSilently, user, logout, isLoading} = useAuth0();


    useEffect(() => {
        if (selectedWarehouse) {
            localStorage.setItem('selectedWarehouse', JSON.stringify(selectedWarehouse));
        }
    }, [selectedWarehouse]);

    // Carica il selectedWarehouse da localStorage quando il componente viene montato
    useEffect(() => {
        const storedWarehouse = localStorage.getItem('selectedWarehouse');
        if (storedWarehouse) {
            setSelectedWarehouse(JSON.parse(storedWarehouse));
        }
    }, [setSelectedWarehouse]);


    useEffect(() => {
        if (!isLoading)
            if (isAuthenticated) {
                getAccessTokenSilently()
                    .then(async (token) => {
                        await postUser(user, token);
                        setAccount({
                            sub: user.sub,
                            picture: user.picture,
                            nickname: user.nickname
                        });
                        setToken(token);
                        setSub(user.sub);

                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.code !== "ECONNABORTED" || error.code === "ERR_NETWORK")
                            logout({returnTo: window.location.origin});
                    });
            }
    }, [isAuthenticated, getAccessTokenSilently])

    return (
        (token) ? (
            <div>
                <Header />
                <BinComponent />
                <div className='homeBody'>
                    <Routes>
                        <Route
                            path="/"
                            element={<Warehouse selectedWarehouse={selectedWarehouse} />}
                        />
                    </Routes>
                </div>
            </div>
        ) : (
            <Loading />
        )
    )
}


export default WarehousePage;