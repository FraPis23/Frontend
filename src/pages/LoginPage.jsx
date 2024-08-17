import '../rendering/pages/LoginPage.css';

import LoginButtonComponent from "../components/LoginComponents/LoginButtonComponent";

import warehouseLogo from '../images/warehouseLogo-removebg-preview.png';


function LoginPage() {
    return (
        <div className="loginContainer">
            <div className='loginSection'>
                <p>Benvenuto in: </p> <br/>
                <img src={warehouseLogo} alt="warehouse"/>
                <LoginButtonComponent />
            </div>
        </div>
    );
}

export default LoginPage;
