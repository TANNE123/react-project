import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "ModalSlice",
  initialState: {
    loading1: false,
  },
  reducers: {
    uploadFiles: (state, action) => {
      return { loading1: action.payload };
    },
  },
});

export const { uploadFiles } = ModalSlice.actions;
export default ModalSlice.reducer;
