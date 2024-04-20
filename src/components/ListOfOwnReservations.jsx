import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import { deleteLaundryReservation } from '../reducers/laundryReducer'
import { deleteDryingReservation } from '../reducers/dryingReducer'
import { useTranslation } from 'react-i18next'

const ListOfOwnReservations = ({ reservations, room }) => {
  const { t } = useTranslation()
  const isLaundryRoom = room.toLowerCase() === 'laundry'
  const color = isLaundryRoom ? 'rgba(173, 216, 230, 0.4)' : 'rgba(255, 228, 181, 0.4)'
  const area = isLaundryRoom ? t('reservations.laundryHeader') : t('reservations.dryingHeader')
  const reservationsExists = reservations.length > 0
  const [opacity, setOpacity] = useState(0)
  const dispatch = useDispatch()
  
  const handleDelete = (id) => {
    isLaundryRoom
      ? dispatch(deleteLaundryReservation(id))
      : dispatch(deleteDryingReservation(id))
  }

  useEffect(() => {
    setOpacity(1)
  }, [])

  return (
    <Container component="section" maxWidth="sm" sx={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', p: 1, borderRadius: 3 }}>
      <Typography variant='h6' textAlign='center'>{area}</Typography>
      <Divider />
      <List sx={{ height: '400px', overflow: 'auto', mt: 1 }}>
        {reservationsExists ? (
          reservations.map((reservation, index) => {
            const date = new Date(reservation.date).toLocaleDateString().replace(/\//g, '.')
            return (
              <ListItem key={index} sx={{ backgroundColor: color, borderRadius: 3, mt: 1, opacity: opacity, transition: `opacity 500ms ${index * 100}ms` }}>
                <ListItemText primary={date} secondary={`${reservation.start} - ${reservation.end}`} />
                <ListItemIcon>
                  <IconButton edge="end" aria-label="delete" size='small' onClick={() => handleDelete(reservation.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            )
          })
        ) : (
          <ListItem>
            <ListItemText primary={t('reservations.noReservations')}/>
          </ListItem>
        )}
      </List>
    </Container>
  )
}

export default ListOfOwnReservations