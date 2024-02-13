import { configureStore } from '@reduxjs/toolkit'
import laundryReducer from './reducers/laundryReducer'
import dryingReducer from './reducers/dryingReducer'

const store = configureStore({
  reducer: {
    laundry: laundryReducer,
    drying: dryingReducer,
  },
})

export default store