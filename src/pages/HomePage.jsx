import React, {useContext} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";
import axios from "axios";
import {UserContext} from "../contexts/UserContext";

import '../rendering/pages/HomePage.css'

import Header from "../components/HeaderComponent";

function HomePage() {
    const {setAccount, setToken, setSub} = useContext(UserContext);
    const {isAuthenticated, getAccessTokenSilently, user, logout, isLoading} = useAuth0();
    const api_url = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (!isLoading)
            if (isAuthenticated) {
                getAccessTokenSilently().then((token) => {
                    axios
                        .post(
                            `${api_url}/users`,
                            {
                                picture: user.picture,
                                email: user.email,
                                nickname: user.nickname,
                                sub: user.sub
                            },
                            {
                                withCredentials: true,
                                headers: {
                                    authorization: `Bearer ${token}`,
                                },
                            }
                        )
                        .then(() => {
                            axios
                                .post(
                                    `${api_url}/users/sub`,
                                    {
                                        sub: user.sub
                                    },
                                    {
                                        withCredentials: true,
                                        headers: {
                                            authorization: `Bearer ${token}`,
                                        },
                                    }
                                )
                                .then((response) => {
                                    setAccount({
                                        picture: response.data.picture,
                                        nickname: response.data.nickname
                                    });
                                    console.log(response.data);
                                })
                            }
                        )
                        .then(() => {
                            setToken(token);
                            setSub(user.sub);
                        })
                        .catch((error) => {
                            console.log(error);
                            if (error.code !== "ECONNABORTED" || error.code === "ERR_NETWORK")
                                logout({returnTo: window.location.origin});
                        });
                });
            }
    }, [isAuthenticated, getAccessTokenSilently, setAccount])

    return (
        <div>
            <Header />
            <div className='homePage'>


                <div className='sidebarToggle'>
                    <section className='warehousesList'>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default HomePage;