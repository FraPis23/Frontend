import React from "react";

import {BrowserRouter as useEffect, Route, Routes} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";

import AutenticationGuard from "./AutenticationGuard";

import './App.css';

import LoadingPage from "./pages/LoadingPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import WarehousePage from "./pages/WarehousePage";

import {UserProvider} from "./contexts/UserContext"
import {WarehouseProvider} from "./contexts/WarehouseContext"



function App() {
    const {isLoading, isAuthenticated} = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated, navigate]);

    if (isLoading) {
        return (
            <LoadingPage />
        );
    }
    return (
        <main>
            <Routes>
                <Route path="/" element={<LoginPage />} />
            </Routes>
            <UserProvider>
                <Routes>
                    <Route path="/home" element={<AutenticationGuard component={HomePage}/>} />
                </Routes>
            </UserProvider>
            <WarehouseProvider>
                <Routes>
                    <Route path="/warehouse" element={<AutenticationGuard component={WarehousePage}/>} />
                </Routes>
            </WarehouseProvider>
        </main>
  );
}

export default App;
