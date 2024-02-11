import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Laundry from './components/Laundry';
import Drying from './components/Drying';
import Home from './components/Home';
import Navigation from './components/Navigation';
import UserReservations from './components/UserReservations';
import Login from './components/Login';
import '@fontsource/roboto/300.css';


const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/laundry' element={<Laundry />} />
        <Route path='/drying' element={<Drying />} />
        <Route path='/reservations' element={<UserReservations />} />
        <Route path='/login' element={<Login />} />

        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;