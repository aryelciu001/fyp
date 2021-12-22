import { createSlice } from '@reduxjs/toolkit'

export const dialogFormSlice = createSlice({
  name: 'dialogform',
  initialState: {
    formType: "editFyp"
  },
  reducers: {
    openDialogForm: (state, action) => {
      return {
        ...state,
        formType: action.payload.formType
      }
    },
    closeDialogForm: (state) => {
      return {
        ...state, 
        formType: null
      }
    },
  }
})

export const { openDialogForm, closeDialogForm } = dialogFormSlice.actions

export default dialogFormSlice.reducer