export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const sortByStartTime = (a, b) => {
  const [aHours, aMinutes] = a.start.split(':').map(Number)
  const [bHours, bMinutes] = b.start.split(':').map(Number)

  // Convert hours and minutes to a comparable number (e.g., 13:30 becomes 1330)
  const aTime = aHours * 100 + aMinutes
  const bTime = bHours * 100 + bMinutes

  return aTime - bTime
}

export const filterAndSortReservationsByDate = (reservations, dateToCompare) => {
  const filtered = reservations.filter(reservation => {
    const reservationDate = new Date(reservation.date)
    return reservationDate.getFullYear() === dateToCompare.getFullYear() &&
      reservationDate.getMonth() === dateToCompare.getMonth() &&
      reservationDate.getDate() === dateToCompare.getDate()
  })

  // filtered is an array of reservations for the given date that we want to sort by time
  return filtered.sort(sortByStartTime)
}

export const filterAndSortReservationsByUID = (reservations, uid) => {
  return reservations.filter(reservation => reservation.userId === uid).sort(sortByStartTime)
}

export const generateApartmentList = () => {
  let rooms = []
  for (let letter of ['A', 'B', 'C']) {
    for (let num = 17; num <= 30; num++) {
      rooms.push(letter + num)
    }
  }
  return rooms
}

export const generateTimeOptions = () => {
  let times = []
  for (let hour = 6; hour <= 21; hour++) {
    for (let min = 0; min < 60; min += 15) {
      let time = (hour < 10 ? '0' : '') + hour + ':' + (min < 10 ? '0' : '') + min
      times.push(time)
    }
  }
  return times
}