import React from 'react';

import '../../rendering/components/MainComponents/MainComponent.css';
import ViewYourWarehouses from "../SidebarComponents/ViewYourWarehousesComponent";

const Main = () => {

    return (
        <main className="main">
            I miei Magazzini
            <div className="warehouses">
            <ViewYourWarehouses />
            <ViewYourWarehouses />
            <ViewYourWarehouses />
            <ViewYourWarehouses />
            </div>
        </main>
    )
}

export default Main;