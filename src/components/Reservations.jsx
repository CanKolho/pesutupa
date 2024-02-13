import * as React from 'react'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Divider } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useMediaQuery } from '@mui/material'

const Reservations = ({ room = 'laundry' }) => {
  const isMobile = useMediaQuery('(max-width: 900px)')
  const color = room === 'laundry' ? 'rgba(173, 216, 230, 0.5)' : 'rgba(255, 228, 181, 0.5)'

  const reservations = [
    { room: 'B17', time: '10:00 - 11:00' },
    { room: 'A17', time: '11:00 - 12:00' },
    { room: 'C22', time: '12:00 - 13:00' },
    { room: 'B11', time: '13:00 - 14:00' },
    { room: 'B18', time: '14:00 - 15:00' },
  ]

  return (
    <Container component="main" maxWidth="md" sx={{ mt: isMobile ? 7 : 0, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', p: 1, borderRadius: 3 }}>
      <Typography variant='h6'>11 February 2024</Typography>
      <Divider />
      <List sx={{ height: '400px', overflow: 'auto', mt: 1 }}>
        {reservations.length > 0 ? (
          reservations.map((reservation, index) => (
            <ListItem key={index} sx={{ backgroundColor: color, borderRadius: 3, mt: 1  }}>
              <ListItemText primary={reservation.room} secondary={reservation.time} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary='No reservation' />
          </ListItem>
        )}
      </List>
    </Container>
  )
}

export default Reservations