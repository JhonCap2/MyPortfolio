import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Component/Layout';
import App from './App';
import Home from './Pages/Home';
import About from './Pages/About';
import Projects from './Pages/Projects';
import Services from './Pages/Services';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="services" element={<Services />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;