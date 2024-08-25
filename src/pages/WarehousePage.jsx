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

function WarehousePage() {
    const {setAccount, setToken, setSub, token, warehouse} = useContext(UserContext);
    const {isAuthenticated, getAccessTokenSilently, user, logout, isLoading} = useAuth0();

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
                    <Warehouse/>
                </div>
            </div>
        ) : (
            <Loading />
        )
    )
}

export default WarehousePage;