import React, {useContext, useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Route, Routes} from "react-router-dom";
import Cookies from 'js-cookie';

import {UserContext} from "../contexts/UserContext";

import {postUser} from "../services/HomePageSetupService";

import './HomePage.css'

import HomeHeader from "../components/HomeHeaderComponents/HomeHeaderComponent";
import HomeMain from "../components/HomeMainComponents/HomeMainComponent";
import WarehouseHeader from "../components/WarehouseHeaderComponents/WarehouseHeaderComponent";
import Warehouse from "../components/WarehouseMainComponents/WarehouseComponents/WarehouseComponent";

function HomePage() {
    const {setAccount, setToken, setSub} = useContext(UserContext);
    const {isAuthenticated, getAccessTokenSilently, user, logout, isLoading} = useAuth0();

    useEffect(() => {
        const sessionToken = Cookies.get('sessionToken');
        const sessionUser = Cookies.get('sessionUser');

        if (sessionToken && sessionUser) {
            setToken(sessionToken);
            const userData = JSON.parse(sessionUser);
            setAccount({
                sub: userData.sub,
                picture: userData.picture,
                nickname: userData.nickname
            });
            setSub(userData.sub);
        } else if (!isLoading && isAuthenticated) {
            getAccessTokenSilently()
                .then(async (token) => {
                    const userData = {
                        sub: user.sub,
                        picture: user.picture,
                        nickname: user.nickname
                    };
                    setAccount(userData);
                    setToken(token);
                    setSub(user.sub);
                    await postUser(user, token);
                    Cookies.set('sessionToken', token, { secure: true, sameSite: 'Strict' });
                    Cookies.set('sessionUser', JSON.stringify(userData), { secure: true, sameSite: 'Strict' });
                })
                .catch((error) => {
                    console.log(error);
                    if (error.code !== "ECONNABORTED" || error.code === "ERR_NETWORK")
                        logout({ returnTo: window.location.origin });
                });
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    return (
            <div className='homeBody'>
                <Routes>
                    <Route path="/" element={<>
                        <HomeHeader />
                        <HomeMain/>
                    </>}
                    />
                    <Route path="/warehouse/:id" element={ <>
                        <WarehouseHeader />
                        <Warehouse />
                    </>}
                    />
                </Routes>
            </div>
    )
}

export default HomePage;