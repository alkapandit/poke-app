import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./reducer/commonSlice";

const store = configureStore({
  reducer: {
    common: commonSlice,
  },
});
export default store;
