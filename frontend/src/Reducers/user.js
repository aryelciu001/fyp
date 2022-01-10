import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    role: '',
    token: '',
    eligible: 0,
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
      }
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
