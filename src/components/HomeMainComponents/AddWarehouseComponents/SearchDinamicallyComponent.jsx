import React, {useContext, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {searchUserByNickname} from '../../../services/HomePageSetupService';
import {UserContext} from "../../../contexts/UserContext";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import './AddWarehouseCardComponent.css'

const SearchDinamically = ({scope}) => {
    const scopeToSend = `Seleziona ${scope}`
    const {token, sub, newNickname, setNewNickname} = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [nicknameArray, setNicknameArray] = useState([]);
    const {lsAdminsNickname, setLsAdminsNickname} = useContext(UserContext);
    const {lsUsersNickname, setLsUsersNickname} = useContext(UserContext);

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            searchUserByNickname(searchQuery, token, sub)
                .then((nicknames) => {
                    setNicknameArray(nicknames || []);
                })
                .catch((error) => {
                    console.error('Error fetching nicknames:', error);
                    setNicknameArray([]);
                });
        } else {
            setNicknameArray([]);
        }
    }, [searchQuery])


    const handleAddAdmin = () => {
        if (newNickname.trim()) { // Check if input is not empty
            if(scope==="Amministratori")
            {setLsAdminsNickname([...lsAdminsNickname, newNickname]);
                setNewNickname('');
                console.log('Admins List:', lsAdminsNickname)
            }
            else if(scope==="Utenti")
            {
                setLsUsersNickname([...lsUsersNickname, newNickname]);
                setNewNickname('');
                console.log('Users List:', lsUsersNickname)
            }

        }
    };

    return (
        <div>
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                sx={{ width: '100%' }}
                options={nicknameArray}
                onInputChange={(event, newInputValue) => {
                    setSearchQuery(newInputValue);
                    setNewNickname(newInputValue);
                }}
                clearIcon={<AddCircleOutlineIcon
                    //color="primary"
                    style={{ fontSize: 40 }}
                    onClick={handleAddAdmin}
                />}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={scopeToSend}
                        value={newNickname}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',

                        }}

                        sx={{ mt: 2 }}
                    />
                )}
            />
        </div>
    );
}

export default SearchDinamically;