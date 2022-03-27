import { createSlice } from "@reduxjs/toolkit";

export const dialogFormSlice = createSlice({
  name: "dialogform",
  initialState: {
    formType: null,
    data: null,
  },
  reducers: {
    openDialogForm: (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        formType: action.payload.formType,
      };
    },
    closeDialogForm: (state) => {
      return {
        ...state,
        formType: null,
        data: null,
      };
    },
  },
});

export const { openDialogForm, closeDialogForm } = dialogFormSlice.actions;

export default dialogFormSlice.reducer;
