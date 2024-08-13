import React, {createContext} from 'react';

export const WarehouseContext = createContext();

export const WarehouseProvider = ({ children }) => {

    return (
        <WarehouseContext.Provider value={{

        }}>
            {children}
        </WarehouseContext.Provider>
    );
};