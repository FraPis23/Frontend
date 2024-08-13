import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children }) => {
    const navigate = useNavigate();

    const onRedirectCallback = (appState) => {
        navigate((appState && appState.returnTo) || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={process.env.REACT_APP_DOMAIN}
            clientId={process.env.REACT_APP_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: process.env.REACT_APP_AUDIENCE,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};