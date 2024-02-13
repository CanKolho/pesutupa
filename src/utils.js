export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const filterAndSortReservationsByDate = (reservations, dateToCompare) => {
  const filtered = reservations.filter(reservation => {
    const reservationDate = new Date(reservation.date);
    return reservationDate.getFullYear() === dateToCompare.getFullYear() &&
      reservationDate.getMonth() === dateToCompare.getMonth() &&
      reservationDate.getDate() === dateToCompare.getDate()
  });

  return filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
}

export const filterAndSortReservationsByUID = (reservations, uid) => {
  return reservations.filter(reservation => reservation.userId === uid)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}