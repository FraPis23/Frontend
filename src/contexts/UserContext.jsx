import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [account, setAccount] = useState({});
    const [token, setToken] = useState("");
    const [sub, setSub] = useState("");
    const [warehouses, setWarehouses] = useState([]);
    const [newNickname, setNewNickname] = useState('');

    return (
        <UserContext.Provider value={{
            account, setAccount,
            token, setToken,
            sub, setSub,
            warehouses, setWarehouses,
            newNickname, setNewNickname
        }}>
            {children}
        </UserContext.Provider>
    );
};