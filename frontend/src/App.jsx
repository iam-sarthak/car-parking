import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import CarForm from './components/CarForm';
import CarList from './components/CarList';
import CarDetail from './components/CarDetails';
import Navbar from './components/Navbar';
import './App.css'
const App = () => {
  const [token, setToken] = useState('');

  return (
    <div className='app'>
    <Router>
      <div className="navbar">
      <Navbar token={token} setToken={setToken} />
      </div>
      <div className='body'>
      <Routes>
        <Route path="/" element={token?<CarList token={token} />:<Auth setToken={setToken} />} />
        <Route path="/login" element={<Auth setToken={setToken} />} />
        <Route path="/cars/new" element={<CarForm token={token} fetchCars={() => {}} />} />
        <Route path="/cars/:id" element={<CarDetail token={token} />} />
      </Routes>
      </div>
    </Router>
    
    </div>
  );
};

export default App;
