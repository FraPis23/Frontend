import { useAuth0 } from "@auth0/auth0-react";
import '../rendering/pages/LoginPage.css';

function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = async ()=> {
        await loginWithRedirect({
            appState: {
                returnTo: "/home",
            },
        });
    };

    function handleMouseEnter() {
        document.querySelector('.loginContainer').classList.add('opacity');
    }

    function handleMouseLeave(){
        document.querySelector('.loginContainer').classList.remove('opacity');
    }

    return (
        <button
            className='loginButton'
            onClick={handleLogin}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            Accedi
        </button>
    );
}

export default LoginButton;

