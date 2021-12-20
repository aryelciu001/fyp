import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: "",
    role: "",
    token: ""
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem('token', action.payload.token)
      return { 
        ...state, 
        email: action.payload.email, 
        role: action.payload.role, 
        token: action.payload.token
      }
    },
    logout: state => {
      localStorage.removeItem('token')
      return { 
        ...state, 
        email: "",
        role: "",
        token: "",
      }
    },
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer