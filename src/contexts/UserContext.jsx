import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [account, setAccount] = React.useState({});
    const [token, setToken] = React.useState("");
    const [sub, setSub] = React.useState("");

    return (
        <UserContext.Provider value={{
            account, setAccount,
            token, setToken,
            sub, setSub
        }}>
            {children}
        </UserContext.Provider>
    );
};