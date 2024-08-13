import { useAuth0 } from "@auth0/auth0-react";
import '../rendering/LoginPage.css';
import axios from 'axios';

function LoginButton() {
    const { loginWithRedirect, user } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect();

        const userId = user?.sub;

        try {
            const response = await axios.get(`/api/checkUser/${userId}`);
            const userExists = response.data.exists;

            const redirectUrl = userExists ? "/home" : "/create-user";

            await loginWithRedirect({
                appState: {
                    returnTo: redirectUrl,
                },
            });
        } catch (error) {
            console.error("Errore nel controllo dell'utente:", error);
        }
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

