import * as React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ListOfOwnReservations from './ListOfOwnReservations'

const UserReservations = () => {
  const reservations = [
    { date: '12.2.2024', time: '10:00 - 11:00' },
    { date: '13.2.2024', time: '11:00 - 12:00' },
    { date: '14.2.2024', time: '12:00 - 13:00' },
    { date: '15.2.2024', time: '13:00 - 14:00' },
    { date: '16.2.2024', time: '14:00 - 15:00' },
  ]

  return (
    <Container component="main" maxWidth="md" sx={{ my: 15 }}>
      <Typography variant='h5' textAlign='center'>My Reservations</Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}><ListOfOwnReservations reservations={reservations} room='Laundry' /></Grid>
        <Grid item xs={12} sm={6}><ListOfOwnReservations reservations={reservations} room='Drying' /></Grid>
      </Grid>
    </Container>
  )
}

export default UserReservations