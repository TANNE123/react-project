import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPromises = createAsyncThunk("fakeStore", async () => {
  const finalData = await axios.get("http://localhost:5000/userDetails");

  return finalData.data;
});

const productSlice = createSlice({
  name: "userDetails/slice",
  initialState: {
    userDetails: [],
    error: null,
    loading: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromises.fulfilled, (state, action) => {
        return { ...state, userDetails: action.payload, loading: false };
      })

      .addCase(fetchPromises.pending, (state) => {
        return { ...state, loading: true };
      })

      .addCase(fetchPromises.rejected, (state) => {
        return { ...state, error: "something is wrong", loading: false };
      });
  },
});

export default productSlice.reducer;
