import React, {useContext} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {UserContext} from "../contexts/UserContext";
import axios from "axios";

import '../rendering/pages/HomePage.css'

import UserInfo from "../components/UserInfoComponent";
import LogoutButton from "../components/LogoutButtonComponent";

function HomePage() {
    const [account, setAccount] = useState({});
    const [token, setToken] = useState("");
    const {isAuthenticated, getAccessTokenSilently, user, logout, isLoading} = useAuth0();
    const navigate = useNavigate();
    const api_url = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (!isLoading)
            if (isAuthenticated) {
                getAccessTokenSilently().then((token) => {
                    setToken(token);
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
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.log(error);
                            if (error.code !== "ECONNABORTED" || error.code === "ERR_NETWORK")
                                logout({returnTo: window.location.origin});
                        });
                    axios
                        .post(
                            `${api_url}/users/sub`,
                            {
                                sub: user.sub,
                            },
                            {
                                withCredentials: true,
                                headers: {
                                    authorization: `Bearer ${token}`,
                                },
                            }
                        )
                        .then((response) => {
                            setAccount(
                                {
                                    picture: response.data.picture,
                                    email: response.data.email,
                                    nickname: response.data.nickname
                                }
                            )
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                });
            }
    }, [isAuthenticated, getAccessTokenSilently, navigate])

    return (
        <div>
            <div className='homePage'>
                <aside className='userInfoManagment'>
                    <h1>Welcome to the Home Page</h1>
                    <UserInfo user={account}/>
                    <LogoutButton />
                </aside>
                <section className='warehousesList'>
                </section>
            </div>
        </div>
    )
}

export default HomePage;