import * as React from 'react'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import CustomDatepicker from './CustomDatepicker'
import CustomSelector from './CustomSelector'
import Reservations from './Reservations'
import { useField } from '../hooks/useField'
import { useDispatch } from 'react-redux'
import { addLaundryReservation } from '../reducers/laundryReducer'
import { addDryingReservation } from '../reducers/dryingReducer'
import { generateApartmentList, generateTimeOptions } from '../utils'
import  { useUser } from '../context/userContext'

const Room = ({ room }) => {
  const { user } = useUser()
  const [value, setValue] = React.useState(dayjs())
  const { reset: resetApartment, ...apartment } = useField()
  const { reset: resetStartTime, ...startTime } = useField()
  const { reset: resetEndTime, ...endTime } = useField()
  const dispatch = useDispatch()
  const timeOptions = generateTimeOptions()
  const isLaundryRoom = room.toLowerCase() === 'laundry'

  const handleReset = () => {
    resetApartment()
    resetStartTime()
    resetEndTime()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const reservation = {
      userId: user?.currentUser?.uid,
      apartment: apartment.value,
      date: value.toDate().toISOString(),
      start: startTime.value,
      end: endTime.value,
    }

    isLaundryRoom
      ? dispatch(addLaundryReservation(reservation))
      : dispatch(addDryingReservation(reservation))

    handleReset()
  }

  return (
    <>
      <Container component="form" maxWidth="md" sx={{ my: 15 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={5}><CustomDatepicker value={value} setValue={setValue}/></Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={12}><CustomSelector label="Room Number" {...apartment} options={generateApartmentList()} autoFocus/></Grid>
              <Grid item xs={6}><CustomSelector label="Start Time" {...startTime} options={timeOptions}/></Grid>
              <Grid item xs={6}><CustomSelector label="End Time" {...endTime} options={timeOptions}/></Grid>
              <Grid item xs={9}><Button type="submit" fullWidth variant="contained" onClick={handleSubmit} >reserve</Button></Grid>
              <Grid item xs={3}><Button fullWidth variant="outlined" color='secondary' onClick={handleReset}>reset</Button></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Reservations room={room} date={value} user={user}/>
      </Container>
    </>
  )
}

export default Room