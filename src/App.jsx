import React from 'react';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import './App.css';

import Header from "./components/HeaderComponent";
import LoginPage from "./components/LoginPageComponent";
import Home from './components/HomeComponent';

function App() {
  return (
      <div>
          <header className='header'>
              <Router>
                  <Routes>
                      <Route path="/home" element={<Header />} />
                  </Routes>
              </Router>
          </header>
          <Router>
              <Routes>
                  <Route path='/' element={<LoginPage />} />
                  <Route path="/home" element={<Home/>}/>
              </Routes>
          </Router>
          <footer className='footer'>
              <p>Progetto Fondamenti Web:</p>
              <p>Donvito Gianni</p>
              <p>Laterza Giorgio</p>
              <p>Piscopo Francesco</p>
              <p>Anno: 2023/2024</p>
          </footer>
      </div>
  );
}

export default App;
