import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [account, setAccount] = useState({});
    const [token, setToken] = useState("");
    const [sub, setSub] = useState("");

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