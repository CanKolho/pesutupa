import { Routes, Route } from 'react-router-dom';
import Laundry from './components/Laundry';
import Drying from './components/Drying';
import Home from './components/Home';
import Navigation from './components/Navigation';
import UserReservations from './components/UserReservations';
import Login from './components/Login';
import '@fontsource/roboto/300.css';
import { Navigate } from 'react-router-dom';
import { useUser } from './context/userContext';

const App = () => {
  const { user } = useUser();
  console.log('User from app:', user);
 
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/laundry' element={user ? <Laundry /> : <Navigate to={`/signin`} replace />} />
        <Route path='/drying' element={user ? <Drying /> :  <Navigate to={`/signin`} replace />} />
        <Route path='/reservations' element={user ? <UserReservations /> : <Navigate to={`/signin`} replace />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Login />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;