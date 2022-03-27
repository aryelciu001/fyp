import { createSlice } from "@reduxjs/toolkit";

export const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    list: [],
  },
  reducers: {
    updateReservation: (state, action) => {
      return {
        ...state,
        list: action.payload.reservation,
      };
    },
  },
});

export const { updateReservation } = reservationSlice.actions;

export default reservationSlice.reducer;
