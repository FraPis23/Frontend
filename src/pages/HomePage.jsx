import React, {useContext} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";
import {UserContext} from "../contexts/UserContext";

import {postUser, getUser} from "../services/HomePageSetupService";

import '../rendering/pages/HomePage.css'

import Loading from "./LoadingPage";
import Header from "../components/HeaderComponents/HeaderComponent";
import Main from "../components/MainComponents/MainComponent";


function HomePage() {
    const {setAccount, setToken, setSub, token} = useContext(UserContext);
    const {isAuthenticated, getAccessTokenSilently, user, logout, isLoading} = useAuth0();

    useEffect(() => {
        if (!isLoading)
            if (isAuthenticated) {
                getAccessTokenSilently()
                    .then(async (token) => {
                        setToken(token);
                        setSub(user.sub);
                        await postUser(user, token)
                        const response = await getUser(user, token);
                        setAccount({
                            picture: response.picture,
                            nickname: response.nickname
                        });
                })
                .catch((error) => {
                    console.log(error);
                    if (error.code !== "ECONNABORTED" || error.code === "ERR_NETWORK")
                        logout({returnTo: window.location.origin});
                });
            }
    }, [isAuthenticated, getAccessTokenSilently])

    return (
        token ? (
        <div>
            <Header />
            <div className='homePage'>
                <div className='sidebarToggle'>
                    <section className='warehousesList'>
                    </section>
                </div>
            </div>
            <div className='homeBody'>
                <Main />
            </div>
        </div>
    ) : (
        <Loading />
    )
    )
}

export default HomePage;