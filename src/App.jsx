import React from 'react';
import Home from './components/HomeComponent';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import logo from './warehouseLogo.png';

import './App.css';

function App() {
  return (
      <div>
          <header>
              <img src={logo} alt='Logo'/>
          </header>
          <Router>
              <Routes>
                  <Route path="/home" element={<Home/>}/>
              </Routes>
          </Router>
          <footer>
              Progetto FW
          </footer>
      </div>
  );
}

export default App;
