import * as React from 'react'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import CustomDatepicker from './CustomDatepicker'
import Reservations from './Reservations'

const Laundry = () => {
  const [value, setValue] = React.useState(dayjs())
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ my: 15 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={5}><CustomDatepicker value={value} setValue={setValue}/></Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField margin="normal" variant='filled' required fullWidth label="Room Number" autoFocus /></Grid>
              <Grid item xs={6}><TextField margin="none" variant='filled' required fullWidth label="Start Time" /></Grid>
              <Grid item xs={6}><TextField margin="none" variant='filled' required fullWidth label="End Time" /></Grid>
              <Grid item xs={9}><Button type="submit" fullWidth variant="contained" >reserve</Button></Grid>
              <Grid item xs={3}><Button type="submit" fullWidth variant="outlined" color='secondary'>reset</Button></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Reservations date={value}/>
      </Container>
    </>
  )
}

export default Laundry