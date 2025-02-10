import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./redux/UserSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
  }, // Add your reducers here
});

export default store;
