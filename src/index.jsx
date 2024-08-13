import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Auth0ProviderWithNavigate} from 'src/Auth0ProviderWithNavigate'

import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Auth0ProviderWithNavigate>
            <App />
        </Auth0ProviderWithNavigate>
    </BrowserRouter>
);

