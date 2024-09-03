import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [account, setAccount] = useState({});
    const [token, setToken] = useState("");
    const [sub, setSub] = useState("");
    const [warehouses, setWarehouses] = useState([]);
    const [newNickname, setNewNickname] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [lsAdminsNickname, setLsAdminsNickname] = useState([]);
    const [lsUsersNickname, setLsUsersNickname] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState(JSON.parse(localStorage.getItem('warehouses')));
    const [upgradedUserList, setUpgradedUserList] = useState(0);
    const [upgradedWarehouseList, setUpgradedWarehouseList] = useState(0);
    const [list, setList] = useState([]);
    const [selectedPicture, setSelectedPicture] = useState('');
    const [things, setThings] = useState([]);
    const [deletedWarehouse, setDeletedWarehouse] = useState(0)

    return (
        <UserContext.Provider value={{
            account, setAccount,
            token, setToken,
            sub, setSub,
            warehouses, setWarehouses,
            newNickname, setNewNickname,
            selectedImage, setSelectedImage,
            lsAdminsNickname, setLsAdminsNickname,
            lsUsersNickname, setLsUsersNickname,
            selectedWarehouse, setSelectedWarehouse,
            upgradedUserList, setUpgradedUserList,
            upgradedWarehouseList, setUpgradedWarehouseList,
            list, setList,
            selectedPicture, setSelectedPicture,
            things, setThings,
            deletedWarehouse, setDeletedWarehouse,

        }}>
            {children}
        </UserContext.Provider>
    );
};