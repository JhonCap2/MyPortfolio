import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./MainRouter";
import Logo from "./imagen/jhlogo.png";
import './App.css';

const App = () => (
  <Router>
    <div id="root">
      <img src={Logo} alt="Logo JH" className="logo" />
      <MainRouter />
    </div>
  </Router>
);

export default App;