import React, {useContext, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {searchUserByNickname} from '../services/HomePageSetupService';

import {UserContext} from "../contexts/UserContext";

const SearchDinamically = ({scope}) => {
    const scopeToSend = `Seleziona ${scope}`
    const {token, newNickname, setNewNickname} = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [nicknameArray, setNicknameArray] = useState([])

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            searchUserByNickname(searchQuery, token)
                .then((nicknames) => {
                    setNicknameArray(nicknames || []);
                })
                .catch((error) => {
                    console.error('Error fetching nicknames:', error);
                    setNicknameArray([]);
                });
            console.log(newNickname);
        } else {
            setNicknameArray([]);
        }
    }, [searchQuery])

    return (
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                sx={{ width: '100%' }}
                options={nicknameArray}
                onInputChange={(event, newInputValue) => {
                    setSearchQuery(newInputValue);
                    setNewNickname(newInputValue);
                }}
                clearIcon={null}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={scopeToSend}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                        sx={{ mt: 2 }}
                    />
                )}
            />
    );
}

export default SearchDinamically;