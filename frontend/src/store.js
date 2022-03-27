import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "Reducers/user";
import DialogFormReducer from "Reducers/dialogform";
import ReservationReducer from "Reducers/reservation";
import SelectionReducer from "Reducers/selection";

export default configureStore({
  reducer: {
    user: UserReducer,
    dialogForm: DialogFormReducer,
    reservation: ReservationReducer,
    selection: SelectionReducer,
  },
});
