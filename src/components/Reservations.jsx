import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import PersonIcon from '@mui/icons-material/Person'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import { useMediaQuery } from '@mui/material'
import { months } from '../utils'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { initLaundryReservations } from '../reducers/laundryReducer'
import { initDryingReservations } from '../reducers/dryingReducer'
import { filterAndSortReservationsByDate } from '../utils'

const Reservations = ({ room, date, user }) => {
  const isMobile = useMediaQuery('(max-width: 900px)')
  const [opacity, setOpacity] = useState(0)
  const dispatch = useDispatch()
  const isLaundryRoom = room.toLowerCase() === 'laundry'
  const color = isLaundryRoom ? 'rgba(173, 216, 230, 0.5)' : 'rgba(255, 228, 181, 0.5)'
  const reservations = isLaundryRoom ? useSelector(state => state.laundry) : useSelector(state => state.drying)

  const dateToCompare = new Date(date)
  const filteredAndSorted = filterAndSortReservationsByDate(reservations, dateToCompare)

  useEffect(() => {
    setOpacity(0)
    const timer = setTimeout(() => setOpacity(1), 100)
    return () => clearTimeout(timer)
  }, [date])

  useEffect(() => {
    isLaundryRoom
      ? dispatch(initLaundryReservations(date.toDate()))
      : dispatch(initDryingReservations(date.toDate()))
  }, [date, dispatch])

  return (
    <Container component="main" maxWidth="md" sx={{ mt: isMobile ? 7 : 0, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', p: 1, borderRadius: 3 }}>
      <Typography variant='h6'>{`${date.date()} ${months[date.month()]} ${date.year()}`}</Typography>
      <Divider />
      <List sx={{ height: '400px', overflow: 'auto', mt: 1 }}>
        {filteredAndSorted.length > 0 ? (
          filteredAndSorted.map((reservation, index) => (
            <ListItem key={index} sx={{ backgroundColor: color, borderRadius: 3, mt: 1, opacity: opacity, transition: `opacity 500ms ${index * 100}ms` }}>
              <ListItemText primary={reservation.apartment} secondary={`${reservation.start} - ${reservation.end}`} />
              { user.currentUser.uid === reservation.userId &&
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
              }
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