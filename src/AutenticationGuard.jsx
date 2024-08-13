import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading  from './pages/LoadingPage';

export const AuthenticationGuard = ({ component }) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div className="page-layout">
                <Loading />
            </div>
        ),
    });

    return <Component />;
};

export default AuthenticationGuard;