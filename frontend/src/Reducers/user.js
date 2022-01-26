import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    role: '',
    token: '',
    eligible: 0,
    matriculation_number: '',
    registered_matriculation_number: '',
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        email: action.payload.email,
        role: action.payload.role,
        token: action.payload.token,
        eligible: action.payload.eligible,
        matriculation_number: action.payload.matriculation_number,
        registered_matriculation_number: action.payload.registered_matriculation_number,
      }
    },
    logout: (state) => {
      localStorage.removeItem('token')
      return {
        ...state,
        email: '',
        role: '',
        token: '',
        eligible: false,
        matriculation_number: '',
        registered_matriculation_number: '',
      }
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
