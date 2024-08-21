import React, {useContext, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {searchUserByNickname} from '../services/HomePageSetupService';
import {UserContext} from "../contexts/UserContext";

const SearchDinamically = ({scope}) => {
    const scopeToSend = `Seleziona ${scope}`
    const {token} = useContext(UserContext);
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
        } else {
            setNicknameArray([]);
        }
    }, [searchQuery])

    return (
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                sx={{ width: 300 }}
                options={nicknameArray}
                onInputChange={(event, newInputValue) => {
                    setSearchQuery(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={scopeToSend}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
    );
}

export default SearchDinamically;