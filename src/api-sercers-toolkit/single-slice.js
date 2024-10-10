import { createSlice } from "@reduxjs/toolkit";

const ownerData = createSlice({
  name: "owner/data",
  initialState: {
    singleData: {},
  },
  reducers: {
    userData: (state, action) => {
      state.singleData = action.payload;
    },
  },
});

export const { userData } = ownerData.actions;
export default ownerData.reducer;
