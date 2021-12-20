import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './Reducers/user'

export default configureStore({
  reducer: {
    user: UserReducer,
  }
})