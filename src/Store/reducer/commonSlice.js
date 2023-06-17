import { createSlice } from "@reduxjs/toolkit";
import { setLoadingActions } from "../action/commonAction";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    isMainLoading: false,
  },
  reducers: {
    setLoading: setLoadingActions,
  },
});

export const { setLoading } = commonSlice.actions;
export default commonSlice.reducer;
