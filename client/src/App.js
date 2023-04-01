import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import GameCards from './components/GameCards';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route default path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="game" element={<GameCards />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
