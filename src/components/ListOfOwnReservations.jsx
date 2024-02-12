import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const ListOfOwnReservations = ({ reservations, room = 'Laundry' }) => {
  const color = room.toLowerCase() === 'laundry' ? 'rgba(173, 216, 230, 0.4)' : 'rgba(255, 228, 181, 0.4)';
  const reservationsExists = reservations.length > 0;

  return (
    <Container component="section" maxWidth="sm" sx={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', p: 1, borderRadius: 3 }}>
      <Typography variant='h6' textAlign='center'>{room} Room</Typography>
      <Divider />
      <List sx={{ height: '400px', overflow: 'auto', mt: 1 }}>
      {reservationsExists ? (
        reservations.map((reservation, index) => (
          <ListItem key={index} sx={{ backgroundColor: color, borderRadius: 3, mt: 1 }}>
            <ListItemText primary={reservation.date} secondary={reservation.time} />
            <ListItemIcon>
                <IconButton edge="end" aria-label="delete" size='small'>
                  <DeleteIcon />
                </IconButton>
            </ListItemIcon>
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
  };

export default ListOfOwnReservations;