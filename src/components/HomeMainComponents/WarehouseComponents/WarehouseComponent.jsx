import React from 'react';
import Bin from './BinComponent';
import '../../../rendering/components/MainComponents/MainComponent.css';


const Warehouse = ({warehouse}) => {

    return (
        <main className="main">
            {warehouse.name}
            <Bin />
        </main>
    );

}

export default Warehouse;