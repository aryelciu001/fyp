import { createSlice } from '@reduxjs/toolkit'

export const selectionSlice = createSlice({
  name: 'selection',
  initialState: {
    list: [],
  },
  reducers: {
    updateSelection: (state, action) => {
      return {
        ...state,
        list: action.payload.selection,
      }
    },
  },
})

export const { updateSelection } = selectionSlice.actions

export default selectionSlice.reducer
