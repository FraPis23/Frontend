import React from 'react';

import '../rendering/components/HeaderComponent.css'

import logo from '../warehouseLogo-removebg-preview.png'

const Header = () => {

    return (
        <header className="header">
            <img src={logo} alt='Logo'/>
        </header>
    )
}

export default Header;