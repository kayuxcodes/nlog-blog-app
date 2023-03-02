import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slice/usersSlice";
import PostSlice from "./Slice/PostSlice";
const store = configureStore({
  reducer: {
    usersSlice,
    PostSlice,
  },
});
export default store;
