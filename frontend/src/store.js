import { configureStore } from '@reduxjs/toolkit'
import UserReducer from 'Reducers/user'
import DialogFormReducer from 'Reducers/dialogform'

export default configureStore({
  reducer: {
    user: UserReducer,
    dialogForm: DialogFormReducer,
  }
})