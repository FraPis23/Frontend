import React from "react";
import { Routes, Route } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";

import {UserProvider} from "./contexts/UserContext";

import AutenticationGuard from "./AutenticationGuard";

import './App.css';

import Skeleton from '@mui/material/Skeleton';

import Loading from "./pages/LoadingPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
    const {isLoading} = useAuth0();

    return (
        isLoading ? (
            <main>
                <Skeleton variant="rectangular" sx={{height: '8.6vh'}}/>
                <Loading />
            </main>
        ) : (
            <main>
                <UserProvider>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/home/*" element={<AutenticationGuard component={HomePage}/>}/>
                    </Routes>
                </UserProvider>
            </main>
        )
    );
}

export default App;
