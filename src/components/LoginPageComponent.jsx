import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import warehouseLogo from '../logo-removebg-preview.png';

import '../rendering/LoginPageComponent.css';

function LoginPage() {
    const { loginWithRedirect } = useAuth0();

    function handleMouseEnter() {
        document.querySelector('.loginContainer').classList.add('opacity');
    }

    function handleMouseLeave(){
        document.querySelector('.loginContainer').classList.remove('opacity');
    }

    return (
        <div className="loginContainer">
            <div className='loginSection'>
                <h1>Benvenuto in: </h1> <br/>
                <img src={warehouseLogo} alt="warehouse"/>
                <button
                    className='loginButton'
                    onClick={() => loginWithRedirect()}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Log In
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
