import React from 'react';
import Home from './components/HomeComponent';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import './App.css';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/home" element={<Home />} />
          </Routes>
      </Router>
  );
}

export default App;
