import * as React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ListOfOwnReservations from './ListOfOwnReservations'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useUser } from '../context/userContext'
import { initLaundryReservations } from '../reducers/laundryReducer'
import { initDryingReservations } from '../reducers/dryingReducer'
import { filterAndSortReservationsByUID } from '../utils'

const UserReservations = () => {
  const { user } = useUser()
  const dispatch = useDispatch()
  const uid = user.currentUser.uid
  const laundryReservations = filterAndSortReservationsByUID(useSelector(state => state.laundry), uid)
  const dryingReservations = filterAndSortReservationsByUID(useSelector(state => state.drying), uid)

  React.useEffect(() => {
    dispatch(initLaundryReservations(new Date()))
    dispatch(initDryingReservations(new Date()))
  }, [dispatch])

  return (
    <Container component="main" maxWidth="md" sx={{ my: 15 }}>
      <Typography variant='h5' textAlign='center'>My Reservations</Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}><ListOfOwnReservations reservations={laundryReservations} room='Laundry' /></Grid>
        <Grid item xs={12} sm={6}><ListOfOwnReservations reservations={dryingReservations} room='Drying' /></Grid>
      </Grid>
    </Container>
  )
}

export default UserReservations