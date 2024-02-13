import { createSlice } from '@reduxjs/toolkit'
import { db } from '../config/firebase'
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore'

const dryingSlice = createSlice({
  name: 'drying',
  initialState: [],
  reducers: {
    setAllDryingRes(state, action) {
      return action.payload
    }
  },
})

export const { setAllDryingRes } = dryingSlice.actions

export const initDryingReservations = (date) => {
  return async dispatch => {
    const today = date
    today.setHours(0, 0, 0, 0)
    const todayInMilliseconds = today.getTime() // convert the date to milliseconds
    const todayTimestamp = Timestamp.fromMillis(todayInMilliseconds)
    
    const ref = collection(db, 'dryingReservations');
    const q = query(ref, where('date', '>=', todayTimestamp), orderBy('date'));

    try {
      const querySnapshot = await getDocs(q)
      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          ...docData,
          id: doc.id,
          // Convert Firestore Timestamp to milliseconds to be able to use it in the Date constructor
          date: docData.date.toMillis(), 
        };
      });
      dispatch(setAllDryingRes(data))
    }
    catch (error) {
      console.error('Error initializing drying reservations:', error)
    }
  }
}


export default dryingSlice.reducer