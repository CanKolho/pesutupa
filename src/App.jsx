import { useEffect, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Room from './components/Room'
import Navigation from './components/Navigation'
import UserReservations from './components/UserReservations'
import Login from './components/Login'
import SignUp from './components/SignUp'
import LinearLoader from './components/LinearLoader'
import { Navigate } from 'react-router-dom'
import { useUser } from './context/userContext'
import { useDispatch } from 'react-redux'
import { initLaundryReservations } from './reducers/laundryReducer'
import { initDryingReservations } from './reducers/dryingReducer'
import '@fontsource/roboto/300.css'

const App = () => {
  const { user } = useUser()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(initLaundryReservations(new Date()))
      dispatch(initDryingReservations(new Date()))
    }
  }, [user, dispatch])

  return (
    <>
      <Navigation />
      <Suspense fallback={<LinearLoader />} >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/laundry' element={user ? <Room room='laundry' /> : <Navigate to={'/signin'} replace />} />
          <Route path='/drying' element={user ? <Room room='drying'/> :  <Navigate to={'/signin'} replace />} />
          <Route path='/reservations' element={user ? <UserReservations /> : <Navigate to={'/signin'} replace />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App