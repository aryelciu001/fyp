import { createSlice } from '@reduxjs/toolkit'

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservation: [],
  },
  reducers: {
    updateReservation: (state, action) => {
      return {
        ...state,
        reservation: action.payload.reservation,
      }
    },
  },
})

export const { updateReservation } = reservationSlice.actions

export default reservationSlice.reducer
